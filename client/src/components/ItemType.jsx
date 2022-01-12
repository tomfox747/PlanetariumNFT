import React,{useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import Card from './shared/Card'
import { GridWrapper, Row, Col } from './shared/Grid'
import { HeaderTextFontNormal, SubTextFontNormal } from './shared/Text'
import ImageWrapper from './shared/Image'
import { useEffect } from 'react/cjs/react.development'
import { useMoralis } from 'react-moralis'
import { MarketplaceStore } from 'context/MarketplaceStore'

const ItemType = ({type}) => {

    return(
        <GridWrapper>
            <Row>
                <Col width={1}/>
                <Col width={50}>
                    <Card overrides={{overflowY:'scroll', maxHeight:'700px'}}>
                        <Data/>
                    </Card>
                </Col>
                <Col width={1}/>
                <Col width={12}></Col>
                <Col width={1}/>
            </Row>
        </GridWrapper>
    )
}

const Data = () => {

    const {currentMarketplace} = useContext(MarketplaceStore)
    const {Moralis, isWeb3Enabled} = useMoralis()
    const [nftSets, setNftSets] = useState([])

    useEffect(() => {
        const main = async () =>{
            let options = {
                contractAddress: currentMarketplace.address,
                functionName: 'getAll',
                abi: currentMarketplace.config.abi
            }
            
            const result = await Moralis.executeFunction(options)
            setNftSets(result)
        }
        if(isWeb3Enabled && currentMarketplace.config) main()
    },[currentMarketplace])

    return(
        <GridWrapper>
            <Row>
                <Col>
                    { nftSets.map((element, index) => {
                        return <div key={'item'+index} style={{ width:'100%', borderBottom:'solid #4F4F4F 0.2px'}}>
                            <Item nftSet={element}/>
                        </div>
                    })}
                </Col>
            </Row>
        </GridWrapper>
    )
}

const Item = ({nftSet}) => {

    const {currentMarketplace} = useContext(MarketplaceStore)
    const {Moralis} = useMoralis()
    const [loading, setLoading] = useState(false)
    const [metaData, setMetaData] = useState({})
    const [available, setAvailable] = useState(null)
    const [totalSupply, setTotalSupply] = useState(null)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        const f = async () => {
            setLoading(true)
            let getMetaData = {
                contractAddress: nftSet.nftAddress,
                functionName: 'getMetaData',
                abi: currentMarketplace.nftConfig.abi
            }
            let getNumberAvailable = {
                contractAddress: nftSet.nftAddress,
                functionName: 'getNumberForSale',
                abi: currentMarketplace.nftConfig.abi
            }
            let totalSupply = {
                contractAddress: nftSet.nftAddress,
                functionName: 'getTokenCount',
                abi: currentMarketplace.nftConfig.abi
            }
            const getMetaDataResult = await Moralis.executeFunction(getMetaData)
            const getAvailableResult = await Moralis.executeFunction(getNumberAvailable)
            const totalSupplyResult = await Moralis.executeFunction(totalSupply)
            setMetaData(JSON.parse(getMetaDataResult))
            setAvailable(getAvailableResult)
            setTotalSupply(totalSupplyResult)
            setLoading(false)
        }
        f()
    },[nftSet, currentMarketplace])

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display:'flex', alignItems:'center', width:'100%',backgroundColor:hover ? 'rgba(79,79,79,0.3)' : '', paddingBottom:'20px'}}>
            <GridWrapper overrides={{marginTop:'20px'}}>
                <Row>
                    <Col width={5}>
                        <Row>
                            <Col width={1}/>
                            <Col width={3} overrides={{alignItems:'flex-start'}}>
                                <HeaderTextFontNormal overrides={{textDecoration:'underline'}}>{metaData.name}</HeaderTextFontNormal>
                            </Col>
                            <Col width={15} overrides={{alignItems:'flex-start'}}><HeaderTextFontNormal size={15}>{nftSet.nftAddress}</HeaderTextFontNormal></Col>
                        </Row>
                        <Row overrides={{marginTop:'20px'}}>
                            <Col width={1}/>
                            <Col width={10}>
                                <Row>
                                    <Col width={5} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>Available For Purchase:</SubTextFontNormal></Col>
                                    <Col width={10} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>{available} / 100</SubTextFontNormal></Col>
                                </Row>
                                <Row>
                                    <Col width={5} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>Available To Mint:</SubTextFontNormal></Col>
                                    <Col width={10} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>{100 - totalSupply} / 100</SubTextFontNormal></Col>
                                </Row>
                                <Row overrides={{marginTop:'20px'}}>
                                    <Col overrides={{alignItems:'flex-start'}}>
                                        <Link style={{textDecoration:'none'}} to={{pathname:'/nftset', state: { nftSet: nftSet, metaData: metaData, totalSupply: totalSupply }}}>
                                            <div style={{display:'flex', paddingLeft:'10px', paddingRight:'10px', justifyContent:'center', alignItems:'center', width:'180px', height:'40px', backgroundColor:'#6E76E5',borderRadius:'5px'}}>
                                                <Row>
                                                    <Col><div style={{backgroundColor:'#333660', borderRadius:'5px', padding:'1px'}}><ImageWrapper imageName='viewIcon' width={'30px'}/></div></Col>
                                                    <Col><SubTextFontNormal overrides={{fontSize:'15px'}}>View Set</SubTextFontNormal></Col>
                                                    <Col><div style={{ transform:'rotate(-90deg)'}}><ImageWrapper imageName={'arrow'} width={'10px'}/></div></Col>
                                                </Row>
                                            </div>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col width={3} overrides={{paddingRight:'5px'}}>
                                <div><ImageWrapper imageName={metaData.imageId} width={'350px'}/></div>
                            </Col>
                            <Col width={1}/>
                        </Row>
                    </Col>
                </Row>
            </GridWrapper>
        </div>
    )
}

export default ItemType
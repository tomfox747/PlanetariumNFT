import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Card from './shared/Card'
import { GridWrapper, Row, Col } from './shared/Grid'
import { HeaderTextFontNormal, SubTextFontNormal } from './shared/Text'
import ImageWrapper from './shared/Image'
import { useEffect } from 'react/cjs/react.development'
import { useMoralis } from 'react-moralis'
import { addresses } from '../contracts/contractAddresses'
import GalaxyMarketplace from '../contracts/abis/GalaxyMarketplace'
import GalaxyNFT from '../contracts/abis/GalaxyNFT_milkyway'

const ItemType = ({element}) => {

    return(
        <GridWrapper>
            <Row>
                <Col width={1}/>
                <Col width={27}>
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

const Data = ({itemName}) => {

    const {Moralis, isWeb3Enabled} = useMoralis()
    const [nftSets, setNftSets] = useState([])

    useEffect(() => {
        const main = async () =>{
            let options = {
                contractAddress: addresses.marketPlaces.Galaxy,
                functionName: 'getGalaxies',
                abi: GalaxyMarketplace.abi
            }
            const result = await Moralis.executeFunction(options)
            setNftSets(result)
        }
        if(isWeb3Enabled) main()
    },[])

    return(
        <GridWrapper>
            <Row>
                <Col>
                    { nftSets.map((element, index) => {
                        return <div key={'item'+index} style={{height:'300px', width:'100%', borderBottom:'solid #4F4F4F 0.2px'}}>
                            <Item element={element}/>
                        </div>
                    })}
                </Col>
            </Row>
        </GridWrapper>
    )
}

const Item = ({element}) => {

    const {Moralis} = useMoralis()
    const [loading, setLoading] = useState(false)
    const [metaData, setMetaData] = useState({})
    const [available, setAvailable] = useState(null)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        const f = async () => {
            setLoading(true)
            let getMetaData = {
                contractAddress: element.nftAddress,
                functionName: 'getMetaData',
                abi: GalaxyNFT.abi
            }
            let getNumberAvailable = {
                contractAddress: element.nftAddress,
                functionName: 'getNumberForSale',
                abi: GalaxyNFT.abi
            }
            const getMetaDataResult = await Moralis.executeFunction(getMetaData)
            const getAvailableResult = await Moralis.executeFunction(getNumberAvailable)
            setMetaData(JSON.parse(getMetaDataResult))
            setAvailable(getAvailableResult)
            setLoading(false)
        }
        f()
    },[])

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{display:'flex', alignItems:'center', width:'100%', height:'300px',backgroundColor:hover ? 'rgba(79,79,79,0.3)' : ''}}>
            <GridWrapper overrides={{marginTop:'10px', marginBottom:'30px'}}>
                <Row>
                    <Col width={5}>
                        <Row>
                            <Col width={1}/>
                            <Col width={15} overrides={{alignItems:'flex-start'}}>
                                <HeaderTextFontNormal overrides={{textDecoration:'underline'}}>{metaData.name}</HeaderTextFontNormal>
                            </Col>
                        </Row>
                        <Row overrides={{marginTop:'20px'}}>
                            <Col width={1}/>
                            <Col width={10}>
                                <Row>
                                    <Col width={5} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>NFT Contract:</SubTextFontNormal></Col>
                                    <Col width={10} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>{element.owner}</SubTextFontNormal></Col>
                                </Row>
                                <Row>
                                    <Col width={5} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>Available For Purchase:</SubTextFontNormal></Col>
                                    <Col width={10} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>{available} / 100</SubTextFontNormal></Col>
                                </Row>
                                <Row overrides={{marginTop:'20px'}}>
                                    <Col overrides={{alignItems:'flex-start'}}>
                                        <Link to={{pathname:'/nftset', state: { element: element, metaData: metaData }}}>
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
                                <div style={{border:'solid #6e76e5 0.5px'}}>
                                    <ImageWrapper imageName={metaData.imageId} width={'350px'}/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </GridWrapper>
        </div>
    )
}

export default ItemType
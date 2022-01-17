import React,{useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import Card from './shared/Card'
import { GridWrapper, Row, Col } from './shared/Grid'
import { HeaderTextFontNormal, SubTextFontNormal } from './shared/Text'
import Button from './shared/Button'
import ImageWrapper from './shared/Image'
import { useEffect } from 'react/cjs/react.development'
import { useMoralis } from 'react-moralis'
import { MarketplaceStore } from 'context/MarketplaceStore'
import PuffLoader from 'react-spinners/PuffLoader'	

const ItemType = ({type}) => {

    const [filterObject, setFilterObject] = useState({})

    return(
        <GridWrapper>
            <Row>
                <Col width={1}/>
                <Col width={40}>
                    <Card overrides={{minHeight:'70vh', maxHeight:'70vh', overflowY:'scroll'}}>
                        <Data filters={filterObject}/>
                    </Card>
                </Col>
                <Col width={1}/>
                <Col width={12} overrides={{alignSelf:'flex-start'}}>
                    <Filters setFilters={setFilterObject}/>
                </Col>
                <Col width={1}/>
            </Row>
        </GridWrapper>
    )
}

const Data = ({filters}) => {

    const {currentMarketplace} = useContext(MarketplaceStore)
    const {Moralis, isWeb3Enabled} = useMoralis()
    const [nftSets, setNftSets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const main = async () =>{
            setLoading(true)
            let options = {
                contractAddress: currentMarketplace.address,
                functionName: 'getAll',
                abi: currentMarketplace.config.abi
            }
            const result = await Moralis.executeFunction(options)
            setNftSets(result)
            setLoading(false)
        }
        if(isWeb3Enabled && currentMarketplace.config) main()
    },[currentMarketplace])

    if(loading === true) {
        return(
            <GridWrapper>
                <Row>
                    <Col><PuffLoader size={200} color={'#ffffff'}/></Col>
                </Row>
            </GridWrapper>
        )
    }

    return(
        <GridWrapper>
            <Row>
                <Col>
                    <div style={{display:'flex', flexWrap:'wrap', flexBasis:'33.333333%'}}>
                        { nftSets.map((element, index) => {
                            return <Item key={'item'+index} nftSet={element} filters={filters}/>
                        })}
                    </div>
                </Col>
            </Row>
        </GridWrapper>
    )
}

const Item = ({nftSet, filters}) => {

    const {currentMarketplace} = useContext(MarketplaceStore)
    const {Moralis} = useMoralis()
    const [loading, setLoading] = useState(false)
    const [metaData, setMetaData] = useState({})
    const [available, setAvailable] = useState(null)
    const [totalSupply, setTotalSupply] = useState(null)
    const [buttonHover, setButtonHover] = useState(false)

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(nftSet.nftAddress);
        alert('Contract address copied to clipboard')
    }

    // filtering rules
    if(filters.name && !metaData?.name?.toLowerCase().includes(filters?.name.toLowerCase())) return null
    if(filters.onlyMintable === true && 100 - totalSupply === '0') return null
    if(filters.onlyForSale === true && available === '0') return null

    return(
        <GridWrapper overrides={{maxWidth:'400px', minWidth:'300px', paddingBottom:'10px', backgroundColor:'rgba(0, 0, 0, 0.5)', margin:'20px', border:'solid #6E76E5 0.5px'}}>
            <div>
                <Row>
                    <Col>
                        <div style={{maxHeight:'200px', minHeight:'200px', overflow:'hidden'}}>
                            <ImageWrapper imageName={metaData.imageId} width={300}/>
                        </div>
                        <Row>
                            <Col width={1}/>
                            <Col width={30}>
                                <div style={{border:'solid #6E76E5 0.5px',marginTop:'5px', marginBottom:'5px', width:'100%'}}></div>
                                <div style={{marginTop:'10px',width:'100%', display:'flex', justifyContent:'flex-start'}}>
                                    <HeaderTextFontNormal size={18}>{metaData.name}</HeaderTextFontNormal>
                                </div>
                                <div style={{marginTop:'10px',width:'100%', display:'flex', justifyContent:'flex-start'}}>
                                    <SubTextFontNormal size={14}>Available For Purchase: {available}/100</SubTextFontNormal>    
                                </div>
                                <div style={{marginTop:'10px',width:'100%', display:'flex', justifyContent:'flex-start'}}>
                                    <SubTextFontNormal size={14}>Available To Mint {100 - totalSupply}/100</SubTextFontNormal>
                                </div>
                                <div style={{marginTop:'10px',width:'100%', display:'flex', justifyContent:'flex-start'}}>
                                    <Link style={{textDecoration:'none'}} to={{pathname:'/nftset', state: { nftSet: nftSet, metaData: metaData, totalSupply: totalSupply }}}>
                                        <div style={{display:'flex', paddingLeft:'10px', paddingRight:'10px', justifyContent:'center', alignItems:'center', width:'180px', height:'40px', backgroundColor:'#6E76E5',borderRadius:'5px'}}>
                                            <Row>
                                                <Col><div style={{backgroundColor:'#333660', borderRadius:'5px', padding:'1px'}}><ImageWrapper imageName='viewIcon' width={'30px'}/></div></Col>
                                                <Col><SubTextFontNormal overrides={{fontSize:'15px'}}>View Set</SubTextFontNormal></Col>
                                                <Col><div style={{ transform:'rotate(-90deg)'}}><ImageWrapper imageName={'arrow'} width={'10px'}/></div></Col>
                                            </Row>
                                        </div>
                                    </Link>
                                </div>
                                <div style={{marginTop:'10px',width:'100%', display:'flex', justifyContent:'flex-start'}}>
                                    <div style={{cursor:buttonHover ? 'pointer' : 'default'}} onClick={() => copyToClipboard()} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)}>
                                        <SubTextFontNormal overrides={{fontSize:'13px',textDecoration:'underline'}}>
                                            Copy NFT address to clipboard
                                        </SubTextFontNormal>
                                    </div>
                                </div>
                            </Col>
                            <Col width={1}/>
                        </Row>
                    </Col>
                </Row>
            </div>
        </GridWrapper>
    )
}

const Filters = ({setFilters}) => {

    const {currentMarketplace, setCurrentMarketplace} = useContext(MarketplaceStore)
    const [nameValue, setNameValue] = useState('')
    const [onlyForSale, setOnlyForSale] = useState(false)
    const [onlyForSaleHover, setOnlyForSaleHover] = useState(false)
    const [onlyMintable, setOnlyMintable] = useState(false)
    const [onlyMintableHover, setOnlyMintableHover] = useState(false)

    useEffect(() => {resetFilters()},[currentMarketplace])

    const onFilterSubmission = () => {
        setFilters({
            name: nameValue,
            onlyForSale: onlyForSale,
            onlyMintable: onlyMintable
        })
    }

    const resetFilters = () => {
        setFilters({
            name: '',
            onlyForSale: false,
            onlyMintable: false
        })
        setOnlyMintable(false)
        setOnlyForSale(false)
        setNameValue('')
    }

    return(
        <Card>
            <GridWrapper>
                <Row>
                    <Col>
                        <div style={{width:'100%'}}><HeaderTextFontNormal size={20} overrides={{margin:'20px'}}>Filters</HeaderTextFontNormal></div>
                        <Row overrides={{marginTop:'20px'}}>
                            <Col width={3}><SubTextFontNormal size={14}>NFT name: </SubTextFontNormal></Col>
                            <Col width={4} overrides={{marginRight:'5px', marginBottom:'5px'}}>
                                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                                    <input type="text" value={nameValue} placeholder="name..." style={{width:'190px', height:'30px'}} onChange={(e) => setNameValue(e.target.value)}/>
                                </div>
                            </Col>
                        </Row>
                        <Row overrides={{marginTop:'20px'}}>
                            <Col>
                                <Row>
                                    <Col width={10}><SubTextFontNormal size={14}>Only show sets which are for sale: </SubTextFontNormal></Col>
                                    <Col width={3}><div 
                                        style={{width:'20px', height:'20px', border:'solid white 0.5px', cursor: onlyForSaleHover ?'pointer':'default', display:'flex', justifyContent:'center', alignItems:'center'}}
                                        onClick={() => setOnlyForSale(!onlyForSale)}
                                        onMouseEnter={() => setOnlyForSaleHover(true)}
                                        onMouseLeave={() => setOnlyForSaleHover(false)}
                                    >{onlyForSale && <div style={{width:'10px', height:'10px', backgroundColor:'green', borderRadius:'5px'}}></div>}</div></Col>
                                </Row>
                                <Row overrides={{marginTop:'10px'}}>
                                    <Col width={10}><SubTextFontNormal size={14}>Only show sets which can be minted: </SubTextFontNormal></Col>
                                    <Col width={3}><div 
                                        style={{width:'20px', height:'20px', border:'solid white 0.5px', cursor: onlyMintableHover ?'pointer':'default', display:'flex', justifyContent:'center', alignItems:'center'}}
                                        onClick={() => setOnlyMintable(!onlyMintable)}
                                        onMouseEnter={() => setOnlyMintableHover(true)}
                                        onMouseLeave={() => setOnlyMintableHover(false)}
                                    >{onlyMintable && <div style={{width:'10px', height:'10px', backgroundColor:'green', borderRadius:'5px'}}></div>}</div></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div style={{border:'solid #6E76E5 0.5px', width:'100%', marginTop:'30px', marginBottom:'20px'}}></div>
                <Row>
                    <Col overrides={{marginBottom:'20px', marginTop:'20px'}}>
                        <Button overrides={{width:'80%'}} text={"Update Filters"} func={onFilterSubmission} fontSize={15}/>
                    </Col>
                    <Col>
                        <Button overrides={{width:'80%'}} text={"Reset Filters"} func={resetFilters} fontSize={15}/>
                    </Col>
                </Row>
            </GridWrapper>
        </Card>
    )
}

export default ItemType
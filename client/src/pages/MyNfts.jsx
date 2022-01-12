import React,{useState, useContext} from 'react'
import { GridWrapper, Row, Col } from 'components/shared/Grid'
import Card from 'components/shared/Card'
import { SubTextFontNormal, SubTextFontMain,  } from 'components/shared/Text'
import Button from 'components/shared/Button'
import { addresses } from '../contracts/contractAddresses'
import { useEffect } from 'react/cjs/react.development'
import { useMoralis } from 'react-moralis'
import {ethers} from 'ethers'
import { MarketplaceStore } from 'context/MarketplaceStore'

import GalaxyMarketplace from '../contracts/abis/GalaxyMarketplace'
import StarMarketplace from '../contracts/abis/StarMarketplace'

import GalaxyNFT from '../contracts/abis/GalaxyNFT'
import StarNFT from '../contracts/abis/StarNFT'

const tabConfig = [
    {id: 1, text:'Galaxies'},
    {id: 2, text:'Stars'},
    {id: 3, text:'Planets'},
    {id: 4, text:'Moons'},
    {id: 5, text:'Constellations'},
    {id: 6, text:'Other'}
]

const marketplaceMapper = {
    1: {
        config: GalaxyMarketplace,
        address: addresses.marketPlaces.Galaxy,
        nftConfig: GalaxyNFT,
        nftAddresses: addresses.nfts.Galaxy
    },
    2: {
        config: StarMarketplace,
        address: addresses.marketPlaces.Star,
        nftConfig: StarNFT,
        nftAddresses: addresses.nfts.Stars
    }
}

const MyNfts = () => {

    const {currentMarketplace, setCurrentMarketplace} = useContext(MarketplaceStore)
    const {Moralis, account} = useMoralis()
    const [selectedTab, setSelectedTab] = useState(1)
    const [owned, setOwned] = useState([])
    const Nfts = addresses.nfts
    
    useEffect(() => {
        const f = async () => {
            let NftSets = 
                selectedTab === 1 ? Nfts.Galaxy 
                : selectedTab === 2 ? Nfts.Stars
                : selectedTab === 3 ? Nfts.Planets
                : selectedTab === 4 ? Nfts.Moons
                : selectedTab === 5 ? Nfts.Constellations
                : Nfts.Other

            setCurrentMarketplace(marketplaceMapper[selectedTab])

            let addressArray = Object.values(NftSets)

            let results = []
            for(let i = 0; i < addressArray.length; i++){
                let metaData = {
                    contractAddress: addressArray[i],
                    functionName: 'getMetaData',
                    abi: currentMarketplace.nftConfig.abi
                }
                let tokens = {
                    contractAddress: addressArray[i],
                    functionName: 'getAllTokens',
                    abi: currentMarketplace.nftConfig.abi
                }
                let meta = await Moralis.executeFunction(metaData)
                let tks = await Moralis.executeFunction(tokens)
                tks = tks.filter(element => element.owner.toLowerCase() === account.toLowerCase())
                for(let x = 0; x < tks.length; x++){
                    results.push({
                        ...JSON.parse(meta), 
                        ...tks[x]
                    })
                }
            }
            setOwned(results)
        }
        f()
    },[selectedTab])

    return(
        <GridWrapper>
            <Row overrides={{marginTop:'50px'}}>
                <Col width={1}/>
                <Col width={5}>
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                </Col>
                <Col width={1}/>
            </Row>
            <Row overrides={{marginTop:'10px'}}>
                <Col width={1}/>
                <Col width={5}>
                    <Card>
                        <div style={{display:'flex', flexWrap:'wrap', flexBasis:'33.333333%'}}>
                            {owned && owned.map((element, index) => {
                                return <DataCard key={"nftItem" + index} data={element}/>
                            })}
                        </div>
                    </Card>
                </Col>
                <Col width={1}/>
            </Row>
        </GridWrapper>
    )
}

const Tabs = ({selectedTab, setSelectedTab}) => {
    
    return(
        <GridWrapper>
            <Row>
                { tabConfig.map((element, index) => {
                    return <Col key={'exploreTabs'+index} overrides={{margin:'5px', height:'50px'}}>
                        <Tab element={element} index={index} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                    </Col>
                })}
            </Row>
        </GridWrapper>
    )
}

const Tab = ({element, index, selectedTab, setSelectedTab}) => {

    const [hover, setHover] = useState(false)

    return(
        <div style={{cursor:hover ? 'pointer' : 'default',width:'100%'}} onClick={() => setSelectedTab(element.id)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Card overrides={{height:'50px', border: selectedTab === element.id ? 'solid white 0.5px' : hover ? 'solid #6E76E5 0.5px' : 'none', backgroundColor:'rgba(0,0,0,0.7)'}}>
                <SubTextFontNormal>{element.text}</SubTextFontNormal>
            </Card>
        </div>
    )
}

const DataCard = ({data}) => {

    const {currentMarketplace} = useContext(MarketplaceStore)
    const {Moralis} = useMoralis()
    const [salePrice, setSalePrice] = useState('')

    const formatDate = () => {
        var date = new Date(data.purchaseDate * 1000).toLocaleDateString("en-UK")
        return date
    }
    
    const salePriceUpdater = (input) => {
        if(input === '')setSalePrice(input)
        let reg = new RegExp('^[0-9.]+$');      
        if(input.split('.').length-1 < 2) if(reg.test(input))setSalePrice(input)        
    }

    const listNft = async () => {
        try{
            debugger;
            let options = {
                contractAddress: currentMarketplace.nftAddresses[data.imageId],
                functionName: 'listToken',
                abi: currentMarketplace.nftConfig.abi,
                params:{
                    tokenId: data.id.toString(),
                    value: ethers.utils.parseEther(salePrice)
                }
            }
            await Moralis.executeFunction(options)
        }catch(e){
            alert("An error occured, please check the submitted information")
        }
    }

    const delistNft = async () => {
        try{
            let options = {
                contractAddress: currentMarketplace.nftAddresses[data.imageId],
                functionName: 'delistToken',
                abi: currentMarketplace.nftConfig.abi,
                params:{
                    tokenId: data.id.toString()
                }
            }
        await Moralis.executeFunction(options)
        }catch(e){
            alert("An error occured, please check the submitted information")
        }
    }

    const udpatePrice = async () => {
        try{
            let options = {
                contractAddress: currentMarketplace.nftAddresses[data.imageId],
                functionName: 'setTokenPrice',
                abi: currentMarketplace.nftConfig.abi,
                params:{
                    tokenId: data.id.toString(),
                    newPrice: ethers.utils.parseEther(salePrice)
                }
            }
            await Moralis.executeFunction(options)
        }catch(e){
            alert("An error occured, please check the submitted information")
        }
    }
    return(
        <GridWrapper overrides={{maxWidth:'400px', minWidth:'300px',border:'solid white 0.5px', borderRadius:'5px', margin:'30px', paddingBottom:'10px'}}>
            <div>
                <Row overrides={{marginTop:'15px'}}><Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{marginLeft:'20px'}}>{data.name}</SubTextFontMain></Col></Row>
                <Row overrides={{marginTop:'15px'}}><Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{marginLeft:'20px'}}>Item #{data.id} of 100</SubTextFontMain></Col></Row>
                <Row overrides={{marginTop:'30px'}}>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Owner :</SubTextFontMain></Col>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner?.slice(0, 7)}...</SubTextFontNormal></Col>
                </Row>
                <Row overrides={{marginTop:'5px'}}>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Purchase Price :</SubTextFontMain></Col>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{ethers.utils.formatEther(data.pricePaid)} AVAX</SubTextFontNormal></Col>
                </Row>
                <Row overrides={{marginTop:'5px'}}>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Purcahsed On :</SubTextFontMain></Col>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{formatDate()}</SubTextFontNormal></Col>
                </Row>
                <Row overrides={{marginTop:'5px', marginBottom:data.SalePrice === true ? 'none' : '15px'}}>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>For Sale :</SubTextFontMain></Col>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.forSale === true ? 'Yes' : 'No'}</SubTextFontNormal></Col>
                </Row>
                <div style={{border:'solid #6E76E5 0.5px'}}></div>
                {data.forSale === true &&
                    <GridWrapper>
                        <Row overrides={{marginTop:'10px'}}>
                            <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Sale Price :</SubTextFontMain></Col>
                            <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{ethers.utils.formatEther(data.price)} | AVAX</SubTextFontNormal></Col>
                        </Row>
                        <Row overrides={{marginTop:'10px'}}>
                            <Col><Button fontSize={'15px'} text={'Update Price'} func={udpatePrice}/></Col>
                        </Row>
                        <Row>
                            <Col overrides={{marginTop:'10px'}}>
                                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                                    <input type="text" value={salePrice} placeholder="Price... (AVAX)" style={{width:'190px', height:'30px'}} onChange={(e) => salePriceUpdater(e.target.value)}/>
                                </div>
                            </Col>
                        </Row>
                        <div style={{border:'solid #6E76E5 0.5px', marginTop:'10px'}}></div>
                        <Row overrides={{ marginTop:'10px'}}>
                            <Col><Button fontSize={'15px'} text={'De-List NFT'} func={delistNft}/></Col>
                        </Row>
                    </GridWrapper>
                }
                {data.forSale === false &&
                    <GridWrapper>
                        <Row overrides={{ marginTop:'10px'}}>
                            <Col><Button fontSize={'15px'} text={'List NFT For Sale'} func={listNft}/></Col>
                        </Row>
                        <Row>
                            <Col overrides={{ marginTop:'10px'}}>
                                <div>
                                    <input type="text" value={salePrice} placeholder="Price... (AVAX)" style={{width:'190px', height:'30px'}} onChange={(e) => salePriceUpdater(e.target.value)}/>
                                </div>
                            </Col>
                        </Row>
                    </GridWrapper>
                    
                }
            </div>
        </GridWrapper>
    )
}

export default MyNfts
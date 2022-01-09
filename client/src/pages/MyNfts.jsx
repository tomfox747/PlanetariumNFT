import React,{useState} from 'react'
import { GridWrapper, Row, Col } from 'components/shared/Grid'
import Card from 'components/shared/Card'
import { SubTextFontNormal, SubTextFontMain,  } from 'components/shared/Text'
import Button from 'components/shared/Button'
import { addresses } from '../contracts/contractAddresses'
import { useEffect } from 'react/cjs/react.development'
import { useMoralis } from 'react-moralis'
import GalaxyNFT from '../contracts/abis/GalaxyNFT_milkyway'
import {ethers} from 'ethers'

const tabConfig = [
    {id: 1, text:'Galaxies'},
    {id: 2, text:'Stars'},
    {id: 3, text:'Planets'},
    {id: 4, text:'Moons'},
    {id: 5, text:'Constellations'},
    {id: 6, text:'Other'}
]

const MyNfts = () => {

    const {Moralis} = useMoralis()
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

            let addressArray = Object.values(NftSets)

            let results = []
            for(let i = 0; i < addressArray.length; i++){
                let options = {
                    contractAddress: addressArray[i],
                    functionName: 'getSenderTokens',
                    abi: GalaxyNFT.abi
                }
                let res = await Moralis.executeFunction(options)
                for(let x = 0; x < res.length; x++){
                    results.push(res[x])
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
                                return <DataCard key={"nftItem" + index} data={element} index={index}/>
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

const DataCard = ({data, index}) => {

    const {Moralis} = useMoralis()

    const formatDate = () => {
        var date = new Date(data.purchaseDate * 1000).toLocaleDateString("en-UK")
        return date
    }

    const purchaseNft = async () => {
        let options = {
            contractAddress: addresses.nfts.Galaxy.milkyWay,
            functionName: 'purchaseToken',
            abi: GalaxyNFT.abi,
            value: ethers.utils.parseEther(data.price.toString()),
            params:{
                tokenId: index.toString()
            }
        }
        await Moralis.executeFunction(options)
    }
    
    return(
        <GridWrapper overrides={{minWidth:'300px',border:'solid white 0.5px', borderRadius:'5px', margin:'30px', paddingBottom:'10px'}}>
            <div>
                <Row overrides={{marginTop:'15px'}}><Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{marginLeft:'20px'}}>Item #{index} of 100</SubTextFontMain></Col></Row>
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
            </div>
            <div>
                {data.forSale === true && <div style={{border:'solid #6e76e5 0.5px'}}></div>}
                { data.forSale === true &&
                    <Row overrides={{marginTop:'20px'}}>
                        <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Sale Price :</SubTextFontMain></Col>
                        <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{ethers.utils.formatEther(data.price)} | AVAX</SubTextFontNormal></Col>
                    </Row>
                }
                { data.forSale &&
                    <Row overrides={{ marginTop:'10px'}}>
                        <Col overrides={{alignItems:'flex-start', marginLeft:'20px'}}><Button fontSize={'15px'} text={'Purchase'} func={purchaseNft}/></Col>
                    </Row>
                }
            </div>
        </GridWrapper>
    )
}

export default MyNfts
import React,{ useState, useEffect } from 'react'
import {useMoralis} from 'react-moralis'
import { useLocation } from 'react-router'
import { GridWrapper, Row, Col } from '../components/shared/Grid'
import {Link} from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import ImageWrapper from '../components/shared/Image'
import {HeaderTextFontMain, SubTextFontMain, SubTextFontNormal} from '../components/shared/Text'
import {addresses} from '../contracts/contractAddresses'
import GalaxyNFT from '../contracts/abis/GalaxyNFT_milkyway'
import { ethers } from 'ethers'

const NftSet = () => {

    const location = useLocation()
    const [tab, setTab] = useState(0)

    return(
        <GridWrapper overrides={{marginTop:'50px'}}>
            <Row>
                <Col width={1}/>
                <Col width={2}>
                    <Link to={'/explore'}>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'40px', height:'50px', backgroundColor:'#6E76E5',borderRadius:'5px', transform:'rotate(90deg)'}}>
                            <ImageWrapper imageName={'arrow'} width={'12px'}/>
                        </div>
                    </Link>
                </Col>
                <Col width={10}>
                    <Card>
                        <HeaderTextFontMain>{location.state.metaData.type} - {location.state.metaData.name}</HeaderTextFontMain>
                    </Card>
                </Col>
                <Col width={7}/>
                <Col width={2} overrides={{marginRight:'8px'}}>
                    <Button func={() => setTab(0)} text={'Info'} overrides={{borderRadius:'0px',border:tab === 0 ? 'solid white 0.5px' : 'none'}}/>
                </Col>
                <Col width={2}>
                    <Button func={() => setTab(1)} text={'NFT data'} overrides={{borderRadius:'0px',border:tab === 1 ? 'solid white 0.5px' : 'none'}}/>
                </Col>
                <Col width={15}/>
            </Row>
            <Row overrides={{marginTop:'20px'}}>
                <Col width={1}/>
                <Col width={20}>
                    {tab === 0 ? <Info metaData={location.state.metaData}/> : <NFTData element={location.state.element}/>}
                </Col>
                <Col width={10}/>
            </Row>
        </GridWrapper>
    )
}

const Info = ({metaData}) => {

    const [info, setInfo] = useState(null)
    const [description, setDescription] = useState(null)
    const [imageId, setImageId] = useState(null)

    useEffect(() => {
        const {description, imageId, ...newObj} = metaData;
        setInfo(newObj)
        setDescription(description)
        setImageId(imageId)
    },[])

    return(
        <Card>
            <GridWrapper overrides={{marginTop:'20px', marginBottom:'50px'}}>
                <Row>
                    <Col width={1}/>
                    <Col width={2} overrides={{alignItems:'flex-start'}}>
                        {info && Object.keys(info).map((element, index) => {
                            return <SubTextFontMain overrides={{marginTop:'10px', fontWeight:'bold'}} key={'infotitle' + index}>{element} :</SubTextFontMain>
                        })}
                    </Col>
                    <Col width={5} overrides={{alignItems:'flex-start'}}>
                        {info && Object.values(info).map((element, index) => {
                            return <SubTextFontNormal overrides={{marginTop:'10px'}} key={'infotitle' + index}>{element}</SubTextFontNormal>
                        })}
                    </Col>
                    <Col width={10}>
                        <div style={{border:'solid #6e76e5 0.5px'}}>
                            <ImageWrapper imageName={imageId} width={'500px'}/>
                        </div>
                    </Col>
                    <Col width={1}/>
                </Row>
                <Row overrides={{marginTop:'50px'}}>
                    <Col width={1}/>
                    <Col width={10} overrides={{alignItems:'flex-start'}}>
                        <SubTextFontMain>Description :</SubTextFontMain>
                        <SubTextFontNormal overrides={{marginTop:'20px', fontSize:'17px'}}>{description}</SubTextFontNormal>
                    </Col>
                    <Col width={1}/>
                </Row>
            </GridWrapper>
        </Card>
    )
}

const NFTData = ({element}) => {

    const {Moralis} = useMoralis()
    const [data, setData] = useState(null)

    useEffect(() => {
        const f = async () => {
            let options = {
                contractAddress: addresses.nfts.Galaxy.milkyWay,
                functionName: 'getAllTokens',
                abi: GalaxyNFT.abi
            }
            const result = await Moralis.executeFunction(options)
            setData(result)
        }
        f()
    },[])

    // const data = [
    //     {number:1, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3', purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    //     {number:2, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 6.2, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
    //     {number:3, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    //     {number:4, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    //     {number:5, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    //     {number:6, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 15, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
    //     {number:7, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    //     {number:8, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    //     {number:9, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 15, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
    //     {number:10, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 6.2, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
    //     {number:11, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    // ]

    return(
        <Card overrides={{overflowY:'scroll', maxHeight:'700px'}}>
            <div style={{display:'flex', flexWrap:'wrap', flexBasis:'33.333333%'}}>
                {data && data.map((element, index) => {
                    return <DataCard key={"nftItem" + index} data={element} index={index}/>
                })}
            </div>
        </Card>
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
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner.slice(0, 7)}...</SubTextFontNormal></Col>
                </Row>
                <Row overrides={{marginTop:'5px'}}>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Purchase Price :</SubTextFontMain></Col>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{ethers.utils.formatEther(data.pricePaid)}</SubTextFontNormal></Col>
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

export default NftSet
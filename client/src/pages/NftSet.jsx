import React,{ useState } from 'react'
import { GridWrapper, Row, Col } from '../components/shared/Grid'
import {Link} from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import ImageWrapper from '../components/shared/Image'
import {HeaderTextFontMain, SubTextFontMain, SubTextFontNormal} from '../components/shared/Text'

const NftSet = ({setName = 'Mars'}) => {

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
                        <HeaderTextFontMain>Planet - {setName}</HeaderTextFontMain>
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
                    {tab === 0 ? <Info/> : <NFTData/>}
                </Col>
                <Col width={10}/>
            </Row>
        </GridWrapper>
    )
}

const Info = () => {

    const info = {
        Type:'Planet',
        System:'Solar System',
        Galaxy:'Milky Way',
        Moons:['Phobos','Deimos']
    }
    const Description = 'Mars is the fourth planet from the Sun and the next planet beyond Earth. It is, on average, more than 142 million miles from the Sun. Mars turns on its axis more slowly than Earth does. So, a day on Mars is 24.6 hours. Since this planet is farther from the Sun than Earth, one revolution of Mars around the Sun is a longer trip. So, a year on Mars is 687 Earth days. Mars is about half the size of Earth. Mars is known as the Red Planet because the iron oxide chemicals in its soil looks like rust. Mars is named for the ancient Roman god of war. The Greeks called the planet Ares (pronounced Air-EEZ). The Romans and Greeks associated the planet with war because its color resembles the color of blood.'


    return(
        <Card>
            <GridWrapper overrides={{marginTop:'20px', marginBottom:'50px'}}>
                <Row>
                    <Col width={1}/>
                    <Col width={2} overrides={{alignItems:'flex-start'}}>
                        {Object.keys(info).map((element, index) => {
                            return <SubTextFontMain overrides={{marginTop:'10px', fontWeight:'bold'}} key={'infotitle' + index}>{element} :</SubTextFontMain>
                        })}
                    </Col>
                    <Col width={5} overrides={{alignItems:'flex-start'}}>
                        {Object.values(info).map((element, index) => {
                            return <SubTextFontNormal overrides={{marginTop:'10px'}} key={'infotitle' + index}>{element}</SubTextFontNormal>
                        })}
                    </Col>
                    <Col width={10}>
                        <ImageWrapper imageName={'mars'} width={'500px'}/>
                    </Col>
                    <Col width={1}/>
                </Row>
                <Row overrides={{marginTop:'50px'}}>
                    <Col width={1}/>
                    <Col width={10} overrides={{alignItems:'flex-start'}}>
                        <SubTextFontMain>Description :</SubTextFontMain>
                        <SubTextFontNormal overrides={{marginTop:'20px', fontSize:'17px'}}>{Description}</SubTextFontNormal>
                    </Col>
                    <Col width={1}/>
                </Row>
            </GridWrapper>
        </Card>
    )
}

const NFTData = () => {

    const data = [
        {number:1, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3', purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
        {number:2, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 6.2, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
        {number:3, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
        {number:4, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
        {number:5, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
        {number:6, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 15, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
        {number:7, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
        {number:8, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
        {number:9, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 15, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
        {number:10, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 6.2, PurchasedOn: '04/12/2021', ForSale: false, SalePrice: 12},
        {number:11, owner:'0xbd422490aaAe1F16e14356B9af3c67cb147981B3',purchasePrice: 7, PurchasedOn: '04/12/2021', ForSale: true, SalePrice: 12},
    ]

    return(
        <Card overrides={{overflowY:'scroll', maxHeight:'700px'}}>
            <div style={{display:'flex', flexWrap:'wrap', flexBasis:'33.333333%'}}>
                {data.map((element, index) => {
                    return <DataCard data={element}/>
                })}
            </div>
        </Card>
    )
}

const DataCard = ({data}) => {

    return(
        <GridWrapper overrides={{minWidth:'300px',border:'solid white 0.5px', borderRadius:'5px', margin:'30px', paddingBottom:data.ForSale ? '20px' : '100px'}}>
            <Row overrides={{marginTop:'15px'}}><Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{marginLeft:'20px'}}>Item #{data.number} of 100</SubTextFontMain></Col></Row>
            <Row overrides={{marginTop:'30px'}}>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Owner :</SubTextFontMain></Col>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner.slice(0, 7)}...</SubTextFontNormal></Col>
            </Row>
            <Row overrides={{marginTop:'5px'}}>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Purchase Price :</SubTextFontMain></Col>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner.slice(0, 7)}...</SubTextFontNormal></Col>
            </Row>
            <Row overrides={{marginTop:'5px'}}>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Purcahsed On :</SubTextFontMain></Col>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner.slice(0, 7)}...</SubTextFontNormal></Col>
            </Row>
            <Row overrides={{marginTop:'5px', marginBottom:data.SalePrice === true ? 'none' : '15px'}}>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>For Sale :</SubTextFontMain></Col>
                <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner.slice(0, 7)}...</SubTextFontNormal></Col>
            </Row>
            { data.ForSale &&
                <Row>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontMain overrides={{fontSize:'16px', marginLeft:'20px'}}>Sale Price :</SubTextFontMain></Col>
                    <Col overrides={{alignItems:'flex-start'}}><SubTextFontNormal overrides={{fontSize:'14px'}}>{data.owner.slice(0, 7)}...</SubTextFontNormal></Col>
                </Row>
            }
            { data.ForSale &&
                <Row overrides={{marginBottom:'15px', marginTop:'30px'}}>
                    <Col overrides={{alignItems:'flex-start', marginLeft:'20px'}}><Button fontSize={'15px'} text={'Purchase'}/></Col>
                </Row>
            }
        </GridWrapper>
    )
}

export default NftSet
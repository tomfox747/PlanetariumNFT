import React,{useState, useEffect, useContext} from 'react'
import Card from 'components/shared/Card'
import { SubTextFontNormal } from 'components/shared/Text'
import { GridWrapper, Row, Col } from 'components/shared/Grid'
import ItemType from 'components/ItemType'
import { MarketplaceStore } from 'context/MarketplaceStore'

import GalaxyMarketplace from '../contracts/abis/GalaxyMarketplace'
import StarMarketplace from '../contracts/abis/StarMarketplace'

import GalaxyNFT from '../contracts/abis/GalaxyNFT'
import StarNFT from '../contracts/abis/StarNFT'

import { addresses } from 'contracts/contractAddresses'

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
        nftConfig: GalaxyNFT
    },
    2: {
        config: StarMarketplace,
        address: addresses.marketPlaces.Star,
        nftConfig: StarNFT
    }
}

const Explore = () => {

    const {currentMarketplace, setCurrentMarketplace} = useContext(MarketplaceStore)
    const[selectedTab, setSelectedTab] = useState(1)

    useEffect(() => {
        setCurrentMarketplace(marketplaceMapper[selectedTab])
    },[selectedTab])

    return(
        <GridWrapper overrides={{marginTop:'50px'}}>
            <Row>
                <Col width={1}/>
                <Col width={20}>
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                </Col>
                <Col width={20}/>
            </Row>
            <Row overrides={{marginTop:'20px'}}>
                <Col><ItemType type={tabConfig.find(x => x.id === selectedTab)}/></Col>
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

export default Explore
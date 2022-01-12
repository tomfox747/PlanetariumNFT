import React,{useContext, useEffect, useState} from 'react'
import { Switch, Link, Route, useHistory} from 'react-router-dom'
import { MoralisStore } from 'context/MoralisStore'
import { EthersStore } from 'context/EthersStore'
import {GridWrapper, Row, Col} from './shared/Grid'
import ImageWrapper from './shared/Image'
import {HeaderTextFontMain, HeaderTextFontNormal, SubTextFontMain} from './shared/Text'

import Explore from 'pages/Explore'
import NotConnected from 'pages/NotConnected'
import NftSet from 'pages/NftSet'
import MyNfts from 'pages/MyNfts'


const MenuBar = () => {
    
    const history = useHistory()
    const {address, connectWallet, chain} = useContext(EthersStore)

    useEffect(() => {
        if(address === null || address === undefined || chain !== true) history.push('/')
    },[address, history, chain])

    if(address !== null && address !== undefined && chain === true){
        return(
            <AuthenticatedMenu/>
        )
    }

    return <UnauthenticatedMenu/>
}

const AuthenticatedMenu = () => {
    
    const history = useHistory()
    const {address, connectWallet} = useContext(EthersStore)

    useEffect(() => {
        if(address === null || address === undefined) {
            connectWallet()
            window.location.reload()
        }
        else{history.push('/explore')}
    },[address, history])

    return(
        <GridWrapper >
            <Row overrides={{paddingTop:'10px',paddingBottom:'10px',backgroundColor:'black', height:'80px'}}>
                <Col width={1}/>
                <Col width={4}><ImageWrapper width={'50px'} imageName={'logo'}/></Col>
                <Col width={1}/>
                <Col width={7}><HeaderTextFontMain>Planetarium</HeaderTextFontMain></Col>
                <Col width={1}/>
                <Col width={5} overrides={{border:'solid white 1px', borderRadius:'5px'}}><SubTextFontMain size={'16px'}>NFT</SubTextFontMain></Col>
                <Col width={40}/>
                <Col width={10}>
                    <Link to={"/home"}>
                        <HeaderTextFontNormal size={20}>Home</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/Explore"}>
                        <HeaderTextFontNormal size={20}>Explore</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/MyNfts"}>
                        <HeaderTextFontNormal size={20}>My NFTs</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/About"}>
                        <HeaderTextFontNormal size={20}>About</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/Contact"}>
                        <HeaderTextFontNormal size={20}>Contact</HeaderTextFontNormal>
                    </Link>
                </Col>
                <ConnectionWidget account={address} auth={connectWallet}/>
                <Col width={3}/>
            </Row>
            <Row>
                <Switch>
                    <Route exact path="/"><NotConnected/></Route>
                    <Route exact path="/home"></Route>
                    <Route exact path="/explore"><Explore/></Route>
                    <Route exact path="/nftset"><NftSet/></Route>
                    <Route exact path="/mynfts"><MyNfts/></Route>
                    <Route exact path="/about"></Route>
                    <Route exact path="/contact"></Route>
                </Switch>
            </Row>
        </GridWrapper>
    )
}

const ConnectionWidget = ({account, auth}) => {

    const [hover, setHover] = useState(false)

    return(
        <Col width={15} overrides={{border:'solid white 0.5px', borderRadius:'5px', padding:'5px', flexDirection:'row'}}>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => auth()} style={{cursor:hover?'pointer':'default'}}>
                <Row>
                    <Col width={10} overrides={{marginRight:'10px'}}><HeaderTextFontNormal size={'16px'}>{account ? account.slice(0,10) + '...' : "Not Connected"}</HeaderTextFontNormal></Col>
                    <Col width={3}><ImageWrapper imageName={'avax'} width={'35px'}/></Col>
                </Row>
            </div>
            
        </Col>
    )
}

const UnauthenticatedMenu = () => {

    const {address, connectWallet} = useContext(EthersStore)

    const auth = async() => {
        await connectWallet()
        window.location.reload()
    }

    return(
        <GridWrapper>
            <Row overrides={{backgroundColor:'black', height:'80px', paddingTop:'5px', paddingBottom:'5px'}}>
                <Col width={1}/>
                <Col width={4}><ImageWrapper width={'50px'} imageName={'logo'}/></Col>
                <Col width={1}/>
                <Col width={7}><HeaderTextFontMain>Planetarium</HeaderTextFontMain></Col>
                <Col width={1}/>
                <Col width={5} overrides={{border:'solid white 1px', borderRadius:'5px'}}><SubTextFontMain size={'16px'}>NFT</SubTextFontMain></Col>
                <Col width={40}/>
                <Col width={10}>
                    <Link to={"/"}>
                        <HeaderTextFontNormal size={20}>Login</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/About"}>
                        <HeaderTextFontNormal size={20}>About</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/Contact"}>
                        <HeaderTextFontNormal size={20}>Contact</HeaderTextFontNormal>
                    </Link>
                </Col>
                <Col width={15} overrides={{border:'solid white 0.5px', borderRadius:'5px', padding:'5px', flexDirection:'row'}}>
                    <div onClick={() => auth()}>
                        <Row>
                            <Col width={10} overrides={{marginRight:'10px'}}><HeaderTextFontNormal size={'16px'}>{ address ? address.slice(0,10) + '...' : "Not Connected"}</HeaderTextFontNormal></Col>
                            <Col width={3}><ImageWrapper imageName={'avax'} width={'35px'}/></Col>
                        </Row>
                    </div>
                    
                </Col>
                <Col width={3}/>
            </Row>
            <Row>
                <Switch>
                    <Route exact path="/"><NotConnected/></Route>
                    <Route exact path="/about"></Route>
                    <Route exact path="/contact"></Route>
                </Switch>
            </Row>
        </GridWrapper>
    )
}

export default MenuBar
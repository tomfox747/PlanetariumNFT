import React,{useContext, useEffect, useState} from 'react'
import { Switch, Link, Route, useHistory} from 'react-router-dom'
import { MoralisStore } from 'context/MoralisStore'
import {GridWrapper, Row, Col} from './shared/Grid'
import ImageWrapper from './shared/Image'
import {HeaderTextFontMain, SubTextFontMain, SubTextFontNormal} from './shared/Text'

import Explore from 'pages/Explore'
import NotConnected from 'pages/NotConnected'

const MenuBar = () => {
    
    const history = useHistory()
    const {account, isAuthenticated, authenticate, user} = useContext(MoralisStore)

    useEffect(() => {
        if(account === null || account === undefined) history.push('/')
    },[account])

    if(account !== null && account !== undefined){
        return(
            <AuthenticatedMenu/>
        )
    }

    return <UnauthenticatedMenu/>
}

const AuthenticatedMenu = () => {
    
    const history = useHistory()
    const {account, isAuthenticated, authenticate} = useContext(MoralisStore)

    useEffect(() => {
        if(!isAuthenticated) authenticate()
        if(account)history.push('/explore')
    },[account, isAuthenticated])

    const auth = async () => {
        await authenticate()
        window.location.reload()
    }

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
                        <SubTextFontMain>Home</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/Explore"}>
                        <SubTextFontMain>Explore</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/My NFTs"}>
                        <SubTextFontMain>My NFTs</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/About"}>
                        <SubTextFontMain>About</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/Contact"}>
                        <SubTextFontMain>Contact</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={15} overrides={{border:'solid white 0.5px', borderRadius:'5px', padding:'5px', flexDirection:'row'}}>
                    <div onClick={() => auth()}>
                        <Row>
                            <Col width={10} overrides={{marginRight:'10px'}}><SubTextFontMain size={'16px'}>{account ? account.slice(0,10) + '...' : "Not Connected"}</SubTextFontMain></Col>
                            <Col width={3}><ImageWrapper imageName={'avax'} width={'35px'}/></Col>
                        </Row>
                    </div>
                    
                </Col>
                <Col width={3}/>
            </Row>
            <Row>
                <Switch>
                    <Route exact path="/"><NotConnected/></Route>
                    <Route exact path="/home"></Route>
                    <Route exact path="/explore"><Explore/></Route>
                    <Route exact path="/mynfts"></Route>
                    <Route exact path="/about"></Route>
                    <Route exact path="/contact"></Route>
                </Switch>
            </Row>
        </GridWrapper>
    )
}

const UnauthenticatedMenu = () => {

    const history = useHistory()
    const {account, isAuthenticated, authenticate} = useContext(MoralisStore)

    const auth = async () => {
        await authenticate()
        window.location.reload()
    }

    return(
        <GridWrapper overrides={{backgroundColor:'black', height:'80px'}}>
            <Row overrides={{paddingTop:'5px', paddingBottom:'5px'}}>
                <Col width={1}/>
                <Col width={4}><ImageWrapper width={'50px'} imageName={'logo'}/></Col>
                <Col width={1}/>
                <Col width={7}><HeaderTextFontMain>Planetarium</HeaderTextFontMain></Col>
                <Col width={1}/>
                <Col width={5} overrides={{border:'solid white 1px', borderRadius:'5px'}}><SubTextFontMain size={'16px'}>NFT</SubTextFontMain></Col>
                <Col width={40}/>
                <Col width={10}>
                    <Link to={"/"}>
                        <SubTextFontMain>Login</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/About"}>
                        <SubTextFontMain>About</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={10}>
                    <Link to={"/Contact"}>
                        <SubTextFontMain>Contact</SubTextFontMain>
                    </Link>
                </Col>
                <Col width={15} overrides={{border:'solid white 0.5px', borderRadius:'5px', padding:'5px', flexDirection:'row'}}>
                    <div onClick={() => auth()}>
                        <Row>
                            <Col width={10} overrides={{marginRight:'10px'}}><SubTextFontMain size={'16px'}>{isAuthenticated && account ? account.slice(0,10) + '...' : "Not Connected"}</SubTextFontMain></Col>
                            <Col width={3}><ImageWrapper imageName={'avax'} width={'35px'}/></Col>
                        </Row>
                    </div>
                    
                </Col>
                <Col width={3}/>
            </Row>
            <Switch>
                <Route exact path="/"><NotConnected/></Route>
                <Route exact path="/about"></Route>
                <Route exact path="/contact"></Route>
            </Switch>
        </GridWrapper>
    )
}

export default MenuBar
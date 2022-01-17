import { GridWrapper, Row, Col } from 'components/shared/Grid'
import React,{useContext} from 'react'
import Card from 'components/shared/Card'
import ImageWrapper from 'components/shared/Image'
import { HeaderTextFontMain, SubTextFontNormal } from 'components/shared/Text'
import Button from 'components/shared/Button'
import { MoralisStore } from 'context/MoralisStore'
import { EthersStore } from 'context/EthersStore'

const NotConnected = () => {

    //const {authenticate} = useContext(MoralisStore)
    const {connectWallet} = useContext(EthersStore)

    const funct = async () => {
        await connectWallet()
        window.location.reload()
    }

    return(
        <GridWrapper>
            <Row overrides={{marginTop:'100px'}}>
                <Col width={5}/>
                <Col width={4}>
                    <Card overrides={{borderRadius:'20px'}}>
                        <Row overrides={{marginTop:'30px'}}>
                            <Col>
                                <HeaderTextFontMain overrides={{margin:'10px', textAlign:'center'}} size={25}>Own A Piece Of The Universe</HeaderTextFontMain>
                            </Col> 
                        </Row>
                        <Row overrides={{marginTop:'10px'}}>
                            <Col>
                                <SubTextFontNormal overrides={{margin:'10px', textAlign:'center'}} size={'18px'}>Welcome To The Home Of Intergalactic NFTs</SubTextFontNormal>
                            </Col> 
                        </Row>
                        <Row overrides={{marginTop:'40px'}}>
                            <Col>
                                <ImageWrapper imageName={'metaMask'} width={'200px'}/>
                            </Col>
                        </Row>
                        <Row overrides={{marginTop:'30px'}}>
                            <Col>
                                <Button overrides={{width:'250px'}} text={"Connect Metamask"} func={funct}/>
                            </Col>
                        </Row>
                        <Row overrides={{marginTop:'10px', marginBottom:'20px'}}>
                            <Col>
                                <Button overrides={{backgroundColor:'red', width:'250px'}} text={"Connect To The Fuju Testnet"} func={funct}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col width={5}/>
            </Row>
        </GridWrapper>
    )
}

export default NotConnected
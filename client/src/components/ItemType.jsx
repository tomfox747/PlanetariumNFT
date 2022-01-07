import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Card from './shared/Card'
import { GridWrapper, Row, Col } from './shared/Grid'
import { HeaderTextFontNormal, SubTextFontNormal } from './shared/Text'
import ImageWrapper from './shared/Image'

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

    const items = [
        {title:'Saturn', contractAddress:'0x3h5k3jl23j33hk5fh98a043nt43q899ri', available:14, image:'saturn'},
        {title:'Mars', contractAddress:'0x3h5k3jl23j33hk5fh98a043nt43q899ri', available:51, image:'mars'},
        {title:'Earth', contractAddress:'0x3h5k3jl23j33hk5fh98a043nt43q899ri', available:3, image:'earth'},
        {title:'Earth', contractAddress:'0x3h5k3jl23j33hk5fh98a043nt43q899ri', available:3, image:'earth'}
    ]

    return(
        <GridWrapper>
            <Row>
                <Col>
                    { items.map((element, index) => {
                        return <div style={{height:'300px', width:'100%', borderBottom:'solid #4F4F4F 0.2px'}}>
                            <Item key={'item'+index} element={element}/>
                        </div>
                    })}
                </Col>
            </Row>
        </GridWrapper>
    )
}

const Item = ({element}) => {

    const [hover, setHover] = useState(false)

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{display:'flex', alignItems:'center', width:'100%', height:'300px',backgroundColor:hover ? 'rgba(79,79,79,0.3)' : ''}}>
            <GridWrapper overrides={{marginTop:'10px', marginBottom:'30px'}}>
                <Row>
                    <Col width={5}>
                        <Row>
                            <Col width={1}/>
                            <Col width={15} overrides={{alignItems:'flex-start'}}>
                                <HeaderTextFontNormal overrides={{textDecoration:'underline'}}>{element.title}</HeaderTextFontNormal>
                            </Col>
                        </Row>
                        <Row overrides={{marginTop:'20px'}}>
                            <Col width={1}/>
                            <Col width={10}>
                                <Row>
                                    <Col width={5} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>NFT Contract:</SubTextFontNormal></Col>
                                    <Col width={10} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>{element.contractAddress}</SubTextFontNormal></Col>
                                </Row>
                                <Row>
                                    <Col width={5} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>Available For Purchase:</SubTextFontNormal></Col>
                                    <Col width={10} overrides={{alignItems:'flex-start'}}><SubTextFontNormal>{element.available} / 100</SubTextFontNormal></Col>
                                </Row>
                                <Row overrides={{marginTop:'20px'}}>
                                    <Col overrides={{alignItems:'flex-start'}}>
                                        <Link to={'/nftset'}>
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
                            <Col width={3}>
                                <div>
                                    <ImageWrapper imageName={element.image} width={'230px'}/>
                                </div>
                            </Col>
                            <Col width={1}/>
                        </Row>
                    </Col>
                </Row>
            </GridWrapper>
        </div>
    )
}

export default ItemType
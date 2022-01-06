import React from 'react'
import { GridWrapper, Row, Col } from './shared/Grid'
import Card from './shared/Card'

const Filters = () => {

    return (
        <GridWrapper>
            <Row>
                <Col overrides={{color:'white'}}>
                    Filters
                </Col>
            </Row>
        </GridWrapper>
    )
}

export default Filters
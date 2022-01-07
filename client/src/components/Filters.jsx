import React from 'react'
import { GridWrapper, Row, Col } from './shared/Grid'

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
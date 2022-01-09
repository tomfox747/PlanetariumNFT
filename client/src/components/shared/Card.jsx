import React from 'react'
import { GridWrapper, Row, Col } from './Grid'

const Card = ({overrides, children}) => {

    return(
        <GridWrapper overrides={{ width:'100%', border:'solid #6E76E5 0.5px', borderRadius:'5px', backgroundColor:'rgba(0, 0, 0, 0.5)', ...overrides}}>
            <Row>
                <Col>
                    {children}
                </Col>
            </Row>
        </GridWrapper>
    )
}

export default Card
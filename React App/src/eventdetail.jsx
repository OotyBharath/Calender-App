import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class EvDetail extends React.Component{ 
    render(){
        return(
        <div>
        <Container>
            <Row style={{'padding-top': '50px'}}>
                <Col xs='6'>Status: </Col>
                <Col xs='6'>
                <select>
                    <option value='Not Completed'>Not Completed</option>
                    <option value='Completed'>Completed</option>
                </select>
                </Col>
            </Row>
        </Container>
        </div>
        );
    }
}
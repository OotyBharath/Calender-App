import React from 'react';
import CalView from './calender';
import Event from './createevent';
import EvDetail from './eventdetail';
import { Container, Row, Col } from 'reactstrap';
import Axios from 'axios';

export default class CalenMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            chap_id: '',
            mem_id: '',
            chap_mem_name_first: '',
             creatEv: false,
             viewCal: false, 
             editEv: false }
    }

    componentDidMount()
    {
        var usr = {usrnm: this.props.uname}
        Axios.post('/calmenu', {lgndetail: JSON.stringify(usr)})
        .then(res => {
            console.log(res.data)
                //var userData = JSON.parse(res.data);
                this.setState({mem_id: res.data.mem_id, 
                               chap_id: res.data.chap_id,
                            chap_mem_name_first: res.data.chap_mem_name_first})
        }).catch(error => {
            alert(error)})
    }

    render(){
        
        if(this.state.creatEv == true)
        { 
            return(
                <div>
              <Event />
              </div>      
              );
        }

        else if(this.state.viewCal == true)
        { 
            return(
                <div>
              <CalView cname={this.state.chap_id}/>
              </div>      
              );
        }

        else if(this.state.editEv == true)
        { 
            return(
                <div>
              <EvDetail />
              </div>      
              );
        }

        return(
            <div>
                <h1>Select Operation:</h1>
                <Container>
                    <Row>
                        <Col>
                        <h1>Member ID: {this.state.mem_id} </h1>
                        </Col>
                        <Col>
                        <h1>Chapter ID: {this.state.chap_id} </h1>
                        </Col>
                        <Col>
                        <h1>Member First Name: {this.state.chap_mem_name_first} </h1>
                        </Col>
                    </Row>
                    <Row style={{'padding-top': '30px'}}>
                        <Col xs='12'>
                        <button onClick={() => {this.setState({creatEv: true})}} > Create Event</button>
                        </Col>
                    </Row>
                    <Row style={{'padding-top': '30px'}}>
                        <Col xs='12'>
                        <button onClick={() => {this.setState({viewCal: true})}}>View Calender</button>
                        </Col>
                    </Row>
                    <Row style={{'padding-top': '30px'}}>
                        <Col xs='12'>
                        <button onClick={() => {this.setState({editEv: true})}}> Edit Event info</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
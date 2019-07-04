import React,{ Component} from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav } from 'reactstrap';
import Axios from 'axios';
import "./images/favicon.ico";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/daterangepicker/daterangepicker.css";
import url from "./images/cal.jpg";
//import { createBrowserHistory } from "history";
//const browserHistory = createBrowserHistory();
//browserHistory.replace({ firstPage: true });

const history = window.history;
//Registration Form Component
class RegisterForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {mem_id: '',
chap_id: '', fname: '', lname: '',                        
email1: '', email2: '', role_id: '',
ph1: '', ph2: ''};

this.handleMemId = this.handleMemId.bind(this);
this.handleChapId = this.handleChapId.bind(this);
this.handleRoleId = this.handleRoleId.bind(this);
this.handleFname = this.handleFname.bind(this);
this.handleLname = this.handleLname.bind(this);
this.handleEmail1 = this.handleEmail1.bind(this);
this.handleEmail2 = this.handleEmail2.bind(this);
this.handlePh1 = this.handlePh1.bind(this);
this.handlePh2 = this.handlePh2.bind(this);
this.handleCreateMem = this.handleCreateMem.bind(this);
      }

      handleMemId(e){
          this.setState({mem_id: e.target.value});
      }

      handleChapId(e){
        this.setState({chap_id: e.target.value});
    }

    handleRoleId(e){
        this.setState({role_id: e.target.value});
    }

    handleFname(e){
        this.setState({fname: e.target.value});
    }

    handleLname(e){
        this.setState({lname: e.target.value});
    }

    handleEmail1(e){
        this.setState({email1: e.target.value});
    }

    handleEmail2(e){
        this.setState({email2: e.target.value});
    }

    handlePh1(e){
        this.setState({ph1: e.target.value});
    }

    handlePh2(e){
        this.setState({ph2: e.target.value});
    }
    handleCreateMem(e){
        e.preventDefault();
        const memdet = {
            memid: this.state.mem_id,
            chapid: this.state.chap_id,
            roleid: this.state.role_id,
            fname: this.state.fname,
            lname: this.state.lname,
            em1: this.state.email1,
            em2: this.state.em2,
            ph1: this.state.ph1,
            ph2: this.state.ph2
        }

        Axios.post('/registerform', {memdetail: JSON.stringify(memdet)})
        .then(res => {
            alert('Row inserted with status: '+res.data);
        }).catch(error => {
            if(error){
                alert(error);
            }
        });
        
    }

//Render the registration form.
render(){
    return(
        <div>
            { /* Form Elements */ }
            <div className="limiter">
                <div className="container-login100"  style={{"background-image": "url("+url+")"}}>
                    <div className="wrap-login100">
                        <form onSubmit={this.handleCreateMem}>
                            <Container>
                                <Row style={{'padding-top': '30px', 'align': 'center'}}>
                                    <Col sx='12'><h1 className="login100-form-title p-b-34 p-t-27">
                                        Register Form:
                                    </h1></Col>
                                </Row>
                                <Row>
                                    <Col xs='3'>Member id:</Col>
                                    <Col xs='6'><label>
                                        <input type="text" value={this.state.value} onChange={this.handleMemId} required/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Chapter id:</Col>
                                    <Col xs='6'><label>
                                        <input type="text" value={this.state.value} onChange={this.handleChapId} required/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Role id:</Col>
                                    <Col xs='6'><label>
                                        <input type="number" value={this.state.value} onChange={this.handleRoleId} required/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>First Name:</Col>
                                    <Col xs='6'><label>
                                        <input type="text" value={this.state.value} onChange={this.handleFname} required/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Last Name:</Col>
                                    <Col xs='6'><label>
                                        <input type="text" value={this.state.value} onChange={this.handleLname}/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Email 1:</Col>
                                    <Col xs='6'><label>
                                        <input type="text" value={this.state.value} onChange={this.handleEmail1} required/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Email 2:</Col>
                                    <Col xs='6'><label>
                                        <input type="text" value={this.state.value} onChange={this.handleEmail2}/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Phone 1:</Col>
                                    <Col xs='6'><label>
                                        <input type="number" value={this.state.value} onChange={this.handlePh1} required/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '10px', 'align': 'center'}}>
                                    <Col xs='3'>Phone 2:</Col>
                                    <Col xs='6'><label>
                                        <input type="number" value={this.state.value} onChange={this.handlePh2}/></label>
                                    </Col>
                                    <Col xs='3'></Col>
                                </Row>
                                <Row style={{'padding-top': '50px'}}>
                                            <Col xs='2'></Col>
                                            <Col xs='5'><input type="submit" value="Create Member" /></Col>
                                            <Col xs='5'><button type='button' onClick={() => {history.back()}}>Go Back!</button></Col>
                                </Row>
                            </Container>
                            </form>
                    </div>
                </div> 
            </div>  
        </div>
    );
}
}export default RegisterForm;

//Header file.
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
//import { RegisterForm } from './registerform';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import DemoApp from './calender';
import RegisterForm from './registerform';
import Calender from './calender';
import Axios from 'axios';
const history = window.history;


//React component for the login form.
class LoginForm extends React.Component{
  //Constructor to initialize the values.
  constructor(props) {
      super(props);
      this.state = {name: '',
                    pass: '',
                  status: false};

      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.setStatus = this.setStatus.bind(this);

    }
//Set values for username and password field.
    handleUsername(e) {
      this.setState({name: e.target.value});
    }
    handlePassword(e) {
      this.setState({pass: e.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();

      const det = {
        name: this.state.name,
        pass: this.state.pass
      }

      Axios.post('/', {detail: JSON.stringify(det)})
      .then(res => {
        alert('A name was submitted: ' + this.state.name);
        //const result = JSON.stringify(res.data);
        if(res.data == 'OK')
        {
        alert(res.data);
        this.setState({status: true});
        //this.props.router.push('/calender');
        }
      })
      .catch(error => {
        if(error){
        console.log(error); 
        alert('Username or password incorrect. Please enter correct details again.')}
      });
      }
      
    render() {
      if (this.state.status === true) {
        return(
          <div>
        {/*<BrowserRouter forceRefresh={true}>
         <Redirect from='/' to='/calender' />

        </BrowserRouter>*/}
        <DemoApp />
        </div>      
        );
      }
      return (
        
        <div>
            <Router>
                <div>
                  <Switch>
                    <Route exact path='/' render= {() =>
                      <form onSubmit={this.handleSubmit}>
                        <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                          <ul class="navbar-nav active">
                            <li><Link to={'/registerform'} className="nav-link"> RegisterForm </Link></li>
                          </ul>
                        </nav>
                        <Container>
                          <Row style={{'padding-bottom': '30px'}}>
                            <Col xs='12'>
                              <h1 style={{'text-align': 'center', color: 'green', 'padding-top': '100px'}}>Calender App</h1>
                            </Col>
                          </Row>
                          <Row style={{'padding-top': '70px'}}>
                            <Col xs='3'>Username:</Col>
                            <Col xs='6'><label>
                                <input type="text" value={this.state.value} onChange={this.handleUsername} /></label>
                            </Col>
                            <Col xs='3'></Col>
                          </Row>
                          <Row style={{'padding-top': '50px'}}>
                            <Col xs='3'>Password: </Col>
                            <Col xs='6'>
                              <label>                
                                <input type="text" value={this.state.value} onChange={this.handlePassword} />
                              </label>
                            </Col>
                            <Col xs='3'></Col>
                          </Row>
                          <Row style={{'padding-top': '50px'}}>
                            <Col xs='3'></Col>
                            <Col xs='6'><input type="submit" value="Submit" /></Col>
                            <Col xs='3'></Col>
                          </Row>
                          </Container>
                        </form>} />
                    <Route path='/registerform' component={RegisterForm} />
                    <Route path='/calender' component={Calender} />
                   </Switch>
                </div>
            </Router>              
            </div>
      );
    }
  }
export default LoginForm;
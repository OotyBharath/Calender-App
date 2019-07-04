//Header file.
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
//import { RegisterForm } from './registerform';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import './util.css';
//import DemoApp from './calender';
import RegisterForm from './registerform';
//import Calender from './calender';
import CalenMenu from './calmenu';
import Admin from './adminview';

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
const history = window.history;



//React component for the login form.
class LoginForm extends React.Component{
  //Constructor to initialize the values.
  constructor(props) {
      super(props);
      this.state = {name: '',
                    pass: '',
                  status: false,
                isAdmin: false};

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
        if(det.name == 'admin' && det.pass == 'admin')
        {
          alert('Redirecting to Admin Page');
          this.setState({isAdmin: true});
        }
        else if(res.data == 'OK')
        {
        alert(res.data);
        this.setState({status: true});
        //this.props.router.push('/calender');
        }
      })
      .catch(error => {
        if(error){
        console.log(error); 
        this.setState({name: '', pass: ''})
        alert('Username or password incorrect. Please enter correct details again.')}
      });
      }
      
    render() {
      if (this.state.status == true) {
        return(
          <div>
        {/*<BrowserRouter forceRefresh={true}>
         <Redirect from='/' to='/calender' />
        </BrowserRouter>*/}
        <CalenMenu uname={this.state.name}/>
        </div>      
        );
      }

      else if (this.state.isAdmin == true) {
        return(
          <div>
        <Admin />
        </div>      
        );
      }
      return (
        <div>
            <Router>
                <div>
                  <Switch>
                    <Route exact path='/' render= {() =>
                    <div className="limiter">
                      <div className="container-login100" style={{"background-image": "url("+url+")"}}>
                        <div className="wrap-login100">
                            <form onSubmit={this.handleSubmit}>

                              <Container>
                                <Row>
                                  <span className="login100-form-logo">
                                    <i className="zmdi zmdi-time"></i>
                                  </span>
                                </Row>
                                <Row>
                                  <Col xs='12'>
                                    <span className="login100-form-title p-b-34 p-t-27">
                                      <h1 >CALENDER APP</h1>
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs='12'>
                                  <div class="wrap-input100 validate-input" >
                                    <input class="input100" type="text" name="username" placeholder="Username" value={this.state.name} onChange={this.handleUsername} />
                                    <span class="focus-input100" data-placeholder="&#xf207;"></span>
                                  </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs='12'>
                                  <div class="wrap-input100 validate-input" >
                                    <input class="input100" type="password" name="pass" placeholder="Password" value={this.state.pass} onChange={this.handlePassword} />
                                    <span class="focus-input100" data-placeholder="&#xf191;"></span>
                                  </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs='12'>
                                    <div className="container-login100-form-btn">
                                      <button className="login100-form-btn" type="submit">Login</button>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                  <div className="text-center p-t-90">
                                    <Link to={'/registerform'} className="txt1">
                                      Register
                                    </Link>
                                  </div>
                                  </Col>
                                </Row>
                                </Container>
                              </form>
                        </div>
                      </div>
                    </div>
                        
                        } />
                    <Route path='/registerform' component={RegisterForm} />
                    <Route path='/calmenu' component={CalenMenu} />
                   </Switch>
                </div>
            </Router>              
            </div>
      );
    }
  }
export default LoginForm;

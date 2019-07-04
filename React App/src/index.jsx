import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import LoginForm from './loginform.jsx';
import './index.css';
/*
class Calender extends React.Component {
  render(){
    return(
      <div>
        <LoginForm />
        ,</div>
    );
  }
}
  */
ReactDOM.render(<LoginForm />, document.getElementById('root'));
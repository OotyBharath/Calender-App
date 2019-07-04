import React, {Component} from 'react';
import Modal from 'react-modal';
import Validation from 'react-validation';
import "./validation.js";
//import EditOp from './editoperation';
//import DeleteOp from './deleteoperation';
import Axios from 'axios';

function ShowTable(props){
    return(
<div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover container-fluid">
                    <thead>
                        <tr>
                            <th>Member Id</th>
                            <th>Chapter Id</th>
                            <th>Role Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email1</th>
                            <th>Email2</th>
                            <th>Phone number1</th>
                            <th>Phone number2</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.users.map(member =>
                        <tr key={member.mem_id}>
                        <td>{member.mem_id}</td>
                        <td>{member.chap_id}</td>
                        <td>{member.role_id}</td>
                        <td>{member.chap_mem_name_first}</td>
                        <td>{member.chap_mem_name_last}</td>
                        <td>{member.chap_mem_email1}</td>
                        <td>{member.chap_mem_email2}</td>
                        <td>{member.chap_mem_phone1}</td>
                        <td>{member.chap_mem_phone2}</td>
                        <td><a onClick={() => this.setState({editOn: true})}>Edit</a>|<a onClick={(event) => this.delRec(event,member.mem_id)}>Delete</a></td>
                        </tr>
                    )}
    
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            chap_id: '',
            role_id: '',
            fname: '',
            lname: ''
            }
        this.delRec = this.delRec.bind(this);
    }
 
    delRec(e, member_id)
    {   e.preventDefault();
        var delDet = {
            mem_id: member_id,
        }
            Axios.post("/adminview/delete", {ddetail: JSON.stringify(delDet)
            }).then(function(res) {
            if(res.status == 200)
            {
                   // var resData = JSON.parse(res.data);
                this.setState({users: res.data})
                //alert(resData)
                alert("User has been deleted.")
            }
            else 
                {
                  throw new Error("Bad response from server")
                }
                }).catch(function(err) {
                console.log(err)
            });
    }

    componentDidMount() {
        let self = this;
        fetch('/adminview', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    //Render Page.
    render() {
        return (
        <div>
            <ShowTable users={this.state.users} />
        </div>
        );
        
    }
}
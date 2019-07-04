import React from 'react';

export default class EditOp extends React.Component{
    constructor(props){
        super(props);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }


    //Edit functionality
    handleEdit(event) {
        event.preventDefault()
        var data = {
            role_id: this.state.role_id,
            chap_id: this.state.chap_id
        }
        fetch("/edit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if (data === "success") {
                alert('User has been updated.');
            }
        }).catch(function(err) {
            console.log(err)
        });
    }
    render(){
        return(
            <div>
               <h1>Edit records</h1> 
            </div>
        );

    }
}
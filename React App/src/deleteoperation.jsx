import React from 'react';

export default class DeleteOp extends React.Component{
    
    //Delete Member
    deleteMember(member){
        var data = {
            mem_id: member.mem_id
        }

        fetch("/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data === "success"){
               alert("User has been deleted.");  
            }
        }).catch(function(err) {
            console.log(err)
        });
    }


    render(){        
        return(
            <div>
                <h1>
                Delete Records
                </h1>
            </div>
            
        );
    }
}
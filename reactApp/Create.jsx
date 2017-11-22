import React, {Component} from 'react'

import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { Redirect } from 'react-router-dom'



class Create extends React.Component{
    constructor(props){
        super(props);

        this.state={
            createdSuccessfully:""
        };
        this.updateForm =this.updateForm.bind(this);
        this.createvenue= this.createvenue.bind(this);
    }

    updateForm(e){
        var obj ={};
        obj[e.target.name] = e.target.value;
        this.setState(obj, function(){

        })
    }
    createvenue(){
        axios.post('api/create',{name:this.state.name,email:this.state.email,address:this.state.address})
            .then(res=>{
                console.log(res);
                // this.props.venueList();
                this.setState({createdSuccessfully:true});
            })
    }

    render(){
        return(
            <div>
                { !this.state.createdSuccessfully ?
                <div>
                <TextField
                    name="name"
                    placeholder="Name"
                    helperText="Enter name"
                    onChange={this.updateForm}
                />
                <TextField
                    name="email"
                    placeholder="Email"
                    helperText="Enter email"
                    onChange={this.updateForm}
                />
                <TextField
                    name="address"
                    placeholder="Address"
                    helperText="Enter New Address"
                    onChange={this.updateForm}
                />
                <Button type="submit" onClick={this.createvenue} >ADD </Button>
                </div>
                     :
                    <Redirect to='/' />
                }
            </div>
        );
    }
}

export default Create
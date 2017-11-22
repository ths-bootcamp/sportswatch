import React, {Component} from 'react'

import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class Update extends Component{
    constructor(props){
        super(props);

        this.state = {
            name:this.props.editValues ? this.props.editValues.name : "hyd",
            email:this.props.editValues ? this.props.editValues.email : "enter mail",
            phone:9087609877,
            // sports: [this.props.editValues ? this.props.editValues: "Enter a sport"]
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.updateVenue = this.updateVenue.bind(this);
        // this.updateStateSports = this.updateStateSports.bind(this);

    }
    updateVenue(e){
        var id=this.props.editValues._id;

        axios.post(`/api/view/`+id+`/edit/`, this.state)
            .then(res => {
                // console.log(res.data)
                // this.props.updatemethod()
            });
    }

    updateStateEmail(e){
        this.setState({email:e.target.value})

    }

    // updateStateSports(e){
    //     this.setState({sports:e.target.value})
    //
    // }


    render(){
        var my = {
            padding: 20,

        }

        return(
            <div>
                <TextField
                    name="name"
                    placeholder="Name"
                    helperText="Enter name"
                    value={this.state.name}
                    onChange={this.updateForm}
                />
                <TextField
                    name="email"
                    placeholder="Email"
                    helperText="Enter email"
                    value={this.state.email}
                    onChange={this.updateForm}
                />
                <TextField
                    name="address"
                    placeholder="Address"
                    helperText="Enter New Address"
                    value={this.state.address}
                    onChange={this.updateForm}
                />
                {/*<TextField label="sports" id="sports" type="text" onChange={this.updateStateSports}/>*/}

                <Button type="submit" onClick={this.updateVenue}>Update</Button>

            </div>
        )
    }
}

export default Update
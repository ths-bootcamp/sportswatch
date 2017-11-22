import React from 'react'
import axios from 'axios';

class Show extends React.Component{
    constructor(props){
        super(props);
        this.state={
            venue:{
                name:"",
                email:"",
                address:""
            }
        }
        this.venueShow =this.venueShow.bind(this)
    }
    venueShow(){
        axios.get("/api/view/"+this.props.match.params.id)
            .then(res =>{

                this.setState({venue:res.data})
            })
    }

    componentDidMount(){
        this.venueShow();
    }

    render(){
        return(
            <div>
                <h2>this is Details of particular venue</h2>
                <p>{this.state.venue.name}</p>
                <p>{this.state.venue.address}</p>
                <p>{this.state.venue.email}</p>

            </div>
        )
    }
}

export default Show
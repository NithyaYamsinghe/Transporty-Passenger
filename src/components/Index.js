import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

class Index extends Component {
    
    render() { 
        return ( 
            <Link to="/login" style={{textDecoration:"none"}}>
        <Button variant="contained" color="primary">
           
            Passenger Account
        
      </Button>
      </Link> );
    }
}
 
export default Index;
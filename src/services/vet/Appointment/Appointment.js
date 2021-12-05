import { Link } from "react-router-dom";
import firebase from "firebase";
import {useState , useEffect} from 'react'

const Appointment =() => {
    return ( 
        <div style={{textAlign:'center'}}>
            <h1>DashBoard</h1>
            <br/>
            <Link to='/vetdoctors'>Continue as Doctor</Link>
            <br />
            <Link to='/vetuser'>Continue as user</Link>
        </div>
     );
}
 
export default Appointment;
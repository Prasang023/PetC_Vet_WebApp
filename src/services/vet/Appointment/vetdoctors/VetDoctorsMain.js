import VetDoctorAppointment from "./VetDoctorAppointments";
import VetDoctorAvailabiltyScheduler from "./VetDoctorAvailabiltyScheduler";
import { Button } from "@material-ui/core";
import { useState } from "react";
const VetDoctorsMain = () => {
    const [page, setpage] = useState('profile')
    const CallScheduler = () =>{
        setpage('scheduler')
    }

    const CallAppointment = () =>{
        setpage('appointments')
    }

    

    let ShowPage
    if(page==='scheduler')
        ShowPage= <VetDoctorAvailabiltyScheduler />
    else if (page==='appointments')
        ShowPage= <VetDoctorAppointment />
    return ( 
        <div style={{textAlign:'center'}}> 
            This is Vet Doctors Main Page
            <br />
            <Button onClick={CallScheduler} value='scheduler' variant='outlined' style={{padding:'0px 10px' ,margin:'0px 10px '}}>Availibilty Scheduler</Button>
            <Button onClick={CallAppointment} value='appointments' variant='outlined' style={{padding:'0px 10px' ,margin:'0px 10px '}}>Appointments</Button>
            {
                ShowPage    
            }
        </div>
     );
}
 
export default VetDoctorsMain;
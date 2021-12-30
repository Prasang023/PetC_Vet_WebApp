import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

// components import
import Profile from './UserProfileComp/Profile'
import Appointments from './UserProfileComp/Appointments';

export default function UserProfile() {
    const [open, setOpen] = React.useState(false)
    const [page,setpage] = React.useState('profile')
    // console.log('profile')
    var val
    function TogglePage(page){
        setpage(page)
        if(page=="profile"){
            val  = <Profile />
        }
        else if(page=="appointments"){
            val = <Appointments />
            // console.log('Hua')
        }
    }

 
   return (
   <div style={{display:'flex',flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
       {
          page=="profile" ? <Profile /> : <Appointments />
       }
       <Button onClick={()=>setOpen(true)}>Open</Button>
        <SwipeableDrawer
        open={open}
        onClose={() =>setOpen(false)}
        onOpen={()=>setOpen(false)}
        >
        <Button onClick={() =>TogglePage("profile")}>Home</Button>
        <Button onClick={() =>TogglePage("appointments")}>Appointments</Button>
        </SwipeableDrawer>
   </div>
   )
  
}

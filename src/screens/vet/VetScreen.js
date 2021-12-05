import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Stack from '@mui/material/Stack';
// import fire from '../../firebase/auth/fire'

import Training from '../../assets/images/cards/Training.png'

const useStyles = makeStyles(theme => ({
    boxdiv: {
        display: "flex",
        padding: "10px 10px",
        boxShadow: " 5px 10px #888888",
        justifyContent: "space-between",
      },
      but: {
          width: "200px",
          
      }
  }));


// function GetProfiles() {
    
//     let id = fire.auth().currentUser.uid
//     const [data, setdata] = useState([])
//     useEffect(() =>{
//         fire
//         .firestore()
//         .collection('products').doc('vets').collection('doctors').doc('profile')
//         .onSnapshot((snapshot) =>{
//         setdata(snapshot.docs.map((doc)=>doc.data()))
//         })
//     },[])
//     console.log(data)
//     return data
// }


const VetScreen = () => {

    // let id = fire.auth().currentUser.uid
    // const [data, setdata] = useState([])
    // useEffect(() =>{
    //     const sfRef = fire
    //     .firestore()
    //     .collection('products').doc('vets').collection('doctors').doc('profile')
    //     const doc = sfRef.get();
    //     if (!doc.exists) {
    //     console.log('No such document!');
    //     } else {
    //     console.log('Document data:', doc.data());
    //     }
    // },[])
    


   
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div>
            
            <Grid container>
                <Grid item xs={1}></Grid>
                
                <Grid item container md={3} xs={10} direction='column'>
                    <h2>Vet Profile</h2>
                    <img src={Training} alt={"profile pic"} />
                    <h2>Trusted by 100+ Users</h2>
                </Grid>
                <Grid item container sm={10} md={7} >
                    <Stack  spacing={3} style={{display: 'flex', justifyContent: 'center', marginBottom: "100px",}}>
                    <Typography item variant="h3" color="secondary"><b>DR. AARTI GUPTA</b></Typography>
                    <div><span><b>Description:</b> Passionate doctor with extensive experience in pet and farm animal medicine & management. Adept in properly diagnasing and strategizing for the best treatment plans for the voiceless. Bringing forth an empathetic and professional attitude, committed to providing patients with the best care possible.</span><br/><br/><b>Educational Qualification:</b> Bachelor of Veterinary Medicine and Animal Husbandry, Master of Veterinary Science (Veterinary Pathology).<br/><br/><b>Charges: </b>Rs. 149/- per appointment </div> 
                    <Typography item variant="h5" color="secondary"><b>More Information</b></Typography>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    <div className={classes.boxdiv}>
                        <Typography variant="h5">Species Treated</Typography>
                        <Typography variant="h6">Dogs, Cats, Birds</Typography>
                    </div>
                    
                    <Button className={classes.but} variant="contained" color="primary" > Book Appointment </Button>
                    </Stack>
                    
                </Grid>
                
            </Grid>
            
        </div>
    )
}

export default VetScreen

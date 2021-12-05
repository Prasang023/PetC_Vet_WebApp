import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import VetGuideCard from '../../ui/VetService/Components/VetGuideCard'
import Training from '../../assets/images/cards/Training.png'
import vetD1 from '../../assets/images/others/vetD1.png'
import vetD2 from '../../assets/images/others/vetD2.png'
import veterinary from '../../assets/images/others/veterinary.png'
import rupeesign from '../../assets/images/others/rupeesign.png'
import calendarblankline from '../../assets/images/others/calendarblankline.png'
import vetdetail3 from '../../assets/images/others/vetdetail3.png'

const useStyles = makeStyles(theme => ({
    bgimg: {
      backgroundColor: "#000",
      backgroundImage: `url(${vetD1})`,
    }, 
    Typocolor: {
        color: "#ffffff",
        fontWeight: "bold",
    }
  }));

const VetDetail = () => {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <div>
        <Grid container spacing={2} direction="column">
            <Grid container item className={classes.bgimg} >
              <Grid xs={1}></Grid>
                <Grid xs={10} sm={6}>
                <Typography component='div' variant="h4" className={classes.Typocolor} color="primary">Book a Vet</Typography><br/>
                <Typography variant="p" style={{color: '#ffffff'}}>Ask our vet any animal-related questions you have. No question is a bad question for our vetrinary doctors.</Typography>
                <ul style={{color: '#ffffff'}} className="bookList">
                    <li>Book appointment</li>
                    <li>Video call with vetrinary</li>
                    <li>Get e-prescription to your mobile</li>
                </ul>
                <Link to="/vetselect">
                <Button 
                variant='contained' 
                color="primary">
                Book Now
                </Button>
                </Link>
                </Grid>
                <Grid xs={10} sm={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                <Typography variant="h4" style={{color: '#ffffff', fontWeight: 'bold'}}>Starts at</Typography><br/>
                <Typography variant="h2" color='primary' style={{ fontWeight: 'bold', marginLeft: '30px' }}>Rs.149</Typography>
                </div>
                </Grid>
                <Grid xs={1}></Grid>
            </Grid>
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography component="div" variant="h4" style={{ margin:'15px', color: '#000', fontWeight: 'bold', alignItems: 'center', }}>How Online Vetrinary Service Works?</Typography>
            </Grid>
            <Grid container item spacing={2}>
                
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={vetD2} style={{ height: '90%', width: 'auto'}} />
                </Grid>
                <Grid item xs={12} md={6}>

                <Stack spacing={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px'}}>
                <VetGuideCard 
                    headLine="Select Vet you want to consult"
                    desc="Search and Select the Vetrinary of your choice to have a seamless video call with them."
                    icon={veterinary}
                />
                <VetGuideCard 
                    headLine="Select appointment Date and Time"
                    desc="Select the suitable date and time at your convenience"
                    icon={calendarblankline}
                />
                <VetGuideCard 
                    headLine="Most affordable Price"
                    desc="Price as low aas 149rs/-"
                    icon={rupeesign}
                />
                </Stack>

                </Grid>
                
            </Grid>

            <Grid container item style={{backgroundColor: '#ffcf85'}}>
                <Grid xs={1}></Grid>
                <Grid xs={10} sm={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                    <Typography variant="h4">Only vet service that you need</Typography>
                    <ul>
                        <li>Avoid the stress of Travel and Save Time</li>
                        <li>video call with Veterinarian</li>
                        <li>Get e-prescription to yuor mobile</li>
                        <li>Available from any smartphone, or desktop devices</li>
                        <li>Trusted by Government of Gujarat</li>
                    </ul>
                </div>
                </Grid>
                <Grid xs={10} sm={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={Training} />
                </Grid>
                <Grid xs={1}></Grid>
            </Grid>

            <div>
            <Link to = '/sender'>Sender</Link>
            <Link to = '/reciever'>Reciever</Link>
            </div>
        </Grid>
        </div>
    )
}

export default VetDetail

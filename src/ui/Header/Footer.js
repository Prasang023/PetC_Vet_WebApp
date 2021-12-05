import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

import logo from '../../assets/images/logos/logo.png'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      },
      side: {
          display: 'flex',
      },
      cont: {
          padding: '10px 30px',
          backgroundColor: '#ffcf85',
      },
      list: {
          listStyle: 'none',
          paddingLeft: '0px'
      },
      icon: {
        marginRight:'10px', 
        marginTop:'20px'
      }
  }));

const Footer = () => {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Footer>
            <Grid container className={classes.cont}>
                <Grid xs={12} sm={6} lg={3}>
                    <div className={classes.side}>
                    <img src={logo} alt='logo-img' style={{width:'40px' , height:'43px', marginRight:'10px', marginTop:'15px'}}/>
                    <div>
                        <p>PetC<br/>bcuz we love pets</p>
                        
                    </div>
                    </div>
                    <div>
                        <Typography >Follow us</Typography>
                        <div>
                            <InstagramIcon color="primary"/>
                            <FacebookIcon color="primary"/>
                            <LinkedInIcon color="primary"/>
                            <TwitterIcon color="primary"/>
                            <GitHubIcon color="primary"/>
                            <TelegramIcon color="primary"/>
                            <WhatsAppIcon color="primary"/>
                        </div>
                    </div>
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                    <h4>More</h4>
                    <ul className={classes.list}>
                        <li>Our Services</li>
                        <li>Blogs</li>
                        <li>Reviews</li>
                        <li>Partnerships</li>
                        <li>Achievements</li>
                    </ul>
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                    <h4>Company</h4>
                    <ul className={classes.list}>
                        <li>About Us</li>
                        <li>Careeres</li>
                        <li>FAQs</li>
                        <li>Team</li>
                        <li>Contact Us</li>
                    </ul>
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                    <h4>Contact Us</h4>
                    <div className={classes.side}>
                        <LocationOnIcon color="primary" className={classes.icon}/>
                        <p>IIIT Surat, SVNIT Campus, Ichchanath, Surat - 395007</p>
                    </div>
                    <div className={classes.side}>
                        <EmailIcon color="primary" className={classes.icon}/>
                        <p>support@petc.in</p>
                    </div>
                    <div className={classes.side}>
                        <CallIcon color="primary" className={classes.icon}/>
                        <p>+91 73988 16950</p>
                    </div>
                </Grid>
            </Grid>
        </Footer>
    )
}

export default Footer

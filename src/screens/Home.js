// component import
import React from "react";
import {
  Link
} from "react-router-dom";
import Newsletter from "../ui/Homepage/Newsletter"

// ui imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import doctor from '../assets/images/others/Doctor.jpeg'

const useStyles = makeStyles(theme => ({
    headtext: {
      fontSize: '35px',
      fontweight: 'bold',
    },
    herohighlight: {
        color: '#FAA727'
    },
    img: {
        display: 'flex',
        marginTop:'10px',
        width: '80%',
        height: 'auto',
        
        [theme.breakpoints.down("sm")]: {
            display: 'none',
          }
    },
    imgcont: {
        display: 'flex',
        justifyContent: 'center',
        alignitems: 'center',
    }
  }));

const Home = ({handleLogout}) => {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return ( 
        <>

                <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>   
                    <h1>Welcome To Doctor's DashBoard</h1>
                    <img src={doctor} alt=' ' style={{width:500}} />
                </div>
                <Newsletter />
        </>
     );
}
 
export default Home;
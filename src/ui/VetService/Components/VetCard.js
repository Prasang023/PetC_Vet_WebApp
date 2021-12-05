import  * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import firebase from 'firebase';
import { display } from '@mui/system';
import VetDetail from '../../../screens/vet/VetDetail';
function GetProfileImage(imageUrl) {
  const [profilePath, setprofilePath] = React.useState('')
  React.useEffect(() => {
      firebase
      .storage()
      .ref(`${imageUrl}`)
      .getDownloadURL()
      .then(fireBaseUrl => {
        setprofilePath(fireBaseUrl);
      });
  }, [])
  return profilePath
}

const GetSchedule =  (id) =>{
      const [data, setdata] = React.useState([])
      React.useEffect(() => {
        firebase
        .firestore()
        .collection('products').doc('vets').collection('profile').doc(id).collection('schedule')
        .onSnapshot(snapshot => {
          setdata(snapshot.docs.map((doc) => doc.data()))
        })
        
      }, [])
      return data[0]?.schedule
      
}

function SetData(id,name){
  sessionStorage.setItem('vetId',id)
  sessionStorage.setItem('vetName',name)
}

const VetCard = props => {
    const { name, specialist, price, imageUrl, id } = props
    const fullname = "Dr. " + name
    const imagePath = GetProfileImage(imageUrl)
    const [open, setopen] = React.useState(false)
    function OpenModal(){
      if(open){
        setopen(false)
      }
      else{
        setopen(true)
      }
    }
    let schedule = []
    schedule = GetSchedule(id)
    // console.log(id)
    const days= ['Sunday' , 'Monday' ,'Tuesday' , 'Wednesday','Thursday' , 'Friday' ,'Saturday']
    return (
        
    <Card sx={{ maxWidth: 345 }}>
    <Link to={`/veterinary/${id}`}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {fullname.charAt(4)}
          </Avatar>
        }
        title= {fullname}
        subheader={specialist}
      />
      <CardMedia
        component="img"
        height="194"
        // image={imageUrl}
        image  = {imagePath}
        alt="Paella dish"
      />
      </Link>
       <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          At {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={`/veterinary/${id}`} style={{textDecoration:'none'}}>
        <Button size="small" color="primary">More</Button>
      </Link>
        <React.Fragment>
          <Button onClick={OpenModal}>Book Appointment</Button>
          <SwipeableDrawer
            // anchor={anchor}
            open={open}
            onClose={OpenModal}
            onOpen={OpenModal}
          >
            
            <div style={{padding:20 , display:'flex' , flexDirection:'column' , alignItems:'center'} } >
              <Avatar
                  alt="Remy Sharp"
                  src={imagePath}
                  sx={{ width: 200, height: 200 }}
                />
                <p>{name}</p>
                <p>{price}</p>
                {
                  schedule?.map((i,k)=><div>{days[k]}: {i ? 'Available':'Unavailable'}</div>)
                }
                 <Link to={`/veterinary/${id}`} style={{textDecoration:'none'}}>
                    <Button size="small" color="primary">More</Button>
                </Link>
                <Link  
                  style={{textDecoration:'none'}}
                  to = '/vetuser'
                  >
                  <Button onClick={()=>SetData(id,name)}>Book Appointment</Button>
                </Link>
                
            </div>
           
          </SwipeableDrawer>
        </React.Fragment>
      </CardActions>
    </Card>
    )
}

export default VetCard

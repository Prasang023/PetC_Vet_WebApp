import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';

// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring/web.cjs';
import firebase from "firebase"
import { parseJSON } from 'date-fns';

const uid = localStorage.getItem('userId')

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
 
function SaveTimeData(e,start,end){
  e.preventDefault()
  var startHours = start.getHours()
  var endHours = end.getHours()
  var startMins = start.getMinutes()
  var endMins = end.getMinutes()
  var totalTime = ((endHours*60)+endMins) -(( startHours*60) + startMins)
  var numberOfSlots =Math.floor( totalTime/30)
  var scheduleArray  = new Array(numberOfSlots)
  for(var i=0 ; i<scheduleArray.length  ; i++){
    scheduleArray[i] = 0
  }
  localStorage.setItem('scheduleArray' , JSON.stringify(scheduleArray))
}

function GetScheduleArray(){
  const [data , setdata] = React.useState([])
  React.useEffect(()=>{
      firebase
      .firestore()
      .collection('products').doc('vets').collection('profile').doc(uid).collection('schedule')
      .onSnapshot(snapshot => setdata(snapshot.docs.map(doc=>doc.data())))
  },[])
  return data[0]?.scheduleSlots
}


function SetScheduleArray(id){
  
  // const scheduleArray = JSON.parse(localStorage.scheduleArray)
  // console.log(typeof(scheduleArray))
//   React.useEffect(() => {
//     firebase
//     .firestore()
//     .collection('products').doc('vets').collection('profile').doc(uid).collection('schedule').doc(uid).update({
//       scheduleSlots:scheduleArray
//     })
// }, [])
}

export default function SpringModal({id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(new Date());
  const [end, setend] = React.useState(new Date());
  const days = ['Sunday','Monday','Tuesday' ,'Wednesday','Thursday','Friday','Saturday']
  SetScheduleArray(id)
  const array = GetScheduleArray()
  return (
    <div>
      <Button onClick={handleOpen}>Set Timings</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              {days[id]}
            </Typography>
            <Typography>Start Time</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            <Typography>End Time</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={end}
                onChange={(newValue) => {
                    setend(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            <Button onClick={(e) => SaveTimeData(e,value,end)}>Save</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

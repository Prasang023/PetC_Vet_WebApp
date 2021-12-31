import React from 'react';
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function TransitionsModal(props) {
  const userId = localStorage.getItem('userId')
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const CancelMeeting = async () =>{
    // deleting from user Ebd
    const snapshot1 = await firebase.firestore()
                          .collection('users')
                          .doc(props.vetUser)
                          .collection('appointments')
                          .limit(1)
                          .where('appointmentId','==',props.appointmentId)
                          .get()
    
    // console.log(snapshot1)
    const doc1 = snapshot1.docs[0]
    doc1.ref.delete()

  // Deleting from Vetnery end
    const snapshot2 = await firebase.firestore()
                            .collection('products')
                            .doc('vets')
                            .collection('profile')
                            .doc(userId)
                            .collection('appointments')
                            .limit(1)
                            .where('appointmentId','==',props.appointmentId)
                            .get()
    console.log(snapshot2)
    const doc2 = snapshot2.docs[0]
    doc2.ref.delete()
  }
  const handleOpen = () => {
    setOpen(props.open);
  };

  const handleClose = () => {
    // history.push('/userprofile')
    setOpen(false);
  };

  return (
    <div>
        
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
            <p>{props.appointmentId}</p>
            <a href='/userprofile'><button onClick={handleClose}>Close</button></a>
            <button onClick={()=>{
              CancelMeeting()
              // console.log(data.vetId)
              localStorage.setItem('cancelledMeeting' , props.appointmentId)
              localStorage.setItem('cancelledVet' , props.vetId)
              window.alert('Click close to go back to Previous Screen')
              }}>Confirm Cancellation</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

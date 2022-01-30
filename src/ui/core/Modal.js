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
  const option = props.res
  // console.log(option)
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const CancelMeeting = async () =>{
    // console.log(option)
    // deleting from user Ebd

    firebase.firestore()
    .collection('users')
    .doc(option.userId)
    .collection('appointments')
    .doc('system')
    .collection('cancelled')
    .doc(option.appointmentId)
    .set({
        status:'cancelled',
        appointmentId: option.appointmentId,
        description: option.description,
        petName:option.petName ,
        petType: option.petType,
        preferredloc:option.preferredloc ,
        selectedDate: option.selectedDate,
        selectedSlot:option.selectedSlot ,
        userId:option.userId ,
        vetType:option.vetType,
        vetneryAssigned:userId
    })
  
  

  firebase.firestore()
  .collection('admin')
  .doc('vets')
  .collection('appointments')
  .doc('system')
  .collection('cancelled')
  .doc(option.appointmentId)
  .set({
      appointmentId: option.appointmentId,
      description: option.description,
      petName:option.petName ,
      petType: option.petType,
      preferredloc:option.preferredloc ,
      selectedDate: option.selectedDate,
      selectedSlot:option.selectedSlot ,
      userId:option.userId ,
      vetType:option.vetType,
      vetneryAssigned:userId
  })

  firebase.firestore()
    .collection('products')
    .doc('vets')
    .collection('profile')
    .doc(userId)
    .collection('appointments')
    .doc('system')
    .collection('cancelled')
    .doc(option.appointmentId)
    .set({
        status:'cancelled',
        appointmentId: option.appointmentId,
        description: option.description,
        petName:option.petName ,
        petType: option.petType,
        preferredloc:option.preferredloc ,
        selectedDate: option.selectedDate,
        selectedSlot:option.selectedSlot ,
        userId:option.userId ,
        vetType:option.vetType,
        vetneryAssigned:userId
    })

    const snapshot1 = await firebase.firestore()
                            .collection('users')
                            .doc(option.userId)
                            .collection('appointments')
                            .doc('system')
                            .collection('upcoming')
                            .limit(1)
                            .where('appointmentId','==',option.appointmentId)
                            .get()
    const doc1 = snapshot1.docs[0]
    console.log('user: ' , doc1.id)
    doc1.ref.delete()

  // Deleting from Vetnery end
    const snapshot2 = await firebase.firestore()
                            .collection('products')
                            .doc('vets')
                            .collection('profile')
                            .doc(userId)
                            .collection('appointments')
                            .doc('system')
                            .collection('pending')
                            .limit(1)
                            .where('appointmentId','==',option.appointmentId)
                            .get()
    const doc2 = snapshot2.docs[0]
    console.log('vet: ' , doc2.id)
    doc2.ref.delete()

    const snapshot3 = await firebase.firestore()
                            .collection('admin')
                            .doc('vets')
                            .collection('appointments')
                            .doc('system')
                            .collection('assigned')
                            .limit(1)
                            .where('appointmentId','==',option.appointmentId)
                            .get()
    const doc3 = snapshot3.docs[0]
    console.log('admin: ' , doc3.id)
    doc3.ref.delete()

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
            <p>{option.appointmentId}</p>
            <a href='/userprofile'><button onClick={handleClose}>Close</button></a>
            <button onClick={()=>{
              CancelMeeting(option)
              window.alert('Click close to go back to Previous Screen')
              }}>Confirm Cancellation</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

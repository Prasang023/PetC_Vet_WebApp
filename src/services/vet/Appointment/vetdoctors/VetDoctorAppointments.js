import firebase from 'firebase'
import {useEffect , useState} from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const id = localStorage.getItem('userId')

function SaveMeeting(val){
    sessionStorage.setItem('currentMeeting' ,val )
}

function GetMeetings(){
    const [data,setdata] = useState([])
   useEffect(()=>{
    firebase
    .firestore()
    .collection('products').doc('vets').collection('profile').doc(id).collection('appointments')
    .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
   },[])
   return data
}
const VetDoctorAppointment = () => {
    const data = GetMeetings()
    return <div>
        This is appointment Page
        {
            data.map((res,i)=><div>
                <p>{i} :  <Link to='/sender' ><Button onClick={() => SaveMeeting(res['meetingid'])}>{res['meetingid']}</Button></Link></p>
            </div>)
        }
    </div>
}
 
export default VetDoctorAppointment;
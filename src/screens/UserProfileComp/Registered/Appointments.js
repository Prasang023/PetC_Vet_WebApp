import firebase from 'firebase'
import {useEffect , useState} from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import TransitionsModal from '../../../ui/core/Modal'
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

export default function(){
    const data = GetMeetings()
    const [open,setopen] = useState(false)
    function openModal(){
      setopen(true)
    }

    
    return <div>
        This is appointment Page
        {
            data.map((res,i)=><div>
                <p>{i} :  <Link to='/sender' ><Button onClick={() => SaveMeeting(res['meetingid'])}>{res['meetingid']}</Button></Link></p>
                <Button onClick={()=> 
                {
                  openModal()
                  localStorage.setItem('toCancel' ,res['appointmentId'] )
                  localStorage.setItem('toCancelVet' ,id )
                  localStorage.setItem('toCancelUser' , res['userId'])
                }
                  }>Cancel</Button>
            </div>)
        }
      {open ? <TransitionsModal open={open} 
      appointmentId={localStorage.getItem('toCancel')}
      vetId = {localStorage.getItem('toCancelVet')}
      vetUser = {localStorage.getItem('toCancelUser')}
        /> : ''}

    </div>
}
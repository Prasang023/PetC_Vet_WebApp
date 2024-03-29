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
    // console.log(id)
   useEffect(()=>{
    firebase
    .firestore()
    .collection('products').doc('vets').collection('profile').doc(id).collection('appointments').doc('system').collection('pending')
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
    const [res,setres] = useState('')
    
    return <div>
        This is appointment Page
        {
            data.map((res,i)=><div>
                <p>{i} :  <Link to='/sender' ><Button onClick={() => SaveMeeting(res['meetingid'])}>{res.appointmentId}</Button></Link></p>
                <Button onClick={()=> 
                {
                  setres(res)
                  openModal()
                }
                  }>Cancel</Button>
            </div>)
        }
      {open ? <TransitionsModal open={open} 
            res = {res}
        /> : ''}

    </div>
}
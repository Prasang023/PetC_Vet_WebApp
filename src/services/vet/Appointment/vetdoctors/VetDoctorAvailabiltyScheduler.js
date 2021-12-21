import CheckboxList from './CheckBoxList'
import fire from '../../../../firebase/auth/fire.js'
import { useEffect , useState } from 'react'
import { Button } from '@mui/material'




function GetData() {
    const [list, setlist] = useState([])
    // const [data, setdata] = useState([])
    
    const id = localStorage.getItem('userId')
   useEffect(() => {
        fire
        .firestore()
        .collection('products').doc('vets').collection('profile').doc(id).collection('schedule')
        .onSnapshot((snapshot)=>{
            setlist(snapshot.docs.map((doc)=>doc.data()))
        })
    }, [])

    for(var i=0 ; i<list.length ; i++){
        if(list[i]['id']==id){
            setlist(list[i])
        }
    }
    return list
}



const VetDoctorAvailabiltyScheduler = () => {
    
    const [change, setchange] = useState(true)
//     var timeSlots = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
//    localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
    const ToggleChange = ()=>{
    

        if(change){
            setchange(false)
        }
        else{
            setchange(true)
        }
    }
    let arr =[]
    const data = GetData();
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday' , 'Thursday', 'Friday' , 'Saturday']
   
    return ( 
        <div style={{textAlign:'center' , alignItems:'center' ,justifyItems:'center' ,display:'flex' , flexDirection:'column'}}>
            Vet Doctor Availabilty Scheduler

            {
                data[0]?.schedule?.map((res,i) => <div>
                       {days[i]}: {res}
                </div>)
            }
          
            <Button onClick={ToggleChange}>Change Schedule</Button>
            {
                change ? '' : <CheckboxList />
            }
            
        </div>
     );
}
 
export default VetDoctorAvailabiltyScheduler;
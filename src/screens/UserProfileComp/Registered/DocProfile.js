import firebase from 'firebase'
import { useEffect , useState } from 'react';

function GetData(){
    const [data, setdata] = useState([])
    let id = firebase.auth().currentUser.uid
    useEffect(() => {
        const fetched = firebase
        .firestore()
        .collection('products').doc('vets').collection('profile')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
            
        })
        
    }, [])

    for(var i=0 ; i<data.length ; i++){
        if(data[i]['id']==id){
            setdata(data[i])
        }
    }
    return data
}

function GetLicenceData(){
    const [data, setdata] = useState([])
    let id = firebase.auth().currentUser.uid
    useEffect(() => {
        firebase
        .firestore()
        .collection('products').doc('vets').collection('profile').doc(id).collection('licence')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
        })
       
    }, [])
    for(var i=0 ; i<data.length ; i++){
        if(data[i]['id']==id){
            setdata(data[i])
        }
    }
    return data
}


export default function DocProfile (){
     
    const data = GetData()
    const licence = GetLicenceData()
    return (
        <div>
            <h1>This is Doctor's Profile</h1>
            <div tyle={{textAlign:'center'}}>
                <p>Name: {data.name}</p>
                <p>Age : {data.age}</p>
                <p>Email: {data.email}</p>
                <p>Home: {data.home}</p>
                <p>Phone: {data.phone}</p>
                <p>Workplace: {data.workplace}</p>
                <p>College: {licence.college}</p>
                <p>Licence: {licence.licence}</p>
            </div>
        </div>
    )
}
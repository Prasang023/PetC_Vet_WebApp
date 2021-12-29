import DocProfile from "./Registered/DocProfile"
import DocRegForm from "./IfNotRegistered/DocRegForm";
import { Button } from "@material-ui/core";
import { useState } from "react";
import firebase from "firebase";
let check = localStorage.getItem('userId')
    
export default function Profile(){
    const [registered, setregistered] = useState(check)
    const [page,setPage] = useState(<DocProfile />)
    const [imageUrl, setimageUrl] = useState('')
    const togglePage = () =>{
        if(page==<DocProfile/>)
            setPage(<DocRegForm />)
        else
            setPage(<DocProfile/>)
    }
    function SendProfileImage(){
        const id = firebase.auth().currentUser.uid
        firebase
        .firestore()
            .collection('products').doc('vets').collection('profile').doc(id)
            .update({
                imageUrl:`/images/doctors/${id}/profileImage`
            })

        firebase
        .storage()
        .ref(`/images/doctors/${id}/profileImage`)
        .put(imageUrl)
        .on("state_changed" , alert("Profile Image Uploaded") , alert);
    }
    return(
        <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
            <br/>
            {
                page
            }
            <Button onClick={togglePage}>Toggle Profile</Button>
            <input type ='file' onChange={e => setimageUrl(e.target.files[0])} />
            <Button onClick = {SendProfileImage}>Set Profile</Button>
        </div>
    )
}
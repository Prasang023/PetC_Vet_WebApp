import DocProfile from "./Registered/DocProfile"
import DocRegForm from "./IfNotRegistered/DocRegForm";
import { Button } from "@material-ui/core";
import { useState } from "react";
import firebase from "firebase";
let check = localStorage.getItem('userId')
    
export default function Profile(){
    const [registered, setregistered] = useState(check)
    let Page
    if(registered){
        Page = <DocProfile />
    }
    else{
        Page = <DocRegForm />
    }

    const [imageUrl, setimageUrl] = useState('')

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
                Page
            }
            <input type ='file' onChange={e => setimageUrl(e.target.files[0])} />
            <Button onClick = {SendProfileImage}>Set Profile</Button>
        </div>
    )
}
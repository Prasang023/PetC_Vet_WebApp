import { useState } from "react";
import firebase from 'firebase'

const DocKYC = () => {
    const [college, setcollege] = useState('')
    const [licence, setlicence] = useState('')
    let id
    id = firebase.auth().currentUser.uid
    let db = firebase.database()
    function onSubmit(e) {
        e.preventDefault()

        const unsubscribe = firebase
            .firestore()
            .collection('products').doc('vets').collection('profile').doc(id).collection('licence').doc(id)
            .set({
                college:college,
                licence:licence,
                id:id
            })
            .then(()=>{
                setcollege('')
                setlicence('')
            })
        
    }
    return ( 
        <div style={{textAlign:'center'}}>
            <h2>Please Fill the KYC Form to Conitinue With the process</h2>
            <form>
                <div>
                <label>College Name</label>
                    <input type='string' value={college} onChange ={e => setcollege(e.currentTarget.value)} />
                </div>
                <div>
                <label>Licence Number</label>
                    <input type='string' value={licence} onChange ={e => setlicence(e.currentTarget.value)} />
                </div>
                <button onClick={onSubmit}>Continue</button>
            </form>
        </div>
     );
}
 
export default DocKYC;
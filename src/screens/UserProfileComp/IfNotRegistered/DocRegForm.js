import { Button, TextField } from "@material-ui/core";
import firebase from 'firebase'
import { useState } from "react";
import DocKYC from './DocKYC'

const DocRegForm = () => {
    
    const [name, setname] = useState('')
    const [age, setage] = useState()
    const [home, sethome] = useState('')
    const [workplace, setworkplace] = useState('')
    const [phone, setphone] = useState()
    const [email, setemail] = useState('')

    const [filledBasic, setfilledBasic] = useState(false)
    let id 
    id = firebase.auth().currentUser.uid
    let db = firebase.database()
    function onSubmit(e) {
        e.preventDefault()

        const unsubscribe = firebase
            .firestore()
            .collection('products').doc('vets').collection('profile').doc(id)
            .set({
                name:name,
                id:id,
                phone:phone,
                email:email,
                workplace:workplace,
                home:home,
                age:age
            })
            .then(()=>{
               setname('')
               setphone('')
               setemail('')
               setworkplace('')
               sethome('')
               setage('')
            })
     
        setfilledBasic(true)

    }
    const PrintId = () =>{
        console.log(id)
    }
    return ( 
    <div style={{textAlign:'center'}} >
        <h2>The Doctor Is NOT registered</h2>
        Please fill The FORM below to continue with the registration
        {
            !filledBasic ? <form className='form' onSubmit={onSubmit} style={{flexDirection: 'column'}}>
            <div>
                 <label>Name</label>
                 <input type='string' value={name} onChange ={e => setname(e.currentTarget.value)} />
            </div>
            <div>
                 <label>Age</label>
                 <input type='string' value={age} onChange ={e => setage(e.currentTarget.value)} />
            </div>
            <div>
                 <label>Phone Number</label>
                 <input type='string' value={phone} onChange ={e => setphone(e.currentTarget.value)} />
            </div>
            <div>
                 <label>Email</label>
                 <input type='email' value={email} onChange ={e => setemail(e.currentTarget.value)} />
            </div>
            <div>
                 <label>Address</label>
                 <input type='string' value={home} onChange ={e => sethome(e.currentTarget.value)} />
            </div>
            <div>
                 <label>Work Place</label>
                 <input type='string' value={workplace} onChange ={e => setworkplace(e.currentTarget.value)} />
            </div>
            <br />
            <button>Continue</button>
     </form> : <DocKYC />
     
        }
    </div> 
);
}
 
export default DocRegForm;
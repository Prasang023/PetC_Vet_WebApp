import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import {useState , useEffect}  from 'react'
import Sender from './services/vet/videocall/Sender'
import firebase from "firebase"
// components import
import Header from "./ui/Header/matnavbar";
import Footer from "./ui/Footer/Footer";


// screens import
import Login from './screens/Login';
import Home from './screens/Home';

import Appointment from "./services/vet/Appointment/Appointment";
import VetDoctorsMain from "./services/vet/Appointment/vetdoctors/VetDoctorsMain";
import VetUserMain from "./services/vet/Appointment/vetusers/VetUserMain";
import UserProfile from "./screens/UserProfile";

function App() {

  const [user, setUser]  = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError , setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState('')

  const clearInput = () => {
    setEmail('')
    setPasswordError('')
  }

  const clearError = ()  => {
    setEmailError('')
    setPasswordError('')
  }  

  const handleLogin = () => {
    clearError()
    firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch((err => {
        switch(err.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message)
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message)
            break;
        }
      }))

     
  }

  const handleSignup = () =>{
    clearError()
    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch((err => {
        switch(err.code){
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message)
            break;
          case 'auth/weak-password':
            setPasswordError(err.message)
            break;
        }
      }))
  }


const handleLogout = () => {
  firebase.auth().signOut();
}


const authListner = () => {
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      clearInput()
      setUser(user);
      localStorage.setItem('userId',user.uid)
    }else{
      setUser('');
    }
  })
}


useEffect(() => {
  authListner();
}, [])
  return (
    <div className="App">
      {
        user ? (
          <Router>
            <Header handleLogout={handleLogout} />
            <Switch>
              <Route exact path='/'>
                <Home handleLogout={handleLogout} />
              </Route>
              <Route exact path='/dashboard'>
                <VetDoctorsMain />
              </Route>
              <Route exact path='/aboutus'>
                <Home handleLogout={handleLogout} />
              </Route>
              <Route exact path='/contact'>
                <Home handleLogout={handleLogout} />
              </Route>
              <Route exact path='/sender'>
                <Sender />
              </Route>
              <Route exact path='/vetappointment'>
                <Appointment />
              </Route>
              <Route exact path='/vetdoctors'>
                <VetDoctorsMain />
              </Route>
              <Route exact path='/vetuser'>
                <VetUserMain />
              </Route>
              <Route exact path='/userprofile'>
                <UserProfile />
              </Route>
            </Switch>
            <Footer />
          </Router>
          
        ) : (
          <Login
          email={email}
          setEmail={setEmail}
          emailError= {emailError}
          setEmailError={setEmailError}
          password={password}
          setPassword={setPassword}
          setPasswordError={setPasswordError}
          handleLogin={handleLogin}
          hasAccount={hasAccount}
          handleSignup={handleSignup}
          setHasAccount={setHasAccount}
           />
        )
      }
    
       
    </div>
  );
}

export default App;
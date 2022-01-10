import './style.css'
import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useRef, useState , useEffect } from "react"
import VideoCam from "../../../ui/VetService/VideoCallComps/VideoCam"
import Mic from "../../../ui/VetService/VideoCallComps/Mic"
import Chatbox from "../../../ui/VetService/VideoCallComps/Chatbox"
import { Chatbtn } from "../../../ui/VetService/VideoCallComps/Chatbox"
import CallEndIcon from '@mui/icons-material/CallEnd';
// import './style.css'
import firebase from 'firebase'
function GetUser(){
    const id = localStorage.getItem('userId')
    const [data,setdata] = useState([])
    useEffect(() => {
        firebase.firestore()
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
    return data;
  }
const Sender = (props) => {
    const User = GetUser()
    console.log(User.name)
    const chatRef = useRef();
    const btnRef = useRef();
    const { history } = props
    console.log(props)
    
    let currentMeeting = sessionStorage.getItem("currentMeeting")
    // const webSocket = new WebSocket("wss://intense-reef-21186.herokuapp.com/")
    const webSocket = new WebSocket("ws://localhost:5000/")
    console.log(webSocket)
    webSocket.onmessage = (event) => {
        handleSignallingData(JSON.parse(event.data))
    }
    
    function handleSignallingData(data) {
        switch (data.type) {
            case "answer":
                peerConn.setRemoteDescription(data.answer)
                break
            case "candidate":
                peerConn.addIceCandidate(data.candidate)
                break
            case "chat_message":
                console.log(data.message)
                chatRef.current.childChat(data)
        }
    }
    
    let username
    function sendUsername() {
    
        username = document.getElementById("username-input").value
        sendData({
            type: "store_user"
        })
    }
    
    function sendData(data) {
        data.username = username
        if(webSocket.readyState === 1){
            console.log(webSocket)
            console.log(data)
        webSocket.send(JSON.stringify(data))
        console.log("Connection Successful")
        }
        else{
            console.log(webSocket.readyState)
        }
    }
    
    
    let localStream
    let peerConn
    function startCall() {
        document.getElementById("video-call-div")
        .style.display = "inline"

        let constraints = {
            video: {
                frameRate: 24,
                width: {
                    min: 480, ideal: 720, max: 1280
                },
                aspectRatio: 1.33333
            },
            audio: true
        };
    
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            localStream = stream
            console.log(localStream)
            let video = document.getElementById("local-video")
            video.srcObject = localStream
            video.onloadedmetadata = function(e) {
                video.play();
              };
    
            let configuration = {
                iceServers: [{
                    urls: [ "stun:bn-turn1.xirsys.com" ]
                 }, {
                    username: "28B_rPlXwIxNUeQMhf-UyQlDUFBfDQKaJpmeU4-CX5dC5dD2guv8FBFPN-8LikaqAAAAAGF_wZRwcmFzYW5n",
                    credential: "9eb1632a-3afe-11ec-b475-0242ac140004",
                    urls: [
                        "turn:bn-turn1.xirsys.com:80?transport=udp",
                        "turn:bn-turn1.xirsys.com:3478?transport=udp",
                        "turn:bn-turn1.xirsys.com:80?transport=tcp",
                        "turn:bn-turn1.xirsys.com:3478?transport=tcp",
                        "turns:bn-turn1.xirsys.com:443?transport=tcp",
                        "turns:bn-turn1.xirsys.com:5349?transport=tcp"
                    ]
                 }]
                // iceServers: [
                //     {
                //         "urls": ["stun:stun.l.google.com:19302", 
                //         "stun:stun1.l.google.com:19302", 
                //         "stun:stun2.l.google.com:19302"]
                //     }
                // ]
            }
    
            peerConn = new RTCPeerConnection(configuration)
            peerConn.addStream(localStream)
    
            peerConn.onaddstream = (e) => {
                let remVideo = document.getElementById("remote-video")
                remVideo.srcObject = e.stream
                remVideo.onloadedmetadata = function(e) {
                    remVideo.play();
                  };
            }
    
            peerConn.onicecandidate = ((e) => {
                if (e.candidate == null)
                    return
                sendData({
                    type: "store_candidate",
                    candidate: e.candidate
                })
            })
    
            createAndSendOffer()
        })
         .catch(function(error) {
            console.log(error)
        })
    }
    
    function createAndSendOffer() {
        peerConn.createOffer((offer) => {
            sendData({
                type: "store_offer",
                offer: offer
            })
    
            peerConn.setLocalDescription(offer)
        }, (error) => {
            console.log(error)
        })
    }
    
    let isAudio = true
    function muteAudio() {
        isAudio = !isAudio
        if(localStream!=null)
        localStream.getAudioTracks()[0].enabled = isAudio
    }
    
    let isVideo = true
    function muteVideo() {
        isVideo = !isVideo
        if(localStream!=null)
        localStream.getVideoTracks()[0].enabled = isVideo
    }

    function shut(){
        console.log("shut down called")
        peerConn.close()
        webSocket.close()
        localStream.getTracks().forEach(track => track.stop())
        history.push("/dashboard")
    }

    function send(obj){
        console.log("send tapped")
        obj.type = "chat_message"
        sendData(obj)
    }

    
    function hide(){
        chatRef.current.hide()

    }

    function closeicon(){
        btnRef.current.changeBtn()
    }

    return ( 
        <div>
            <div>
                <Button></Button>
                <input placeholder='Enter username' type='text' id='username-input'value={currentMeeting} />
                <br />
                <button onClick={sendUsername}>Send</button>
                <button onClick={startCall}>Start Call</button>
            </div>
            <div id="video-call-div">
                <video muted id="local-video" autoplay></video>
                <video id="remote-video" autoplay></video>
                <div className='call-action-div' >
                    <div className='action' onClick={muteVideo}><VideoCam /></div>
                    <div className='action' onClick={muteAudio}><Mic /></div>
                    <div className='action' onClick={shut}><Button variant="contained" color="primary" size="large"><CallEndIcon /></Button></div>
                    <div className='action' onClick={hide}><Chatbtn ref={btnRef} /></div>                  
                </div>
                <div id='chat-box' style={{ height: '100vh', Color : '#fff', position: 'absolute', right: '0', top: '0', zIndex: '2' }}>
                <Chatbox 
                    ref={chatRef}
                    call={send}
                    closeicon={closeicon}
                />
                </div>           
            </div>
        </div>
     );
}
 
export default Sender;
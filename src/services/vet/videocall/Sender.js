import './style.css'
import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
// import './style.css'
const Sender = () => {
    let currentMeeting = sessionStorage.getItem("currentMeeting")
    const webSocket = new WebSocket("wss://intense-reef-21186.herokuapp.com/")
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
            audio: false
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
                iceServers: [
                    {
                        "urls": ["stun:stun.l.google.com:19302", 
                        // "stun:stun1.l.google.com:19302",

                        // "stun:stun2.l.google.com:19302"
                    ]
                    }
                ]
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
        localStream.getAudioTracks()[0].enabled = isAudio
    }
    
    let isVideo = true
    function muteVideo() {
        isVideo = !isVideo
        localStream.getVideoTracks()[0].enabled = isVideo
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
                <div className='call-action-div'>
                    <button onClick={muteVideo}>Mute Video</button>
                    <button onClick={muteAudio}>Mute Audio</button>
                </div>
            </div>
        </div>
     );
}
 
export default Sender;
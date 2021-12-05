import './style.css'

const Sender = () => {
    let currentMeeting = sessionStorage.getItem('currentMeeting')



    const webSocket = new WebSocket("ws://intense-reef-21186.herokuapp.com/")
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
        console.log(username)
        sendData({
            type: "store_user"
        })
    }
    
    // sendUsername()
    function sendData(data) {
        data.username = username
        webSocket.send(JSON.stringify(data))
    }
    
    
    let localStream
    let peerConn
    function startCall() {
        document.getElementById("video-call-div")
        .style.display = "inline"
    
        navigator.getUserMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia)

        navigator.getUserMedia({
            video: {
                frameRate: 24,
                width: {
                    min: 480, ideal: 720, max: 1280
                },
                aspectRatio: 1.33333
            },
            audio: true
        }, (stream) => {
            localStream = stream
            console.log(localStream)
            document.getElementById("local-video").srcObject = localStream
    
            let configuration = {
                iceServers: [
                    {
                        "urls": ["stun:stun.l.google.com:19302"]
                    }
                ]
            }
    
            peerConn = new RTCPeerConnection(configuration)
            peerConn.addStream(localStream)
    
            peerConn.onaddstream = (e) => {
                document.getElementById("remote-video")
                .srcObject = e.stream
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
        }, (error) => {
            console.log(error)
        })
    }
    // startCall()
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
                <input placeholder='Enter username' type='text' id='username-input' value={currentMeeting} />
                <br />
                <button onClick={sendUsername}>Send</button>
                <button onClick={startCall}>Start Call</button>
            </div>
            <div id="video-call-div">
                <video muted id="local-video" autoPlay></video>
                <video id="remote-video" autoPlay></video>
                <div className='call-action-div'>
                    <button onClick={muteVideo}>Mute Video</button>
                    <button onClick={muteAudio}>Mute Audio</button>
                </div>
            </div>
        </div>
     );
}
 
export default Sender;
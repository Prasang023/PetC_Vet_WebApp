import React from 'react'
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import Button from '@mui/material/Button';
import { useRef, useState } from "react"
import IconButton from '@mui/material/IconButton';

const VideoCam = () => {
    const [isVideo, setisVideo] = useState(true)
    return (
        <Button onClick={() => setisVideo(!isVideo)} variant="contained" color="primary" size="large">
            {isVideo? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
    )
}

export default VideoCam

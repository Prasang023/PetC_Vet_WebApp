import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Button from '@mui/material/Button';
import { useRef, useState } from "react"
import IconButton from '@mui/material/IconButton';

const Mic = () => {
    const [isAudio, setisAudio] = useState(true)
    return (
        <Button onClick={() => setisAudio(!isAudio)} variant="contained" color="primary" size="large">
            {isAudio? <MicIcon /> : <MicOffIcon />}
        </Button>
    )
}

export default Mic
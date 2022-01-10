import { Button } from '@mui/material'
import React from 'react'
import {useState , useEffect}  from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from '@mui/material/TextField';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ChatIcon from '@mui/icons-material/Chat';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

const { forwardRef, useRef, useImperativeHandle } = React;

const useStyles = makeStyles(theme => ({
  mainBox: {
    height: '100%',
    width: '300px',
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px 10px',
    [theme.breakpoints.down("sm")]:{
      height: '100vh',
      width: '100vw',
    }
    },
    hide: {
      display: 'none',
    }
  
  
}));

const Chatbox = forwardRef((props, ref) => {
  
    const [chat, setChat] = useState([])
    const [isVisible, setisVisible] = useState(false)
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    

    function read(){
      const textarea = document.getElementById('textarea');
      const message = textarea.value
      var today = new Date()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      if(message!==""){
        const obj = {
          message,
          timestamp: time, 
          username: "name"
        }
        setChat(chat.concat(obj))
        props.call(obj)

      }

    }

    useImperativeHandle(ref, () => ({

        childChat(obj) {
          console.log("getAlert from Child")
          setChat(chat.concat(obj))
        },

        hide(){
            setisVisible(!isVisible)
        }
    
      }));

    function hide(){
        setisVisible(!isVisible) 
        props.closeicon()   
    }

    return (
      <>
        {isVisible?
        ( <div className={classes.mainBox} id="catch">
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <h4 className='hide'>Chat Box</h4>
            <div onClick={hide} style={{ cursor: 'pointer' }}><CloseIcon /></div>
            </div>
            <div>
            <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
            {chat.map((obj) => {
              return(
              <div>
                <p><b>{obj.username}</b> {obj.timestamp} <br/>
                {obj.message}</p>
              </div>
              )
            })
              }
            </div>
            <div style={{ display: 'flex' }}>
            <TextField
              id="textarea"
              placeholder="Type Message here"
              maxRows={4}
              multiline
              fullWidth
            />
            
            <Button onClick={read}>Send</Button>
            </div>
            </div>
        </div>) : null
        }
        </>
    )
})

const Chatbtn = forwardRef((props, ref) => {

  const [isVisible, setisVisible] = useState(false)

  useImperativeHandle(ref, () => ({

    changeBtn(){
        setisVisible(!isVisible)
    }

  }));

  function change(){
        setisVisible(!isVisible)
  }
  
  return (
      <Button onClick={change} variant="contained" color="primary" size="large">
          {isVisible? <CancelIcon /> : <ChatIcon />}
      </Button>
  )
})

export default Chatbox
export { Chatbtn }

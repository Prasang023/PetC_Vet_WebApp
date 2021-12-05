import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import fire from '../../../../firebase/auth/fire'
import SpringModal from './Modal';
export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);
  var ans = [0,0,0,0,0,0,0]
  let id 
  id = fire.auth().currentUser.uid
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    
     
  };
    const [open, setopen] = React.useState(false)
    function ShowModal(){
      if(open){
        setopen(false)
      }else{
        setopen(true)
      }
    }
  
  const [startVal , setstartVal] = React.useState(0)
  const [endVal , setendVal] = React.useState(0)

  function OnSubmitSchedule(){
    const newChecked = [...checked];
    // console.log('clicked')
    for(var i=0 ; i<7 ; i++){
      ans[newChecked[i]]++
    }
    
    const unsubscribe = fire
      .firestore()
      .collection('products').doc('vets').collection('profile').doc(id).collection('schedule').doc(id)
      .set({
        id : id,
        schedule:ans,
        time : [parseInt(startVal) , parseInt(endVal)],
        slots: {}
      })
  }  
  const days = ['Sunday','Monday','Tuesday' ,'Wednesday','Thursday','Friday','Saturday']
  
  return (
    <div>
      <input  type = "number" value={startVal} onChange={(e)=>setstartVal(e.currentTarget.value)} />
      <input  type = "number" value={endVal} onChange={(e)=>setendVal(e.currentTarget.value)} />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0,1,2,3,4,5,6].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            // secondaryAction={
            //   <IconButton edge="end" aria-label="comments">
            //     <SpringModal id = {value} />
            //   </IconButton>
            // }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${days[value]}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <Button onClick = {OnSubmitSchedule}>Submit</Button>
    </List>
    </div>
    
  );
}

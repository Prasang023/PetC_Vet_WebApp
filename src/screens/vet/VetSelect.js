import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'

import VetCard from '../../ui/VetService/Components/VetCard'
import VetList from '../../assets/data/VetData'
import firebase from "firebase"

function GetData(){
  const [data, setdata] = useState([])

  useEffect(() => {
      firebase
      .firestore()
      .collection('products').doc('vets').collection('profile')
      .onSnapshot((snapshot) =>{
        setdata(snapshot.docs.map(doc => doc.data()))
      })
  }, [])
  return data
}

const VetSelect = () => {
    const data = GetData()
    // console.log(data)
    const vetMakerCard = data => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* <VetCard {...vetMakerObj} /> */}
            <VetCard {...data} />
          </Grid>
        );
      };

    return (
        <Grid container>
            <Grid xs={1}></Grid>
            <Grid item container spacing={2} xs={10}>
                    {data.map(doc => vetMakerCard(doc))}
            </Grid> 
            <Grid xs={1}></Grid> 
            
        </Grid>
    )
}

export default VetSelect

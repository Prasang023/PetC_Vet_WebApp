import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@material-ui/core';

const VetGuideCard = (props) => {
    return (
        <Card elevation='5' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', maxWidth: "450px", marginLeft: '15px', marginRight: '15px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.headLine}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.desc}
                    </Typography>
                    </CardContent>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '10px'}}>
                <img src={props.icon} />
                </Box>
                </Card>
    )
}

export default VetGuideCard

import React from 'react';
import { Box, Grid, Paper } from '@mui/material';

const Bars = ({due, debt}) => {

    return (
    <Paper
    elevation={10}
    sx={{
        borderRadius: 5,
        bgcolor: "#edeae4",
        height: "100%"
    }}>
        <Grid container spacing={0}
        sx={{
            borderRadius: 5,
            bgcolor: "#edeae4",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "100%"
        }}    
        >
            <Grid size={4} 
            sx={{
                bgcolor: 'lightgreen',
                height: `${due}%`,
                border: '2px solid black',
            }}/>
            <Grid size={4}
             sx={{
                bgcolor: 'red',
                height: `${debt}%`,
                border: '2px solid black',
            }}/>
        </Grid>    
    </Paper>

    )
}

export default Bars;

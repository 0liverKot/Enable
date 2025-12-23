import React from 'react';
import { Box, Grid, Paper, useTheme, ThemeProvider } from '@mui/material';

const Bars = ({due, debt}) => {


    return (
    <Paper
    elevation={10}
    sx={{
        borderRadius: 5,
        height: "100%",
        background: "none",
        height: "100%",
    }}>
        <Grid container spacing={0}
        sx={{
            borderRadius: 5,
            justifyContent: "center",
            bgcolor: "primary.secondary",
            alignItems: "flex-end",
            height: "100%",
            opacity: "0.8",
            "&:hover" : {
                opacity: "1.0",
                scale: 1.05
            }
        }}    
        >
            <Grid size={4} 
            sx={{
                bgcolor: '#60c914',
                height: `${due}%`,
                border: '2px solid black',
            }}/>
            <Grid size={4}
             sx={{
                bgcolor: '#cf1111',
                height: `${debt}%`,
                border: '2px solid black',
            }}/>
        </Grid>    
    </Paper>
    )
}

export default Bars;

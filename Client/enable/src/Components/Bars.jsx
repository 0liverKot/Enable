import React from 'react';
import { Box, Grid, Paper, Toolbar } from '@mui/material';

const Bars = ({due, debt}) => {

    return (
   <Paper> 
    <Grid container spacing={0}
    sx={{
        alignItems: "flex-end",
        bgcolor: "lightblue",
        justifyContent: "center",
    }}>
        <Grid size={4}>
            <Box
                sx={{
                    bgcolor: 'lightgreen',
                    height: due * 5,
                    border: '2px solid black',
                }}/>
        </Grid>
        <Grid size={4}>
            <Box
                sx={{
                    bgcolor: 'red',
                    height: debt * 5,
                    border: '2px solid black',
                }}/>
        </Grid>
    </Grid>    
    </Paper>
    )
}

export default Bars;
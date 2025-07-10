import React from 'react';
import { Box, Grid, Toolbar } from '@mui/material';

const Bars = ({due, debt}) => {

    return (
    
    <Grid container spacing={0}
    sx={{
        alignItems: "flex-end",
        bgcolor: "#edeef0",
        justifyContent: "center",
        padding: 2,
        borderRadius: 5
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


    )
}

export default Bars;
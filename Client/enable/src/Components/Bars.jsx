import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { lightGreen, red } from '@mui/material/colors';

const Bars = ({height, due, debt}) => {

    return (
    
    <Box sx={{height:height, display: 'flex', padding: 2, border: '2px solid black'}}>
        
            <Box
                sx={{
                    bgcolor: 'lightgreen',
                    height: due,
                    width: 0.5,
                    border: '2px solid black',
                    marginTop: 'auto'
                }}/>
            

            <Box
                sx={{
                    bgcolor: 'red',
                    height: debt,
                    width: 0.5,
                    border: '2px solid black',
                    marginTop: 'auto'
                }}/>
        </Box>
    )
}

export default Bars;
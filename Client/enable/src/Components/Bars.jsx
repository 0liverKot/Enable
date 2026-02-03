import React from 'react';
import { Typography, Grid, Paper, useTheme, ThemeProvider, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const Bars = ({due, debt, total}) => {

    const theme = useTheme()
    const yMax = Math.ceil(Math.max(due, debt) / 100) * 100

    var title;
    if(total) {
        title = "Total Tasks"
    } else {
        title = "Place Holder Task"
    }
    return (
    <Paper
    elevation={10}
    sx={{
        borderRadius: 5,
        height: "100%",
        bgcolor: "primary.secondary",
        padding: 2,          
        "&:hover" : {
                opacity: "1.0",
                scale: 1.05
            }
    }}>
        <Typography sx={{height: "5%"}}>
            {title}
        </Typography>
        <BarChart
        xAxis={[{ 
            data: ['Due', 'Debt'], 
            scaleType: 'band',
            colorMap: {
                type: 'piecewise',
                thresholds: ['Due'],
                colors: [theme.palette.error.main, theme.palette.success.main]
            } 
        }]}
        series={[{
            data: [due, debt],
            colorByPoint: true,
        }]}
        yAxis={[{
            min: 0,
            max: yMax
        }]}
        sx={{
            position: "relative",
            right: 15,
            top: 20,
            height: "95%"
        }}
        />
    </Paper>
    )
}

export default Bars;

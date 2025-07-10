import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppBar, Box, Toolbar, Button, IconButton, useMediaQuery, useTheme, Container } from '@mui/material'

const Navbar = () => {

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const dashboardButtonStyle = {
        bgcolor: 'secondary.main',
        width: 1
    }

    return (
        <>
            <AppBar position="sticky" color="primary">
                <Toolbar sx={{
                    gap: 10,
                    height: "10vh"
                }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ 
                        mr: 2,
                        scale: 1.5,
                    }}
                >
                    <AccountBoxIcon/>
                </IconButton>
                
                {!isMobile && (
                <>    
                    <Button sx={dashboardButtonStyle} color="inherit" href='notes'>Notes</Button>
                    <Button sx={dashboardButtonStyle} color="inherit" href='calendar'>Calendar</Button>
                    <Button sx={dashboardButtonStyle} color="inherit" href='dashboard'>Dashboard</Button>
                    <Button sx={dashboardButtonStyle} color="inherit" href='focus'>Focus</Button>
                </>
                )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
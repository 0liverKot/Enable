import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppBar, Box, Toolbar, Button, IconButton, useMediaQuery, useTheme, Container, ThemeProvider } from '@mui/material'

const Navbar = ({currentPage}) => {

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const NavbarButtonStyle = {
        bgcolor: 'secondary.dark',
        width: 1
    }

    return (
        <>
        <AppBar position="sticky" sx={{bgcolor: "secondary.main"}}>
            <Toolbar sx={{
                gap: 10,
                height: "10vh"
            }}>
            <IconButton
                size="large"
                edge="start"
                color='inherit'
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
                {currentPage == "dashboard" && (
                <>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                </>
                )}
                {currentPage == "calendar" && (
                <>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                </>
                )}
                {currentPage == "Focus" && (
                <>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                </>
                )}
            </>
            )}
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar
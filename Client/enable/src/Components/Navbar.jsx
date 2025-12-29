import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppBar, Box, Toolbar, Button, IconButton, useMediaQuery, useTheme, Container, ThemeProvider, Zoom } from '@mui/material'

const Navbar = ({currentPage}) => {

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const NavbarButtonStyle = {
        bgcolor: 'secondary.main',
        opacity: "50%",
        width: 1,
        '&:hover': {
            opacity: "90%",
            scale: 1.05
        }
    }

    return (
        <>
        <AppBar position="sticky" sx={{bgcolor: "primary.secondary"}}>
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
                    <Button sx={NavbarButtonStyle} href='alltasks'>Tasks</Button>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                    <Button sx={NavbarButtonStyle} href='notes'>Notes</Button>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                </>
                )}
                {currentPage == "tasks" && (
                <>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                    <Button sx={NavbarButtonStyle} href='alltasks'>Tasks</Button>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                    <Button sx={NavbarButtonStyle} href='notes'>Notes</Button>
                </>
                )}
                {currentPage == "notes" && (
                <>
                    <Button sx={NavbarButtonStyle} href='alltasks'>Tasks</Button>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                    <Button sx={NavbarButtonStyle} href='notes'>Notes</Button>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                </>
                )}
                {currentPage == "calendar" && (
                <>
                    <Button sx={NavbarButtonStyle} href='notes'>Notes</Button>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                    <Button sx={NavbarButtonStyle} href='alltasks'>Tasks</Button>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                </>
                )}
                {currentPage == "focus" && (
                <>
                    <Button sx={NavbarButtonStyle} href='dashboard'>Dashboard</Button>
                    <Button sx={NavbarButtonStyle} href='notes'>Notes</Button>
                    <Button sx={NavbarButtonStyle} href='focus'>Focus</Button>
                    <Button sx={NavbarButtonStyle} href='calendar'>Calendar</Button>
                    <Button sx={NavbarButtonStyle} href='alltasks'>Tasks</Button>
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
import React, { useDeferredValue, useEffect } from 'react'
import VerticalTasksList from './Components/VerticalTasksList'
import CheckToken from './utils/checkToken'
import RedirectToSignUp from './utils/RedirectToSIgnUp'
import Navbar from './Components/Navbar'
import { Box, Container, Grid } from '@mui/material'
import TotalBars from './Components/TotalBars'

const TotalTasksPage = () => {

    if(!CheckToken()) {
        return (RedirectToSignUp())
    }
    
    return (
        <>
        <Navbar currentPage={"tasks"}/>
        <Container maxWidth={"xl"}>
            <Grid 
            container
            spacing={10}
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: "80vh",
                margin: 2
            }}>
            
                <Grid size={2} sx={{height: "90%"}}>
                    <TotalBars/>
                </Grid>
                
                <Grid size={5} sx={{height: "90%"}}>
                    <VerticalTasksList/>
                </Grid>

                <Grid size={5} sx={{height: "90%"}}>
                    <VerticalTasksList type="debt"/>
                </Grid>
            
            </Grid>
        </Container>
        </>
    )
}

export default TotalTasksPage; 
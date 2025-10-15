import { Container, Paper, TextField, Typography, Box, Button} from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router";

const SignUp = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState({boolean: false, message: ''})
    const [passwordError, setPasswordError] = useState({boolean: false, message: ''})

    const handleClick = () => {

        // checking for empty fields 
        if(email == '') {
            setEmailError({boolean: true, message: "field is empty"})
        }
        if(password == '') {
            setPasswordError({boolean: true, message: 'field is empty'})
        }

        // checking if a suitable email pattern is used
        const emailPattern = new RegExp("^[^\s@]+@[^\s@]+\.[^\s@]+$");
        if(!emailPattern.test(email)) {
            setEmailError({boolean: true, message: 'invalid email pattern'})
        }

        //TODO: add backend checks 

        localStorage.setItem("userID", 3)

        return (
            <Navigate to='/dashboard'/>
        )

    }

    return (
        <>
        <Box
        sx={{
            marginTop: '10%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Typography variant="h2">
                Welcome to Enable
            </Typography>
        </Box>
        
        <Container maxWidth={"xs"}>
            <Paper elevation={10}
            sx={{
                padding: 1,
                bgcolor: 'primary.main',
                marginTop: '10%',
                borderRadius: 5,
            }}>
                <Box
                sx={{
                    margin: 1
                }}>
                    <Typography variant="h5">
                        Sign Up
                    </Typography>
                    <Typography variant="body1">
                        Create an account or sign in
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: 5
                }}>
                    <TextField variant="outlined" label ='Email' 
                    error={emailError.boolean}
                    helperText={emailError.message}
                    sx={{
                        width: "75%",
                        margin: 2
                    }}
                    onChange={(event) => {setEmail(event.target.value)}}/>
                    <TextField variant="outlined" label='Password'
                    error={passwordError.boolean}
                    helperText={passwordError.message} 
                    sx={{
                        width: "75%",
                        margin: 2
                    }}
                    onChange={(event) => {setPassword(event.target.value)}}/>
                    <Button variant="Contained" 
                    sx={{
                        width: "75%",
                        padding: 2,
                        bgcolor: "secondary.light",
                        '&:hover' : {
                            bgcolor: 'secondary.dark',
                            color: 'white'
                        }
                    }}
                    onClick={handleClick}>
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
        </>
    )
}

export default SignUp;
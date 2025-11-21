import { Container, Paper, TextField, Typography, Box, Button} from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router";

const SignUp = () => {
    
    const [hasAccount, setHasAccount] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [emailError, setEmailError] = useState({boolean: false, message: ''})
    const [passwordError, setPasswordError] = useState({boolean: false, message: ''})
    const [firstNameError, setFirstNameError] = useState({boolean: false, message: ''})
    const [lastNameError, setLastNameError] = useState({boolean: false, message: ''})

    const handleSignin = () => {

        // checking for empty fields 
        if(email === '') {
            setEmailError({boolean: true, message: "field is empty"})
        }
        if(password === '') {
            setPasswordError({boolean: true, message: 'field is empty'})
        }

        if(!hasAccount) {
            if (firstName === '') {
                setPasswordError({boolean: true, message: 'field is empty'})
            }
            if (lastName == '') {
                setPasswordError({boolean: true, message: 'field is empty'})
            }
        
        if(password.length > 30) {
            setPasswordError({boolean: true, message: 'password is too long'})
        }
        if(firstName.length > 30) {
            setFirstNameError({boolean: true, message: 'first name is too long'})
        }
        if(lastName.length > 30) {
            setLastNameError({boolean: true, message: 'last name is too long'})
        }

        }

        // checking if a suitable email pattern is used
        const emailPattern = new RegExp("^[^\s@]+@[^\s@]+\.[^\s@]+$");
        if(!emailPattern.test(email)) {
            setEmailError({boolean: true, message: 'invalid email pattern'})
        }

        //TODO: add backend checks 


        return (
            <Navigate to='/dashboard'/>
        )
    }

    const handleHasAccount = () => {

        if(hasAccount === true) {
            setHasAccount(false);
        } else {
            setHasAccount(true)
            setFirstName("")
            setLastName("")
        }
    }

    return (
        <>
        <Box
        sx={{
            marginTop: '5%',
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
                
                { !hasAccount && (
                    <>
                    <Typography variant="h5">
                        Sign Up
                    </Typography>
                    <Typography variant="body1">
                        Create an account or sign in
                    </Typography>
                    </>
                )}
                { hasAccount && (
                    <>
                    <Typography variant="h5">
                        Sign In
                    </Typography>
                    </>
                )}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: 5
                }}>

                { !hasAccount && (
                    <>
                    <TextField variant="outlined" label ='First Name' 
                    error={firstNameError.boolean}
                    helperText={firstNameError.message}
                    sx={{
                        width: "75%",
                        margin: 2
                    }}
                    onChange={(event) => {setFirstName(event.target.value)}}/>
                    <TextField variant="outlined" label ='Last Name' 
                    error={lastNameError.boolean}
                    helperText={lastNameError.message}
                    sx={{
                        width: "75%",
                        margin: 2
                    }}
                    onChange={(event) => {setLastName(event.target.value)}}/>
                    </>
                )}

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
                    onClick={handleSignin}>
                        Sign In
                    </Button>

                { !hasAccount && (
                    <>
                    <Button variant="Text" disableRipple
                    sx={{ 
                        textTransform: 'none', 
                        width: "75%",
                        marginTop: 1,
                        bgcolor: 'none',
                        '&:hover' : {
                            color: 'grey',
                            textDecoration: 'underline'
                        }
                    }}
                    onClick={handleHasAccount}>
                        Already have an account?
                    </Button>
                    </>
                )}

                { hasAccount && (
                                        <>
                    <Button variant="Text" disableRipple
                    sx={{ 
                        textTransform: 'none', 
                        width: "75%",
                        marginTop: 1,
                        bgcolor: 'none',
                        '&:hover' : {
                            color: 'grey',
                            textDecoration: 'underline'
                        }
                    }}
                    onClick={handleHasAccount}>
                        Back to Sign Up
                    </Button>
                    </>
                )}
                </Box>
            </Paper>
        </Container>
        </>
    )
}

export default SignUp;
import { Container, Paper, TextField, Typography, Box, Button} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { userExistsByEmail } from "./api/userMethods";
import { authenticateUser, registerUser } from "./api/authMethods";
import Alert from '@mui/material/Alert';


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
        
    const [authFailed, setAuthFailed] = useState(false)

    const navigate = useNavigate()

    const handleSignin =  async () => {
        
        var fieldError = false;

        // checking for empty fields 
        if(email === '') {
            setEmailError({boolean: true, message: "field is empty"})
            fieldError = true;
        }
        if(password === '') {
            setPasswordError({boolean: true, message: 'field is empty'})
            fieldError = true;
        }

        if(!hasAccount) {
            if (firstName === '') {
                setPasswordError({boolean: true, message: 'field is empty'})
                fieldError = true;
            }
            if (lastName == '') {
                setPasswordError({boolean: true, message: 'field is empty'})
                fieldError = true;
            }
        
        if(password.length > 30) {
            setPasswordError({boolean: true, message: 'password is too long'})
            fieldError = true;
        }
        if(firstName.length > 30) {
            setFirstNameError({boolean: true, message: 'first name is too long'})
            fieldError = true;
        }
        if(lastName.length > 30) {
            setLastNameError({boolean: true, message: 'last name is too long'})
            fieldError = true;
        }

        }

        // checking if a suitable email pattern is used
        const emailPattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        if(!emailPattern.test(email)) {
            setEmailError({boolean: true, message: 'invalid email pattern'})
            fieldError = true;
        }


        var response = await userExistsByEmail(email);
        if(!hasAccount && (response.data !== null)) {
            setEmailError({boolean: true, message: 'Account with this email has already been made'})
            fieldError = true;
        }
        
        // return if there are any failures
        if(fieldError) { return }

        var data = {
            "email": email,
            "password": password
        }
        var response = null

        // registration or authentication 
        if(hasAccount) {
            response = await authenticateUser(data)
            if(response.success === false) {
                setAuthFailed(true);
                return 
            }
        } else {
            
            data["firstName"] = firstName
            data["lastName"] = lastName
            response = await registerUser(data)
            if(response.data === null) {
                setSignInFailed(true)
                return
            }
        }           

        const token = response.data.token;
        response = await userExistsByEmail(email)
        const userId = response.data.id
        localStorage.setItem("JwtToken", token)
        localStorage.setItem("userId", userId)

        console.log("reached end")
        navigate('/dashboard')
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
                bgcolor: 'primary.secondary',
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
                        margin: 2,
                        bgcolor: "primary.light"
                    }}
                    onChange={(event) => {setFirstName(event.target.value)}}/>
                    <TextField variant="outlined" label ='Last Name' 
                    error={lastNameError.boolean}
                    helperText={lastNameError.message}
                    sx={{
                        width: "75%",
                        margin: 2,
                        bgcolor: "primary.light"
                    }}
                    onChange={(event) => {setLastName(event.target.value)}}/>
                    </>
                )}

                    <TextField variant="outlined" label ='Email' 
                    error={emailError.boolean}
                    helperText={emailError.message}
                    sx={{
                        width: "75%",
                        margin: 2,
                        bgcolor: "primary.light"
                    }}
                    onChange={(event) => {setEmail(event.target.value)}}/>
                    <TextField variant="outlined" label='Password'
                    error={passwordError.boolean}
                    helperText={passwordError.message} 
                    sx={{
                        width: "75%",
                        margin: 2,
                        bgcolor: 'primary.light',
                        color: 'text.primary'
                    }}
                    onChange={(event) => {setPassword(event.target.value)}}/>
                    <Button variant="Contained" 
                    sx={{
                        width: "75%",
                        padding: 2,
                        bgcolor: "secondary.dark",
                        '&:hover' : {
                            bgcolor: 'secondary.light',
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
                            color: 'secondary.dark',
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
                            color: 'secondary.dark',
                            textDecoration: 'underline'
                        }
                    }}
                    onClick={handleHasAccount}>
                        Back to Sign Up
                    </Button>
                    </>
                )}
                {authFailed && (
                    <Alert severity="error" variant="filled"
                    onClose={() => setAuthFailed(false)}
                    sx={{
                        position: "absolute",
                    }}> Incorrect Details </Alert>
                )}
                </Box>
            </Paper>
        </Container>
        </>
    )
}

export default SignUp;
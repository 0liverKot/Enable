import { Container, Paper, TextField, Typography, Box, Button} from "@mui/material";
import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";

const SignUp = () => {
    
    return (
        <>
        <ThemeProvider theme={theme}>
        <Container maxWidth={"xs"}>
            <Paper elevation={10}
            sx={{
                padding: 1,
            }}>
                <Box>
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
                    marginTop: 5,
                    marginBottom: 5
                }}>
                    <TextField variant="outlined"
                    sx={{
                        width: "75%",
                        padding: 2
                    }}>

                    </TextField>
                    <TextField variant="outlined"
                    sx={{
                        width: "75%",
                        padding: 2
                    }}>
                    </TextField>
                    <Button variant="Contained"
                    sx={{
                        width: "75%",
                        padding: 2
                    }}>
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
        </ThemeProvider>
        </>
    )
}

export default SignUp;
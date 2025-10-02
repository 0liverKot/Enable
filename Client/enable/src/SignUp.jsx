import { Container, Paper, TextField, Typography, Box } from "@mui/material";
import React from "react";

const SignUp = () => {
    
    return (
        <> 
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
                        width: "75%"
                    }}>

                    </TextField>
                    <TextField variant="outlined"
                    sx={{
                        width: "75%"
                    }}>
                    </TextField>
                </Box>
            </Paper>
        </Container>
        </>
    )
}

export default SignUp;
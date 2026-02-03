import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: 'hsl(0, 0%, 5%)',
            secondary: 'hsl(0, 0%, 15%)',
            light: 'hsl(0, 0%, 20%)'
        },
        secondary: {
            main: '#343c51',
            dark: '#ad5e17',
            light: '#8dbe54'
        },
        success: {
            main: 'hsl(100, 60%, 40%)'
        },
        error: {
            main: 'hsl(0, 60%, 40%)' 
        },
        text: {
            primary: 'hsl(0, 0%, 80%)'
        },
        background: {
            default: 'hsl(0, 0%, 10%)',
        }
    }
})

export default theme
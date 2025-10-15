import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f6f2e8',
            secondary: '#f7f0deff'
        },
        secondary: {
            main: '#343c51',
            dark: '#ad5e17',
            light: '#8dbe54'
        },
        background: {
            default: '#eeece9ff',
        }
    }
})

export default theme
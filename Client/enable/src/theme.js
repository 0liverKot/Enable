import { createTheme } from "@mui/material";
import bgImage from './images/background.png';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center"
                }
            }
        }
    },
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
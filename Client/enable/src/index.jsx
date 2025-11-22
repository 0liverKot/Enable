import React, { StrictMode } from 'react';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Dashboard.jsx'
import CalendarPage from './CalendarPage.jsx'
import ErrorPage from "./ErrorPage.jsx"
import SignUp from './Signup.jsx';
import { CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import theme from './theme.js';

localStorage.setItem("JwtToken", "null")
localStorage.setItem("userId", "null")

const router = createBrowserRouter([
    {
    
        path: "/",
        element: <Dashboard/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/calendar",
        element: <CalendarPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/signup",
        element: <SignUp/>,
        errorElement: <ErrorPage/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
       <RouterProvider router={router} />
    </ThemeProvider>
</React.StrictMode>
);
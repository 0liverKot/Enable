import React, { StrictMode } from 'react';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Dashboard.jsx'
import CalendarPage from './CalendarPage.jsx'
import ErrorPage from "./ErrorPage.jsx"
import SignUp from './Signup.jsx';
import TotalTasksPage from './TotalTasksPage.jsx';
import Task from './Task.jsx';
import { CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import theme from './theme.js';

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
    },
    {
        path: "/alltasks",
        element: <TotalTasksPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/task/*",
        element: <Task/>,
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
import React, { StrictMode } from 'react';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './Dashboard.jsx'
import CalendarPage from './CalendarPage.jsx'
import ErrorPage from "./ErrorPage.jsx"
import SignUp from './SignUp.jsx';

localStorage.setItem("jwtToken", "null")

const router = createBrowserRouter([
    {
    
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/dashboard",
        element: <App/>,
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
   <RouterProvider router={router} />
</React.StrictMode>
);
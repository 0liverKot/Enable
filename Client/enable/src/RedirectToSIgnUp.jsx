import React from "react";
import { Navigate } from "react-router-dom";

const RedirectToSignUp = () => {
    return <Navigate to='/signup'  />               
}

export default RedirectToSignUp;
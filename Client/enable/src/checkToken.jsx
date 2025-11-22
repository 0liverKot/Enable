import { getUserById } from "./api/userMethods"; 

const SignInCheck = () => {

    const token = localStorage.getItem("JwtToken")

    if(token === null) {
        return false;
    }
}

export default SignInCheck;
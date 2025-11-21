import { getUserById } from "./api/userMethods"; 

const SignInCheck = () => {

    const userId = localStorage.getItem("Id");

    try {
        getUserById(userId)    
    } catch (error) {
        return false
    }

    return true
}

export default SignInCheck;
import UserApi from "./api/userMethods";


const SignInCheck = () => {

    const userId = localStorage.getItem("Id");

    try {
        UserApi.checkUserExists(userId)    
    } catch (error) {
        return false
    }

    return true
}

export default SignInCheck;
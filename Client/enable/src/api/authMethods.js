import { authService } from "./apiService";

export const registerUser = (data) => {
    return authService.authRegister(data);
}

export const authenticateUser = async (data) => {
    
    const response = await authService.authAuthenticate(data);
    if(response.data === undefined) {
        return {
            success: false
        }
    }
    return {
        success: true,
        data: response.data
    }
}
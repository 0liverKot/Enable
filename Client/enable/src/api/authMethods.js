import { authService } from "./apiService";

export const registerUser = (data) => {
    return authService.authRegister(data);
}

export const authenticateUser = (data) => {
    
    const response = authService.authAuthenticate(data);
        
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
import { authService } from "./apiService";

export const registerUser = (data) => {
    return authService.authRegister(data);
}

export const authenticateUser = async (data) => {
   
    try {
        const response = await authService.authAuthenticate(data);
        return {
            success: true,
            data: response.data
        }
    } catch {
        return {
            success: false
        }
    }
}
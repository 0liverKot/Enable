import { authService } from "./apiService";

export const registerUser = (data) => {
    return authService.authRegister(data);
}

export const authenticateUser = (data) => {
    return authService.authAuthenticate(data);
}
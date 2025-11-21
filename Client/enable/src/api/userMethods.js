import { userService } from "./apiService";

export const getUserById = (id) => {
    return userService.getUserById(id);
}

export const userExistsByEmail = (email) => {
    return userService.userExistsByEmail(email);
}

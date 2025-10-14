import { userService } from "./apiService";

// api calls for user entity

class UserApi {

    constructor() {
        this.service = userService;
    } 
    
    checkUserExists(id) {
        this.service.getUserById(id)
    }

}

export default UserApi;
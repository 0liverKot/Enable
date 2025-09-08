package com.enable.user;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@CrossOrigin // enables CORS allowing to connect to frontend
public class UserController {
    
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Post mappings

    @PostMapping  
    public void addNewUser(@RequestBody User user) {
        userService.insertUser(user);
    }

    // Put mappings
    @PutMapping("/change/{id}")
    public void changeUserName(
        @PathVariable Integer id,
        @RequestParam String newName) {
            userService.changeUserName(id, newName);
    }

    // Get mappings

    @GetMapping("/getAll")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }
    
    // Delete mappings

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
       }

    @DeleteMapping("/deleteAll")
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }


}

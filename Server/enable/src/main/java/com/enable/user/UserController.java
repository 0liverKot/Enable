package com.enable.user;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@CrossOrigin // enables CORS allowing to connect to frontend
public class UserController {
    
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping  
    public void addNewUser(@RequestBody User user) {
        userService.insertUser(user);
    }

    @GetMapping("/getall")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }


}

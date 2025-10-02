package com.enable.user;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service 
public class UserService {
    
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Post mappings 

    public void insertUser(User user) {
        userRepository.save(user);
    }

    // Put mappings 
    @Transactional
    // TODO: change to a change email method 
    /* 
    public void changeUserName(Integer id, String newName) {
        
        boolean exists = userRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException(
            "User with id " + id + " not found");
        }

        // check new name is unique
        List<User> allUsers = userRepository.findAll();
        for(User user : allUsers) {
            if(user.getName().matches(newName)) {
                throw new IllegalStateException(
                    "Name: " + newName + " is taken"
                );
            }
        }
        
        User user = getUserById(id);
        user.setName(newName);
    }
        */

    // Get mappings 

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {        
        return userRepository.findById(id).orElseThrow(
            () -> new IllegalStateException(
                "User with id " + id + " not found"
            ) 
        );
    }

    // Delete mappings 

    public void deleteUser(Integer id) {

        boolean exists = userRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException(
                "User with id " + id + " not found" 
            );
        } else {
            userRepository.deleteById(id);
        }

    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }
   
}

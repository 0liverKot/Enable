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
    public void changeUserEmail(Integer id, String newEmail) {
        
        boolean exists = userRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException(
            "User with id " + id + " not found");
        }

        // check new name is unique
        List<User> allUsers = userRepository.findAll();
        for(User user : allUsers) {
            if(user.getUsername().matches(newEmail)) {
                throw new IllegalStateException(
                    "Email: " + newEmail + " is taken"
                );
            }
        }
        
        User user = getUserById(id);
        user.setUsername(newEmail);
    }

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

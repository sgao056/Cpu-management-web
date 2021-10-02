package com.ucareer.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("api/v1/users")
    public List<User> getUsers() {
        List<User> foundList = userRepository.findAll();
        return foundList;
    }

    @GetMapping("api/v1/users/{id}")
    public User getUser(@PathVariable Long id) {
        User foundOne = userRepository.findById(id).orElse(null);
        return foundOne;
    }

    @PostMapping("api/v1/users")
    public User createUser(@RequestBody User user) {
        User savedOne = userRepository.save(user);
        return savedOne;
    }

    @PutMapping("api/v1/users/{id}")
    public User updateCpu(@RequestBody User user, @PathVariable Long id) {
        User foundOne = userRepository.findById(id).orElse(null);
        if (foundOne == null){
            return null;
        }

        if(user.getUsername() != null){
            foundOne.setUsername(user.getUsername());
        }
        if(user.getPassword() != null){
            foundOne.setPassword(user.getPassword());
        }
        if(user.getEmail() != null){
            foundOne.setEmail(user.getEmail());
        }

        User savedOne = userRepository.save(foundOne);

        return savedOne;
    }

    @DeleteMapping("api/v1/users/{id}")
    public boolean deleteCpu(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
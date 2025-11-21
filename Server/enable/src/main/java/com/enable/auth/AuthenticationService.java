package com.enable.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.enable.config.JwtService;
import com.enable.user.Role;
import com.enable.user.User;
import com.enable.user.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    public AuthenticationResponse register(RegisterRequest request) throws Exception {
        
        if(userRepository.findUserByEmail(request.getEmail()).isPresent()) {
            throw new Exception("User with email: " + request.getEmail() + "already exists");
        }

         var user = new User(
            request.getFirstName(),
            request.getLastName(),
            passwordEncoder.encode(request.getPassword()),   
            request.getEmail(),
            Role.USER
        );
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // getting to this point the user has been authenticated
        String email = request.getEmail();
        var user = userRepository.findUserByEmail(email).orElseThrow(
            () -> new UsernameNotFoundException("User with email: " + email + " not found")
        );

        var jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }
}

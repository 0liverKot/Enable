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

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        
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

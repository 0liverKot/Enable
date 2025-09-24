package com.enable.config;

import java.io.IOException;
import java.util.Objects;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService; 

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request, 
        @NonNull HttpServletResponse response, 
        @NonNull FilterChain filterChain)
            throws ServletException, IOException {
                
                final String authHeader = request.getHeader("Authorization");
                final String jwtToken;
                final String userEmail;

                // check token exists
                if(Objects.isNull(authHeader) || !authHeader.startsWith("Bearer ")) {
                   filterChain.doFilter(request, response); 
                   return;
                }

                // index after "Bearer " is 7 
                jwtToken = authHeader.substring(7);
                 userEmail =  jwtService.extractUsername(jwtToken);
            }
      
}

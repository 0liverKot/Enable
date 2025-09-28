package com.enable.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private JwtAuthenticationFilter jwtAuthFilter;
    private AuthenticationProvidor authProvidor;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http.csrf()
            .disable()
            .authorizeHttpRequests()
            .requestMatchers(null) // requests here will be whitelisted
            .permitAll()
            .anyRequest() // all others are authenticated
            .authenticated()
            .and()
            .sessionManagment()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authenticationProvidor(authProvidor)
            .addFilterBefore(JwtAuthFiler, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    } 
}

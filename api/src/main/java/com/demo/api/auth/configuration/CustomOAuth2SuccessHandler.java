package com.demo.api.auth.configuration;

import com.demo.api.auth.model.User;
import com.demo.api.auth.model.enums.AuthProvider;
import com.demo.api.auth.model.enums.Role;
import com.demo.api.auth.repo.UserRepository;
import com.demo.api.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // Redirect to Vite localhost
    private static final String FRONTEND_REDIRECT = "http://localhost:5173/oauth-success?token=";

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        log.info("OAuth2 login success.");

        OAuth2User oAuthUser = (OAuth2User) authentication.getPrincipal();

        // Auth0 returns OpenID claims:
        String email = (String) oAuthUser.getAttributes().get("email");
        String providerId = (String) oAuthUser.getAttributes().get("sub");      // "google-oauth2|xxxx"
        String name = (String) oAuthUser.getAttributes().get("name");
        String picture = (String) oAuthUser.getAttributes().get("picture");

        log.info("OAuth user info: email={}, sub={}", email, providerId);

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            user = User.builder()
                    .email(email)
                    .username(email)
                    .password(UUID.randomUUID().toString())
                    .firstName(extractFirst(name))
                    .lastName(extractLast(name))
                    .providerId(providerId)
                    .imageUrl(picture)
                    .authProvider(AuthProvider.GOOGLE)
                    .role(Role.USER)
                    .enabled(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .lastLogin(LocalDateTime.now())
                    .build();

            userRepository.save(user);
            log.info("Created new OAuth user {}", email);

        } else {
            user.setProviderId(providerId);
            user.setImageUrl(picture);
            user.setAuthProvider(AuthProvider.GOOGLE);
            user.setLastLogin(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            log.info("Updated existing OAuth user {}", email);
        }

        // Generate JWT for your own API
        String jwt = jwtUtil.generateTokenFromUsername(user.getUsername());

        // Redirect to Vite frontend with token
        response.sendRedirect(FRONTEND_REDIRECT + jwt);
    }

    private String extractFirst(String name) {
        if (name == null || name.isBlank()) return "";
        return name.split(" ")[0];
    }

    private String extractLast(String name) {
        if (name == null || name.isBlank()) return "";
        String[] parts = name.split(" ");
        return parts.length > 1 ? parts[1] : "";
    }
}

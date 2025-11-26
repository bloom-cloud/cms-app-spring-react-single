package com.demo.api.auth.configuration.filter;

import com.demo.api.auth.service.UserDetailsServiceImpl;
import com.demo.api.auth.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

@Data
class JwtFilterError {
    int status;
    String message;

    public JwtFilterError(String message) {
        this.status = HttpServletResponse.SC_UNAUTHORIZED;
        this.message = message;
    }

    public JwtFilterError(int status, String message) {
        this.status = status;
        this.message = message;
    }
}

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (request.getRequestURI().startsWith("/api/public") ||
                request.getRequestURI().startsWith("/api/auth")) {
            filterChain.doFilter(request, response); // skip JWT filter
            return;
        }


        String authHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtUtil.getUsernameFromToken(token);
            } catch (Exception e) {
                sendJsonError(response, new JwtFilterError("Invalid token"));
                log.warn("Invalid JWT: {}", e.getMessage());
                return;
            }
        }

        // Set authentication if valid JWT
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            var userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.isTokenExpired(token)) {
                sendJsonError(response, new JwtFilterError("Token expired"));
                return;
            }


            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        }

        filterChain.doFilter(request, response);
    }

    private void sendJsonError(HttpServletResponse response, JwtFilterError err) throws IOException {
        response.setStatus(err.getStatus());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(err));
        response.getWriter().flush();
    }
}

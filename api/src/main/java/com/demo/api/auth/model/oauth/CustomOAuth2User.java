package com.demo.api.auth.model.oauth;

import java.util.Map;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;

@Getter
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final Map<String, Object> attributes;
    private final Collection<? extends GrantedAuthority> authorities;

    /**
     * This is the unique identifier returned by the provider.
     * Auth0: "sub"  → e.g. "google-oauth2|123456"
     * Google: "sub" → e.g. "112233445566"
     */
    @Override
    public String getName() {
        return (String) attributes.get("sub");
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }

    public String getFullName() {
        return (String) attributes.getOrDefault("name", "");
    }

    public String getPicture() {
        return (String) attributes.getOrDefault("picture", "");
    }

    public String getGivenName() {
        return (String) attributes.getOrDefault("given_name", "");
    }

    public String getFamilyName() {
        return (String) attributes.getOrDefault("family_name", "");
    }

    public String getProviderId() {
        return (String) attributes.get("sub");
    }
}

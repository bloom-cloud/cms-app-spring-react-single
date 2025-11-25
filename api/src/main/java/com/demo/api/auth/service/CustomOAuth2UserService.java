package com.demo.api.auth.service;

import com.demo.api.auth.model.oauth.CustomOAuth2User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Collection<? extends GrantedAuthority> authorities = oAuth2User.getAuthorities();

        log.info("Loaded OAuth user attributes: {}", oAuth2User.getAttributes());

        return new CustomOAuth2User(
                oAuth2User.getAttributes(),
                authorities
        );
    }
}


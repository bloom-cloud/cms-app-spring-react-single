package com.demo.api.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {

    // Serve React app for all non-API routes
    // This allows React Router to handle client-side routing
    @GetMapping("/{path:[^\\.]*}")
    public String serveReactApp() {
        return "forward:/index.html";
    }
}
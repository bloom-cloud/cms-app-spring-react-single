package com.demo.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    // Serve React app for all non-API routes
    // This allows React Router to handle client-side routing
    @GetMapping("/{path:[^\\.]*}")
    public String serveReactApp() {
        return "forward:/index.html";
    }
}
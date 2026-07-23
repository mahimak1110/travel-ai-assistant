package com.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Home", description = "Root endpoint")
public class HomeController {

    @GetMapping("/")
    @Operation(summary = "Welcome endpoint", description = "Welcome message with API documentation link")
    public String home() {
        return """
                <h1>Welcome to Travel AI Assistant API</h1>
                <p>Application is running successfully!</p>
                <p>
                    <a href="/swagger-ui.html">Access Swagger Documentation</a> | 
                    <a href="/api-docs">OpenAPI JSON</a> | 
                    <a href="/api/health">Health Check</a>
                </p>
                """;
    }
}

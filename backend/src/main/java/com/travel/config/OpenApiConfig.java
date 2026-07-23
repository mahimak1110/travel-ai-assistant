package com.travel.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI travelOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Travel AI Assistant API")
                        .description("AI-powered travel assistant REST API documentation")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Travel AI Team")
                                .email("contact@travel-ai.com")
                                .url("https://travel-ai.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://choosealicense.com/licenses/mit/")));
    }
}

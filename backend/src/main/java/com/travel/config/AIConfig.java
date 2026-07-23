package com.travel.config;

import com.travel.service.Assistant;
import dev.langchain4j.model.chat.ChatLanguageModel;
import org.springframework.context.annotation.Bean;
import dev.langchain4j.service.AiServices;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {

    @Bean
    public Assistant assistant(ChatLanguageModel chatLanguageModel) {
        return AiServices.create(
                Assistant.class,
                chatLanguageModel
        );
    }
}

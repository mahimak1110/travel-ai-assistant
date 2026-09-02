package com.travel.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private static final Logger log =
            LoggerFactory.getLogger(ChatService.class);

    private final Assistant assistant;

    public ChatService(Assistant assistant) {
        this.assistant = assistant;
    }

    public String chat(String message) {

        long start = System.currentTimeMillis();

        log.info("Sending request to LLM. messageLength={}", message.length());

        String response = assistant.chat(message);

        long duration = System.currentTimeMillis() - start;

        log.info(
                "LLM response received. durationMs={}, responseLength={}",
                duration,
                response.length()
        );

        return response;
    }
}
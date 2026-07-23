package com.travel.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final Assistant assistant;

    public ChatService(Assistant assistant) {
        this.assistant = assistant;
    }

    public String chat(String message) {
        return assistant.chat(message);
    }
}

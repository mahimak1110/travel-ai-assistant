package com.travel.controller;


import com.travel.dto.ChatRequest;
import com.travel.dto.ChatResponse;
import com.travel.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    private static final Logger log =
            LoggerFactory.getLogger(ChatController.class);

    @PostMapping
    public ChatResponse chat(
            @RequestBody ChatRequest request
    ){
        log.info("Received chat request. conversationId={}", request.getConversationId());
        ChatService.ChatResult result = chatService.chat(
                request.getContent(),
                request.getConversationId()
        );

        log.info("Received chat response Successfully");
        return new ChatResponse(
                result.response(),
                result.conversationId(),
                result.messageId()
        );

    }

}

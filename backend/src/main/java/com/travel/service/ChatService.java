package com.travel.service;

import com.travel.entity.Conversation;
import com.travel.entity.Message;
import com.travel.repository.ConversationRepository;
import com.travel.repository.MessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class ChatService {

    private static final Logger log =
            LoggerFactory.getLogger(ChatService.class);

    private final Assistant assistant;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public ChatService(Assistant assistant,
                       ConversationRepository conversationRepository,
                       MessageRepository messageRepository) {
        this.assistant = assistant;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional
    public ChatResult chat(String message, Long conversationId) {
        if (message == null || message.isBlank()) {
            throw new IllegalArgumentException("Message cannot be blank");
        }

        long start = System.currentTimeMillis();
        log.info("Sending request to LLM. messageLength={}", message.length());

        Conversation conversation = conversationId == null
                ? createConversation(message)
                : conversationRepository.findById(conversationId)
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Conversation not found: " + conversationId
                        ));

        messageRepository.save(
                Message.builder()
                        .conversation(conversation)
                        .content(message)
                        .sender(Message.SenderType.USER)
                        .build()
        );

        String conversationContext = messageRepository
                .findByConversationIdOrderByTimestampAsc(conversation.getId())
                .stream()
                .map(item -> item.getSender() + ": " + item.getContent())
                .collect(Collectors.joining("\n"));

        String response = assistant.chat(conversationContext);

        Message assistantMessage = messageRepository.save(
                Message.builder()
                        .conversation(conversation)
                        .content(response)
                        .sender(Message.SenderType.AI)
                        .build()
        );

        long duration = System.currentTimeMillis() - start;

        log.info(
                "LLM response received. durationMs={}, responseLength={}",
                duration,
                response.length()
        );

        return new ChatResult(response, conversation.getId(), assistantMessage.getId());
    }

    private Conversation createConversation(String message) {
        String title = message.length() > 30
                ? message.substring(0, 30).trim() + "..."
                : message.trim();

        return conversationRepository.save(
                Conversation.builder()
                        .title(title)
                        .build()
        );
    }

    public record ChatResult(String response, Long conversationId, Long messageId) {
    }
}
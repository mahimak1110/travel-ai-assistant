package com.travel.service;

import com.travel.entity.Message;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ContextManager {

    public static final int MAX_MESSAGES = 10;

    public List<Message> getRecentMessages(List<Message> messages) {
        Objects.requireNonNull(messages, "Messages cannot be null");

        if (messages.size() <= MAX_MESSAGES) {
            return List.copyOf(messages);
        }

        return List.copyOf(
                messages.subList(messages.size() - MAX_MESSAGES, messages.size())
        );
    }

    public List<Message> limitContext(List<Message> messages) {
        return getRecentMessages(messages);
    }

    public List<Message> buildContext(List<Message> messages) {
        return limitContext(messages);
    }

    public String createPrompt(List<Message> context) {
        Objects.requireNonNull(context, "Context cannot be null");

        if (context.isEmpty()) {
            return "";
        }

        return context.stream()
                .map(message -> message.getSender() + ": " + message.getContent())
                .collect(Collectors.joining("\n"));
    }
}

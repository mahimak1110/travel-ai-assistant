package com.travel.dto;

public class ChatResponse {

    private String response;
    private Long conversationId;
    private Long messageId;

    public ChatResponse() {
    }

    public ChatResponse(String response, Long conversationId, Long messageId) {
        this.response = response;
        this.conversationId = conversationId;
        this.messageId = messageId;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }
}
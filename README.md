# 🤖 Travel AI Assistant
AI-powered Travel Assistant that I'm building from scratch to explore how modern AI capabilities can be integrated into a real backend application.

The goal of this project is not just to build a chatbot, but to understand the backend engineering behind AI applications — including conversation memory, context management, RAG, tool calling, and AI agents.

> 🚧 This project is actively under development. New features and architectural improvements are being added incrementally.

---

## 🎯 Why I Built This

As a backend engineer, I wanted to get hands-on with AI and understand:

- How does an LLM integrate with a backend service?
- How can an application maintain conversation context?
- How should conversation data be persisted?
- How does an application provide the right context to an LLM?
- How can external tools and APIs be connected to an AI system?
- How can RAG and AI agents be introduced into a backend architecture?

Instead of learning these concepts only theoretically, I'm exploring them by building a working application.

---

## 🏗️ Current Architecture

```text
                    ┌─────────────────────┐
                    │     React + Vite    │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │    Spring Boot      │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
             ┌──────────────┐     ┌──────────────┐
             │ PostgreSQL   │     │  LangChain4j │
             │ Conversation │     │ AI Integration│
             │   Storage    │     └───────┬──────┘
             └──────────────┘             │
                                          ▼
                                  ┌──────────────┐
                                  │ Ollama + Qwen│
                                  │     LLM      │
                                  └──────────────┘

"use client";

import { useState } from "react";
import { ChatMessage, sendChatMessages } from "../lib/api";

export function useChat(systemPrompt: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(userMessage: string) {
    if (!userMessage.trim()) return;

    setLoading(true);
    setError(null);
    
    const userMsg: ChatMessage = { role: "user", content: userMessage.trim() };
    const updatedMessages = [...messages, userMsg];
    
    // Optimistically update UI with user message
    setMessages(updatedMessages);

    try {
      const assistantMessage = await sendChatMessages(systemPrompt, updatedMessages);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || "Failed to get response from AI");
      // Remove the optimistically added user message on error
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  function clearChat() {
    setMessages([]);
    setError(null);
  }

  return { 
    messages, 
    sendMessage, 
    loading, 
    error, 
    clearError,
    clearChat 
  };
}

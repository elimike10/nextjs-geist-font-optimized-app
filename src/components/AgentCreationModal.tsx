"use client";

import { useState } from "react";

export interface Agent {
  id: string;
  name: string;
  systemPrompt: string;
  createdAt: string;
}

interface AgentCreationModalProps {
  onCreate: (agent: Agent) => void;
  onClose: () => void;
}

export default function AgentCreationModal({ onCreate, onClose }: AgentCreationModalProps) {
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Agent name is required");
      return;
    }

    if (!systemPrompt.trim()) {
      setError("System prompt is required");
      return;
    }

    if (name.trim().length < 2) {
      setError("Agent name must be at least 2 characters long");
      return;
    }

    if (systemPrompt.trim().length < 10) {
      setError("System prompt must be at least 10 characters long");
      return;
    }

    const newAgent: Agent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      systemPrompt: systemPrompt.trim(),
      createdAt: new Date().toISOString(),
    };

    onCreate(newAgent);
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create New Agent</h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Agent Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="e.g., Creative Writer, Code Assistant, Math Tutor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {name.length}/50 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                System Prompt
              </label>
              <textarea
                className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={6}
                placeholder="Define your agent's personality, expertise, and behavior. For example: 'You are a helpful creative writing assistant who specializes in storytelling and character development. Always provide constructive feedback and encourage creativity.'"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {systemPrompt.length}/1000 characters
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Create Agent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

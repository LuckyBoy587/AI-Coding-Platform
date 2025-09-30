import {useEffect, useRef, useState} from "react";
import GeminiResponse from "./GeminiResponse.jsx";
import UserQuery from "./UserQuery.jsx";
import { useConversation } from "../contexts/ConversationContext.jsx";
import { useCode } from "../contexts/CodeContext.jsx";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chat = () => {
  const { conversationHistory, addMessage, appendToLastMessage } = useConversation();
  const { code, userInput, question } = useCode();
  const chatBodyRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  const renderConversation = () => {
    return conversationHistory.map((msg, index) => (
      msg.sender === "assistant"
        ? <GeminiResponse key={index} text={msg.message}/>
        : <UserQuery key={index} text={msg.message}/>
    ));
  }

  const handleAskGemini = () => {
    if (userQuery.trim() === "") {
      alert("Please enter a valid query.");
      return;
    }
    addMessage(userQuery, "user");
    addMessage("Thinking...", "assistant");
    setUserQuery("");
    handleStreamResponse();
  };

  const createPrompt = () => {
    const formattedContext = conversationHistory.map(msg => ({
      role: msg.sender === "assistant" ? "model" : "user",
      parts: [{ text: msg.message }]
    }));

    const userMsg = {
      role: 'user',
      parts: [{
        text: `
        You are an expert in Data Structures and Algorithms.
        Problem Statement: ${question}
        User Query: ${userQuery}
        User Code Snippet: ${code}
        Custom Input: ${userInput}
        Please provide a clear, step-by-step solution or explanation tailored to this scenario.
      `.trim()
      }]
    };

    return {
      contents: [
        ...formattedContext,
        userMsg
      ]
    };
  };

  const handleStreamResponse = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GOOGLE_API_KEY env var");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContentStream(createPrompt());
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        appendToLastMessage(text, "assistant");
      }
    }

    await result.response;
  };

  return (
    <div
      className="flex flex-col h-full bg-[var(--color-bg-secondary)] rounded-xl p-0 shadow-2xl border border-[var(--color-border)]"
      style={{boxShadow: "0 8px 32px 0 rgba(0,0,0,0.65)", minWidth: 320}}>
      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">Chat with LUCKY BOT</p>
      </div>
      <div
        ref={chatBodyRef}
        className="flex flex-col flex-1 overflow-auto bg-[var(--color-bg-primary)] p-4 transition-colors duration-300">
        {renderConversation()}
      </div>
      <div
        className={"flex bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-b-xl border-t border-[var(--color-text-secondary)] transition-colors duration-200 min-w-0 overflow-hidden"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAskGemini();
          }
        }}>
        <input
          className="flex-1 p-3 focus:outline-none border-none text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]"
          type={"text"}
          placeholder={"Ask Anything..."}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button
          className="bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:bg-[var(--color-button-bg-hover)] hover:text-[var(--color-button-text-hover)] hover:cursor-pointer transition-colors duration-200 flex-shrink-0 m-2 rounded-lg hover:"
          onClick={handleAskGemini}>
          <div className={"flex items-center justify-center aspect-square h-full px-3 py-2"}>
            <i className="fa-solid fa-angles-right"></i>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Chat
import {useState} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";
import { useConversation } from "../contexts/ConversationContext.jsx";

const Question = ({code, onRequestSent}) => {
  const { addMessage, conversationHistory, appendToLastMessage } = useConversation();
  const [question, setQuestion] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const handleAskGemini = () => {
    if (question.trim() === "") {
      alert("Please enter a question before asking Gemini.");
      return;
    }
    addMessage(userQuery, "user");
    addMessage("Thinking...", "assistant");
    setUserQuery("");
    onRequestSent();
    handleStreamResponse();
  }

  const createPrompt = () => {
    const formattedContext = conversationHistory.map(msg => ({
      role: msg.sender === "assistant" ? "model" : "user",
      parts: [{text: msg.message}]
    }));

    const userMsg = {
      role: 'user',
      parts: [{
        text: `
        You are an expert in Data Structures and Algorithms.
        Problem Statement: ${question}
        User Query: ${userQuery}
        User Code Snippet: ${code}
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
  }

  const handleStreamResponse = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GOOGLE_API_KEY env var");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({model: "gemini-2.5-pro"});
    const result = await model.generateContentStream(createPrompt());
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        appendToLastMessage(text, "assistant");
      }
    }

    await result.response;
  }

  return (
    <div
      className="flex flex-col bg-[var(--color-bg-secondary)] rounded-xl p-6 shadow-lg h-full transition-colors duration-300">
      <textarea
        className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-lg p-4 resize-none h-full transition-colors duration-200
        border border-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-secondary)]"
        placeholder="Paste your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <div
        className={"flex mt-4 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg border border-[var(--color-text-secondary)] transition-colors duration-200 min-w-0"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAskGemini();
          }
        }}>
        <input
          className="flex-1 p-2 focus:outline-none border-none text-[var(--color-text-primary)] bg-[var(--color-bg-primary)] rounded-lg min-w-0"
          type={"text"}
          placeholder={"Ask Anything..."}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button
          className="bg-[var(--color-button-bg)] text-[var(--color-button-text)] rounded-lg hover:bg-[var(--color-button-bg-hover)] transition-colors duration-200 flex-shrink-0"
          onClick={handleAskGemini}>
          <div className={"flex items-center justify-center aspect-square h-full px-3"}>
            <i className="fa-solid fa-angles-right"></i>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Question;
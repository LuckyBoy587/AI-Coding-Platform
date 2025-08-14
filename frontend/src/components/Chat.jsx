import {useEffect, useRef} from "react";
import GeminiResponse from "./GeminiResponse.jsx";
import UserQuery from "./UserQuery.jsx";
import { useConversation } from "../contexts/ConversationContext.jsx";

const Chat = () => {
  const { conversationHistory } = useConversation();
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, []);

  const renderConversation = () => {
    return conversationHistory.map((msg, index) => (
      msg.sender === "assistant"
        ? <GeminiResponse key={index} text={msg.message}/>
        : <UserQuery key={index} text={msg.message}/>
    ));
  }
  return (
    <div
      className="flex flex-col h-full bg-[var(--color-bg-secondary)] rounded-xl p-0 shadow-2xl border border-[var(--color-border)]"
      style={{boxShadow: "0 8px 32px 0 rgba(0,0,0,0.65)", minWidth: 320}}>
      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">Chat with LUCKY BOT</p>
      </div>
      <div
        ref={chatBodyRef}
        className="flex flex-col flex-1 overflow-auto bg-[var(--color-bg-primary)] rounded-b-xl p-4 transition-colors duration-300">
        {renderConversation()}
      </div>
    </div>
  )
}

export default Chat
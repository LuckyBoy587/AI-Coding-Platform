import {sendRequest} from "../utils/request-sender.js";
import {useState} from "react";
import GeminiResponse from "./GeminiResponse.jsx";

const Chat = ({question}) => {
  const [reply, setReply] = useState("Waiting for reply...");
  const handleClick = () => {
    if (!question) {
        setReply("Please type a question first.");
        return;
    }
    sendRequest(question)
      .then((response) => {
        setReply(response || "No reply received");
      })
  }
  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-secondary)] rounded-l-xl p-6 shadow-lg transition-colors duration-300">
      <p className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">Gemini Chat</p>
      <button
        className="bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] px-4 py-2 rounded-lg border border-[var(--color-text-secondary)] transition-colors duration-200 mb-4
        focus:outline-none focus:ring-2 focus:ring-[var(--color-text-secondary)] hover:cursor-pointer"
        onClick={handleClick}
      >
        Ask: {question || "Type your question"}
      </button>
      <div className="flex-1 overflow-auto bg-[var(--color-bg-primary)] rounded-lg p-4 transition-colors duration-300">
        <GeminiResponse text={reply}/>
      </div>
    </div>
  )
}

export default Chat
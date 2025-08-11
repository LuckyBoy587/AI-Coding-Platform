import {useRef, useState} from "react";
import Question from "./Question.jsx";
import Chat from "./Chat.jsx";
import Code from "./Code.jsx";
import {useCode} from "../contexts/CodeContext.jsx";
import useOutsideClick from "../utils/OutsideClick.jsx";

const CHAT_ANIMATION_DURATION = 400; // ms, matches .animate-pop-out

const Home = () => {
  const {code} = useCode();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatAnimation, setChatAnimation] = useState("animate-pop-in");

  const chatRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useOutsideClick(chatRef, toggleButtonRef, () => {
    if (chatOpen) handleToggleChat();
  });

  const onRequestSent = () => {
    setChatVisible(true);
    setChatAnimation("animate-pop-in");
    setChatOpen(true);
  }

  const handleToggleChat = () => {
    if (chatOpen) {
      setChatAnimation("animate-pop-out");
      setTimeout(() => {
        setChatOpen(false);
        setChatVisible(false);
      }, CHAT_ANIMATION_DURATION);
    } else {
      setChatVisible(true);
      setChatAnimation("animate-pop-in");
      setChatOpen(true);
    }
  };

  return (
    <div className={"flex gap-4 h-full relative min-w-0 overflow-hidden"}>
      <div className="flex-1 min-w-fit">
        <Question code={code} onRequestSent={onRequestSent}/>
      </div>
      <div className="flex-3 min-w-0">
        <Code/>
      </div>
      {/* Chat Popup */}
      {chatVisible && (
        <div
          ref={chatRef}
          className={`fixed bottom-22 right-6 z-50 w-[600px] max-w-[90vw] h-[500px] max-h-[80vh] transition-all duration-300 ${chatAnimation}`}>
          {chatOpen && <Chat/>} {/* Only render Chat when open, but keep container for animation */}
        </div>
      )}
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        className="fixed bottom-6 right-6 z-50 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] px-4 py-2 rounded-full shadow-lg border-2 border-[var(--color-user-border)] hover:bg-[var(--color-user-bg)] transition-colors duration-200"
        onClick={handleToggleChat}
      >
        {chatOpen ? "Close Chat" : "Open Chat"}
      </button>
    </div>
  )
}

export default Home
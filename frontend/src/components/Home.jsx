import {useRef, useState} from "react";
import Question from "./Question.jsx";
import Chat from "./Chat.jsx";
import Code from "./Code.jsx";
import useOutsideClick from "../utils/OutsideClick.jsx";
import ToolBar from "./ToolBar.jsx";

const CHAT_ANIMATION_DURATION = 400; // ms, matches .animate-pop-out

const Home = () => {
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
        <Question onRequestSent={onRequestSent}/>
      </div>
      <div className="flex-3 min-w-0">
        <Code/>
      </div>

      {chatVisible && (
        <div
          ref={chatRef}
          className={`fixed bottom-22 right-6 z-50 w-[600px] max-w-[90vw] h-[500px] max-h-[80vh] transition-all duration-300 ${chatAnimation}`}>
          {chatOpen && <Chat/>}
        </div>
      )}

      <ToolBar
        onGeminiClick={handleToggleChat}
        geminiRef={toggleButtonRef}
      />
    </div>
  )
}

export default Home
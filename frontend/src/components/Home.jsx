import {useRef, useState} from "react";
import Question from "./Question.jsx";
import Chat from "./Chat.jsx";
import Code from "./Code.jsx";
import useOutsideClick from "../utils/OutsideClick.jsx";
import ToolBarRight from "./ToolBarRight.jsx";
import {useOutput} from "../contexts/OutputContext.jsx";
import Output from "./Output.jsx";
import ToolBarLeft from "./ToolBarLeft.jsx";

const CHAT_ANIMATION_DURATION = 400;

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatAnimation, setChatAnimation] = useState("animate-pop-in");

  const chatRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const {showOutput} = useOutput();

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
    <div className={"flex gap-4 h-full relative min-w-0"}>
      <div className={"z-50"}>
        <ToolBarLeft/>
      </div>
      <div className="flex-1 min-w-fit sticky top-0 py-3 max-h-screen">
        <Question onRequestSent={onRequestSent}/>
      </div>
      <div className="flex-3 min-w-0 py-3 flex flex-col gap-4 overflow-y-auto">
        <Code/>
        {showOutput && <Output/>}
      </div>

      {chatVisible && (
        <div
          ref={chatRef}
          className={`fixed bottom-22 right-6 z-50 w-[600px] max-w-[90vw] h-[500px] max-h-[80vh] transition-all duration-300 ${chatAnimation}`}>
          {chatOpen && <Chat/>}
        </div>
      )}

      <ToolBarRight
        onGeminiClick={handleToggleChat}
        geminiRef={toggleButtonRef}
      />
    </div>
  )
}

export default Home
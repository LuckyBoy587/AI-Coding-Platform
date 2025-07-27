import Question from "./Question.jsx";
import Chat from "./Chat.jsx";
import Code from "./Code.jsx";
import {useState} from "react";

const Home = () => {
  const [question, setQuestion] = useState("");
  return (
    <div className={"grid grid-cols-3 grid-rows-1 gap-4 h-screen"}>
      <Question question={question} setQuestion={setQuestion} />
      <Code/>
      <Chat question={question}/>
    </div>
  )
}

export default Home
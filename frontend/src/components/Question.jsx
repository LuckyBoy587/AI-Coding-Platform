import {useCode} from "../contexts/CodeContext.jsx";

const Question = ({onRequestSent}) => {
  const {userInput, setUserInput, question, setQuestion} = useCode();

  return (
    <div
      className="flex flex-col gap-4 bg-[var(--color-bg-secondary)] rounded-xl p-6 shadow-lg h-full transition-colors duration-300">
      <textarea
        className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-lg p-4 resize-none flex-2 transition-colors duration-200
        border border-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-secondary)]"
        placeholder="What's the question today?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <textarea
        className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-lg p-4 resize-none flex-1 transition-colors duration-200
        border border-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-secondary)]"
        placeholder="Custom Input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>
    </div>
  )
}

export default Question;
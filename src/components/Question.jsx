const Question = ({question, setQuestion}) => {
  return (
    <div className="flex flex-col bg-[var(--color-bg-secondary)] rounded-r-xl p-6 shadow-lg h-full transition-colors duration-300">
      <textarea
        className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-lg p-4 resize-none h-full transition-colors duration-200
        border border-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-secondary)]"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
    </div>
  )
}

export default Question;
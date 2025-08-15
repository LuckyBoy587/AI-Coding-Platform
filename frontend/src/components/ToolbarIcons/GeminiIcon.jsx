const GeminiIcon = ({onIconClick, iconRef}) => {
  const handleOptionClick = (optionButton) => {
    if (optionButton.classList.contains("is-active")) {
      optionButton.classList.remove("is-active");
      optionButton.classList.add("animate-rotate-clockwise");
      setTimeout(() => {
        optionButton.classList.remove("animate-rotate-clockwise");
      }, 500);
    } else {
      optionButton.classList.add("is-active");
      optionButton.classList.add("animate-rotate-counterclockwise");
      setTimeout(() => {
        optionButton.classList.remove("animate-rotate-counterclockwise");
      }, 500);
    }
  }
  return (
    <button
      onClick={(event) => {
        handleOptionClick(event.currentTarget)
        onIconClick()
      }}
      ref={iconRef}
      className={"flex justify-center items-center p-2 animate-rotate-clockwise"}>
      <img src={"/gemini.png"} alt={"ASK AI"} className="w-6 h-6 transition-all duration-200 group-hover:scale-110"/>
    </button>
  )
}

export default GeminiIcon;
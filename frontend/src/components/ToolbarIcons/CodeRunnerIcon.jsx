import {useCode} from "../../contexts/CodeContext.jsx";
import {useOutput} from "../../contexts/OutputContext.jsx";

const CodeRunnerIcon = () => {
    const {code, selectedLanguage, userInput} = useCode();
    const {setShowOutput, setOutput, setIsSuccessful} = useOutput();
  const handleIconClick = async () => {
    if (code.trim() === "") {
      alert("No code to run.");
      return;
    }
    setShowOutput(false);
    const url = "https://docker-test-3-9cf4cc04b890.herokuapp.com/run";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: selectedLanguage.toLowerCase(),
        input: userInput,
      }),
    }).then((response) => {
      console.log(response);
      setIsSuccessful(response.ok);
      return response.text();
    })
      .then((response) => {
        setOutput(response);
        setShowOutput(true);
      })
  }
  return (
    <div
      onClick={handleIconClick}
      className={"group flex justify-center items-center p-2 hover:cursor-pointer transition-transform duration-200"}>
      <i className="fa-solid fa-circle-play text-2xl text-[var(--color-text-secondary)] transition-all duration-200 group-hover:text-[var(--color-accent)] group-hover:scale-110"></i>
    </div>
  )
}

export default CodeRunnerIcon;
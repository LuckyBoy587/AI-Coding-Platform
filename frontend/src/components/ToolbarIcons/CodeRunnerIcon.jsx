import {useCode} from "../../contexts/CodeContext.jsx";

const CodeRunnerIcon = () => {
    const {code, selectedLanguage} = useCode();
  const handleIconClick = async () => {
    if (code.trim() === "") {
      alert("No code to run.");
      return;
    }

    const url = "http://localhost:5000/run";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: selectedLanguage.toLowerCase(),
      }),
    }).then((response) => response.text())
      .then((response) => {console.log(response)})
  }
  return (
    <div
      onClick={handleIconClick}
      className={"flex justify-center items-center p-2"}>
      <i className="fa-solid fa-circle-play text-2xl"></i>
    </div>
  )
}

export default CodeRunnerIcon;
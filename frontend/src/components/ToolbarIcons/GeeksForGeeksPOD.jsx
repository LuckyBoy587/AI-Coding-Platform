import {useCode} from "../../contexts/CodeContext.jsx";

const GeeksForGeeksPOD = () => {
  const {setQuestion, updateCode, selectedLanguage} = useCode();

  async function handleLeetcodeClick() {
    const url = "https://alfa-leetcode-api.onrender.com/dailyQuestion";
    await fetch(url)
      .then(response => response.json())
      .then(response => {
        const question = response.data.activeDailyCodingChallengeQuestion.question.content;
        const preElement = document.createElement("pre");
        preElement.innerHTML = question;
        setQuestion(preElement.innerText);

        const codeSnippets = response.data.activeDailyCodingChallengeQuestion.question.codeSnippets;
        const requiredSnippet = codeSnippets.find(snippet => snippet.lang.toLowerCase() === selectedLanguage);
        updateCode(requiredSnippet.code);
      })
  }

  return (<div
    onClick={handleLeetcodeClick}
    className={"flex justify-center items-center p-2"}>
    <img src={"/gfg.png"} alt={"Leetcode"}
         className="w-6 h-6 transition-all duration-200 group-hover:scale-110"/>
  </div>)
}

export default GeeksForGeeksPOD;
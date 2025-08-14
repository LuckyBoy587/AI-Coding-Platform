import {useCode} from "../../contexts/CodeContext.jsx";
import {findExtensionByLanguage} from "../../constants/languages.js";

const FileDownloaderIcon = () => {
  const {code, selectedLanguage} = useCode();
  function handleDownload() {
    if (code.trim() === "") {
      alert("No code to download.");
      return;
    }
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "code." + findExtensionByLanguage(selectedLanguage);
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div
      onClick={handleDownload}
      className={"flex justify-center items-center p-2"}>
      <i className="fa-solid fa-download text-2xl"/>
    </div>
  )
}

export default FileDownloaderIcon;
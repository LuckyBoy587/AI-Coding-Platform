import {useRef} from "react";
import {findLanguageByExtension, hasLanguageByExtension} from "../../constants/languages.js";
import {useCode} from "../../contexts/CodeContext.jsx";

const FileChooserIcon = () => {
  const {updateCode, updateLanguage} = useCode();
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (hasLanguageByExtension(fileExtension)) {
        const language = findLanguageByExtension(fileExtension);
        console.log("Selected File:", file);
        const reader = new FileReader();
        reader.onload = (event) => {
          updateLanguage(language.name);
          updateCode(event.target.result);
        }

        reader.readAsText(file);
      } else {
        console.error(`File extension ${fileExtension} is not supported.`);
      }
    }
  }

  return (
    <div className={"flex justify-center items-center p-2"} onClick={handleIconClick}>
      <i className="fas fa-file-upload text-2xl"/>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className={"hidden"}/>
    </div>
  )
}

export default FileChooserIcon;
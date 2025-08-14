import GeminiIcon from "./ToolbarIcons/GeminiIcon.jsx";
import FileChooserIcon from "./ToolbarIcons/FileChooserIcon.jsx";
import FileDownloaderIcon from "./ToolbarIcons/FileDownloaderIcon.jsx";
import CodeRunnerIcon from "./ToolbarIcons/CodeRunnerIcon.jsx";

const ToolBar = ({onGeminiClick, geminiRef}) => {
  const showIcon = (icon, tooltip) => {
    return (<div className={"relative flex flex-col group hover:cursor-pointer overflow-visible"}>
        {icon}
        <span
          className="absolute top-1/2 -translate-y-1/2 right-full mb-2 px-2 py-1 whitespace-nowrap text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
              {tooltip}
          </span>
      </div>);
  }
  return (<div
    className="flex flex-col gap-8 h-full w-fit rounded-xl p-0 justify-between">
    <div className={"flex flex-col items-center bg-[var(--color-bg-secondary)] gap-4  rounded-xl"}>
      {showIcon(<FileChooserIcon/>, "Upload from Local")}
      {showIcon(<FileDownloaderIcon/>, "Download to Local")}
      {showIcon(<CodeRunnerIcon />, "Run Code")}
    </div>

    <div className={"flex flex-col-reverse"}>
      <div className={"flex flex-col items-center bg-[var(--color-bg-secondary)] gap-4  rounded-xl"}>
        {showIcon(<GeminiIcon onIconClick={onGeminiClick} iconRef={geminiRef}/>, "Ask AI")}
      </div>
    </div>
  </div>)
}

export default ToolBar;
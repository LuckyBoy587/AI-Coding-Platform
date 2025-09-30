import LeetcodePOD from "./ToolbarIcons/LeetcodePOD.jsx";

const ToolBarLeft = () => {
  const showIcon = (icon, tooltip) => {
    return (<div className={"relative flex flex-col group hover:cursor-pointer overflow-visible"}>
      {icon}
      <span
        className="absolute top-1/2 -translate-y-1/2 left-full mb-2 px-2 py-1 whitespace-nowrap text-xs text-white bg-black rounded hidden group-hover:block transition-opacity">
        {tooltip}
      </span>
    </div>);
  }

  return (<div
    className="flex flex-col gap-8 w-fit rounded-xl py-3 justify-between sticky top-0 max-h-screen">
    <div className={"flex flex-col items-center bg-[var(--color-bg-secondary)] gap-4 rounded-xl"}>
      {showIcon(<LeetcodePOD/>, "Copy Leetcode Problem of the Day")}
      {/*{showIcon(<GeeksForGeeksPOD/>, "Copy GFG Problem of the Day")}*/}
    </div>

    <div className={"flex flex-col-reverse"}>
      <div className={"flex flex-col items-center bg-[var(--color-bg-secondary)] gap-4  rounded-xl"}>

      </div>
    </div>
  </div>)
}

export default ToolBarLeft;
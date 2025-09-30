import {useOutput} from "../contexts/OutputContext.jsx";
import {useEffect, useRef} from "react";

const Output = () => {
  const {output, isSuccessful, setShowOutput} = useOutput();
  const codeScrollRef = useRef(null);
  useEffect(() => {
    codeScrollRef?.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  const getHeading = () => isSuccessful ? "Compilation Successful" : "Compilation Failed";
  const handleClose = () => setShowOutput(false);
  return (
    <div className={"flex flex-col gap-4 w-full bg-[var(--color-bg-secondary)] rounded-xl p-4"}>
      <div className={"flex justify-between items-center"}>
        <h2 className="font-semibold text-[var(--color-accent)]">{getHeading()}</h2>
        <i className="fa-solid fa-xmark hover:cursor-pointer text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-accent)]" onClick={handleClose}></i>
      </div>
      <pre className={"bg-[var(--color-bg-primary)] p-4 rounded-xl text-wrap"}>
        {output}
      </pre>
      <div ref={codeScrollRef}></div>
    </div>
  )
}

export default Output
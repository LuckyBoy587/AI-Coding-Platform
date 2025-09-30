import {createContext, useContext, useState} from "react";

const OutputContext = createContext(undefined);

export const OutputProvider = ({children}) => {
  const [output, setOutput] = useState("");
  const [isSuccessful, setIsSuccessful] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const value = {
    output,
    isSuccessful,
    showOutput,
    setOutput,
    setIsSuccessful,
    setShowOutput
  }

  return (
    <OutputContext.Provider value={value}>
      {children}
    </OutputContext.Provider>
  )
};

export const useOutput = () => {
  const context = useContext(OutputContext);
  if (!context) {
    throw new Error("useOutput must be used within an OutputProvider");
  }
  return context;
}
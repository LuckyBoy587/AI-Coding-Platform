import React, {createContext, useContext, useState} from 'react';
import {DEFAULT_LANGUAGE, findPlaceholderByLanguage} from '../constants/languages.js';

const CodeContext = createContext(undefined);

export const CodeProvider = ({children}) => {
  const [code, setCode] = useState(findPlaceholderByLanguage(DEFAULT_LANGUAGE));
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
  const [userInput, setUserInput] = useState("");
  const [question, setQuestion] = useState("");

  const updateCode = (newCode) => {
    setCode(newCode);
  };

  const updateLanguage = (newLanguage) => {
    setSelectedLanguage(newLanguage.toLowerCase());
  };

  const clearCode = () => {
    setCode('');
  };

  const value = {
    code,
    selectedLanguage,
    updateCode,
    updateLanguage,
    clearCode,
    userInput,
    setUserInput,
    question,
    setQuestion,
  };

  return (
    <CodeContext.Provider value={value}>
      {children}
    </CodeContext.Provider>
  );
};

const useCode = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCode must be used within a CodeProvider');
  }
  return context;
};

export {useCode};

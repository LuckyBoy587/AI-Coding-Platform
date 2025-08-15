import React, {createContext, useContext, useState} from 'react';
import {DEFAULT_LANGUAGE} from '../constants/languages.js';

const CodeContext = createContext(undefined);

export const CodeProvider = ({children}) => {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
  const [userInput, setUserInput] = useState("");

  const updateCode = (newCode) => {
    setCode(newCode);
  };

  const updateLanguage = (newLanguage) => {
    setSelectedLanguage(newLanguage);
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

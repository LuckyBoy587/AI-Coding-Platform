import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

export const ConversationProvider = ({ children }) => {
  const [conversationHistory, setConversationHistory] = useState([
    {
      message: "Hi, how can I help you today?",
      sender: "assistant"
    },
  ]);

  const addMessage = (message, sender) => {
    setConversationHistory(prevHistory => [
      ...prevHistory,
      { message, sender }
    ]);
  };

  const appendToLastMessage = (text, sender) => {
    setConversationHistory(prevHistory => {
      const history = [...prevHistory];
      if (
        history.length > 0 &&
        history[history.length - 1].sender === sender
      ) {
        history[history.length - 1] = {
          ...history[history.length - 1],
          message: (history[history.length - 1].message === "Thinking..." ? "" : history[history.length - 1].message) + text
        };
      } else {
        history.push({ message: text, sender });
      }
      return history;
    });
  };

  const clearConversation = () => {
    setConversationHistory([
      {
        message: "Hi, how can I help you today?",
        sender: "assistant"
      },
    ]);
  };

  const value = {
    conversationHistory,
    addMessage,
    clearConversation,
    appendToLastMessage,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

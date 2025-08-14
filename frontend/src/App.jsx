import './App.css'
import Home from "./components/Home.jsx";
import { CodeProvider } from "./contexts/CodeContext.jsx";
import { ConversationProvider } from "./contexts/ConversationContext.jsx";

function App() {
  return (
    <CodeProvider>
      <ConversationProvider>
        <div className={"p-3 h-screen"}>
          <Home/>
        </div>
      </ConversationProvider>
    </CodeProvider>
  )
}

export default App

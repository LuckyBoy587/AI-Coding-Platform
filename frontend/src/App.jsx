import './App.css'
import Home from "./components/Home.jsx";
import {CodeProvider} from "./contexts/CodeContext.jsx";
import {ConversationProvider} from "./contexts/ConversationContext.jsx";
import {OutputProvider} from "./contexts/OutputContext.jsx";

function App() {
  return (
    <CodeProvider>
      <ConversationProvider>
        <OutputProvider>
          <div className={"px-3 min-h-screen"}>
            <Home/>
          </div>
        </OutputProvider>
      </ConversationProvider>
    </CodeProvider>
  )
}

export default App

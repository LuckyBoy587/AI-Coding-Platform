AI Coding Platform

A full-stack, web-based coding assistant and code runner. Write code in the browser, run it safely in Docker on the backend, and get AI help powered by Google Generative AI (Gemini). Includes code upload/download, multi-language Monaco editor, streaming AI responses with syntax-highlighted code blocks, and a rich output panel.

Table of Contents
- Overview
- Features
  - Frontend (React + Vite)
  - Backend (Node.js + Express + Docker)
- Tech Stack
- Project Structure
- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
  - Running Locally (Frontend + Backend)
  - Building for Production
- API Reference (Backend)
- Configuration Notes
- Troubleshooting
- License

Overview
This project provides an AI-assisted coding experience:
- A Monaco-based code editor with language selection for Python, C++, Java, and JavaScript.
- A toolbar to upload code from disk, download the current editor content, run code via a backend Docker runner, and open an AI chat (Gemini).
- A chat assistant that streams answers, renders Markdown/KaTeX, highlights code with copy/move-to-editor actions, and maintains conversation context.
- An output panel that shows stdout/stderr summaries after running code, with success/failure status.

Features
Frontend (React + Vite)
- Monaco Code Editor (src/components/Code.jsx)
  - Supports Python, C++, Java, JavaScript via language dropdown.
  - Language definitions in src/constants/languages.js with monacoId and versions.
  - Controlled content updates via CodeContext to keep app state in sync.
  - Editor options: word wrap, smooth scrolling, themed vs-dark.
- Language Management (src/constants/languages.js)
  - LANGUAGES: [{ name, monacoId, version, fileExtension }].
  - DEFAULT_LANGUAGE = "Java".
  - Helpers: hasLanguageByName, hasLanguageByExtension, findLanguageByExtension, findExtensionByLanguage.
- State Management with Contexts
  - CodeContext (src/contexts/CodeContext.jsx): code, selectedLanguage, updateCode, updateLanguage, clearCode, userInput, setUserInput.
  - OutputContext (src/contexts/OutputContext.jsx): output, isSuccessful, showOutput, setOutput, setIsSuccessful, setShowOutput.
  - ConversationContext (src/contexts/ConversationContext.jsx): conversationHistory, addMessage, appendToLastMessage (supports streaming), clearConversation.
- Toolbar and Utilities (src/components/ToolBar.jsx + ToolbarIcons)
  - FileChooserIcon (src/components/ToolbarIcons/FileChooserIcon.jsx):
    - Upload a local file; detects language by extension and sets editor language and content.
  - FileDownloaderIcon (src/components/ToolbarIcons/FileDownloaderIcon.jsx):
    - Download current editor content as code.<extension> matching the selected language.
  - CodeRunnerIcon (src/components/ToolbarIcons/CodeRunnerIcon.jsx):
    - Run code by POSTing { code, language, input } to a /run endpoint. Updates OutputContext with result.
  - GeminiIcon (src/components/ToolbarIcons/GeminiIcon.jsx):
    - Toggles the AI chat panel with small button animations.
  - Tooltips and hover/active animation classes integrated via Tailwind/utility classes.
- AI Assistant (Gemini) Integration
  - Question input (src/components/Question.jsx):
    - Problem Statement (textarea), Custom Input (textarea tied to userInput used as stdin), and Ask Anything (prompt input).
    - Builds a context-aware prompt including the problem statement, user freeform query, user code, and prior conversation.
    - Streams Gemini responses using @google/generative-ai. Requires VITE_GEMINI_API_KEY.
    - Emits messages to ConversationContext: user question and a temporary "Thinking..." placeholder, then streams tokens into the assistant message using appendToLastMessage.
  - Chat UI (src/components/Chat.jsx):
    - Renders conversationHistory using two message components:
      - GeminiResponse (src/components/GeminiResponse.jsx): Markdown-It + KaTeX + Highlight.js rendering.
        - Code blocks add actions: copy to clipboard, and move code to editor (also auto-sets detected language if supported).
      - UserQuery (src/components/UserQuery.jsx): Renders user messages via react-markdown with GFM.
    - Auto-scrolls to latest message on open.
  - Outside click handling (src/utils/OutsideClick.jsx) closes the chat panel when clicking outside of it (ignoring the toggle button).
- Output Panel (src/components/Output.jsx)
  - Displays "Compilation Successful" or "Compilation Failed" based on OutputContext.isSuccessful.
  - Shows the raw output (stdout or error text) and auto-scrolls into view when opened.
  - Close button to hide the output panel.
- App Wiring (src/App.jsx + src/components/Home.jsx)
  - App.jsx composes providers: CodeProvider, ConversationProvider, OutputProvider.
  - Home.jsx lays out Question, Code, conditional Output, floating Chat panel with animations, and the ToolBar.
- Styling
  - Tailwind CSS v4, with custom CSS variables for colors.
  - Highlight.js theme for rendered AI code blocks.

Backend (Node.js + Express + Docker)
- Endpoint: POST /run (defined in backend/server.js)
  - Request JSON body: { code: string, language: string, input?: string }.
    - language accepts: "javascript", "python", "java", "c++" (case-sensitive on backend; frontend lowercases before sending).
    - input is optional and is piped to the executed program's stdin.
  - Execution via Docker:
    - JavaScript: node:18; writes script.js then node script.js.
    - Python: python (default tag); writes script.py then python script.py.
    - Java: openjdk; extracts class name from code (public class or first class), javac then java <ClassName>.
    - C++: gcc; writes main.cpp, compiles to main, executes ./main.
  - Mounts the backend process working directory into the container at /app using -v <absPath>:/app.
  - Returns:
    - 200 OK: plain text stdout.
    - 400 Bad Request: plain text stderr or a generic error message.
  - CORS enabled; JSON body parsing via body-parser.
  - Server listens on process.env.PORT or 8080.

Tech Stack
- Frontend: React 19, Vite 7, @monaco-editor/react, Tailwind CSS 4, react-markdown + remark-gfm, markdown-it + markdown-it-katex, highlight.js.
- Backend: Node.js, Express 5, body-parser, cors.
- AI: @google/generative-ai (Gemini 2.5 Pro model via generateContentStream).
- Runtime: Docker required on backend host (Docker Desktop on Windows/macOS or Docker Engine on Linux).

Project Structure
ai-coding-platform
- backend
  - server.js
  - package.json
- frontend
  - package.json
  - public
    - gemini.png (used by the Gemini toolbar icon)
  - src
    - App.jsx
    - components
      - Home.jsx
      - ToolBar.jsx
      - Code.jsx
      - Output.jsx
      - Question.jsx
      - Chat.jsx
      - GeminiResponse.jsx
      - UserQuery.jsx
      - ToolbarIcons
        - FileChooserIcon.jsx
        - FileDownloaderIcon.jsx
        - CodeRunnerIcon.jsx
        - GeminiIcon.jsx
    - constants
      - languages.js
    - contexts
      - CodeContext.jsx
      - OutputContext.jsx
      - ConversationContext.jsx
    - utils
      - OutsideClick.jsx

Getting Started
Prerequisites
- Node.js LTS (v18+ recommended)
- npm (bundled with Node)
- Docker installed and running (Docker Desktop on Windows/macOS)

Installation
1) Clone the repository
   git clone <your-repo-url>
   cd ai-coding-platform

2) Install dependencies
   cd backend
   npm install
   cd ..\frontend
   npm install

Environment Variables
- Frontend (Vite):
  - VITE_GEMINI_API_KEY: Your Google Generative AI API key.
    - Create frontend/.env and add:
      VITE_GEMINI_API_KEY=your_api_key_here

Running Locally (Frontend + Backend)
- Backend
  cd backend
  npm start
  # Runs on http://localhost:8080 by default

- Frontend
  cd ..\frontend
  npm run dev
  # Opens the app on http://localhost:5173 by default

Connecting Frontend to Local Backend
- By default, the run button in the frontend posts to a hosted endpoint:
  src/components/ToolbarIcons/CodeRunnerIcon.jsx
  const url = "https://docker-test-3-9cf4cc04b890.herokuapp.com/run";

- For local development, change it to your local server:
  const url = "http://localhost:8080/run";

Building for Production
- Frontend
  cd frontend
  npm run build
  # Output in frontend/dist
  # Serve dist/ with any static file server (e.g., Vite preview: npm run preview)

- Backend
  Deployed as a Node process. Ensure Docker is available on the host if you want to execute code there.
  PORT can be set via environment variable.

API Reference (Backend)
POST /run
- Description: Execute the provided code inside a Docker container for the selected language.
- Body (application/json):
  {
    "code": "string (required)",
    "language": "javascript | python | java | c++ (required)",
    "input": "string (optional, passed to stdin)"
  }
- Responses:
  - 200: text/plain stdout from the execution.
  - 400: text/plain stderr or error string (e.g., Unsupported language, Java class missing, compile errors).

Configuration Notes
- Supported languages and file extensions are defined in src/constants/languages.js.
- Uploading files uses the file extension to select the language; unsupported extensions are rejected in the UI.
- Java support requires a class to be present; if the class is public, its name is used for compilation and execution.
- The backend mounts its working directory into the Docker container (read/write). Ensure the backend user has appropriate permissions.

Troubleshooting
- Docker not found or not running
  - Ensure Docker Desktop/Engine is installed and running; the backend relies on the docker CLI.
- C++/Java/Python/Javascript program not running
  - Check that the selected language matches your code.
  - For Java, ensure your code contains a class (public class if possible) and the class name matches file/class requirements.
- 400 errors from /run
  - Compile/runtime errors in your code are returned as stderr; review the output panel for details.
- AI responses not working
  - Ensure VITE_GEMINI_API_KEY is set in frontend/.env and restart the dev server.
  - Network blocks to Google APIs may cause failures.
- Upload is not changing language
  - Ensure the file extension is one of: .py, .cpp, .java, .js
- Copy/Move-to-editor actions from AI response don’t work
  - Verify the language label in code block is a supported language name (as defined in languages.js). Otherwise, the move-to-editor action will log an unsupported language error.

License
- ISC License (as declared in package.json files).

<div align="center">

# 🤖 AI Coding Platform

### *An intelligent, full-stack web IDE with AI-powered assistance*

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Required-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**Write code. Run it. Get AI help. All in your browser.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📖 Overview

**AI Coding Platform** is a modern, browser-based integrated development environment (IDE) that combines the power of Monaco Editor with Google's Gemini AI. Write, execute, and debug code in multiple programming languages with real-time AI assistance—all without leaving your browser.

### What Makes It Special?

- 🎯 **Multi-Language Support**: Code in Python, C++, Java, and JavaScript
- 🚀 **Instant Execution**: Run code securely in isolated Docker containers
- 🤖 **AI-Powered Assistant**: Get intelligent coding help from Google Gemini AI
- 💻 **Professional Editor**: Monaco Editor (the editor that powers VS Code)
- 📊 **Rich Output**: See execution results with formatted stdout/stderr
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS

---

## ✨ Features

### 🖥️ **Advanced Code Editor**
- **Monaco Editor Integration**: Industry-standard code editing with IntelliSense
- **Multi-Language Support**: Python, C++, Java, JavaScript with syntax highlighting
- **File Operations**: Upload local files or download your work
- **Smart Language Detection**: Automatic language detection from file extensions
- **Customizable**: Word wrap, smooth scrolling, and dark theme support

### 🤖 **AI Assistant (Powered by Gemini)**
- **Conversational Interface**: Natural language interaction for coding help
- **Context-Aware**: AI understands your code and conversation history
- **Streaming Responses**: Real-time token streaming for fast feedback
- **Rich Formatting**: Markdown, KaTeX math rendering, and syntax-highlighted code blocks
- **Interactive Code Blocks**: Copy code snippets or insert directly into editor
- **Custom Input Support**: Provide custom stdin for testing your programs

### 🐳 **Secure Code Execution**
- **Docker-Isolated**: Each execution runs in a secure, isolated container
- **Multiple Runtimes**: 
  - **Python**: Python 3 with full standard library
  - **C++**: GCC compiler with C++17 support
  - **Java**: OpenJDK with automatic class detection
  - **JavaScript**: Node.js 18 runtime
- **Real-Time Output**: See stdout/stderr with success/failure status
- **Custom Input**: Provide stdin input for interactive programs

### 🎨 **Modern User Interface**
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Layout**: Clean, distraction-free coding environment
- **Floating Chat**: AI assistant panel that doesn't interrupt your workflow
- **Smart Panels**: Auto-scrolling output and conversation displays
- **Visual Feedback**: Status indicators, tooltips, and smooth animations

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI framework |
| Vite | 7.0.4 | Build tool & dev server |
| Monaco Editor | 4.7.0 | Code editor component |
| Tailwind CSS | 4.1.11 | Styling framework |
| Markdown-it | 14.1.0 | Markdown rendering |
| Highlight.js | 11.11.1 | Syntax highlighting |
| Google Generative AI | 0.24.1 | Gemini AI integration |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express | 5.1.0 | Web framework |
| Docker | Latest | Code execution isolation |
| CORS | 2.8.5 | Cross-origin support |

---

## 📁 Project Structure

```
AI-Coding-Platform/
├── frontend/
│   ├── public/
│   │   └── gemini.png              # AI assistant icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx            # Main layout component
│   │   │   ├── Code.jsx            # Monaco editor wrapper
│   │   │   ├── ToolBar.jsx         # Action toolbar
│   │   │   ├── Question.jsx        # AI input interface
│   │   │   ├── Chat.jsx            # Conversation display
│   │   │   ├── Output.jsx          # Code execution results
│   │   │   ├── GeminiResponse.jsx  # AI message renderer
│   │   │   ├── UserQuery.jsx       # User message renderer
│   │   │   └── ToolbarIcons/
│   │   │       ├── FileChooserIcon.jsx    # File upload
│   │   │       ├── FileDownloaderIcon.jsx # File download
│   │   │       ├── CodeRunnerIcon.jsx     # Code execution
│   │   │       └── GeminiIcon.jsx         # AI toggle
│   │   ├── contexts/
│   │   │   ├── CodeContext.jsx           # Code state management
│   │   │   ├── OutputContext.jsx         # Output state management
│   │   │   └── ConversationContext.jsx   # Chat state management
│   │   ├── constants/
│   │   │   └── languages.js              # Language definitions
│   │   ├── utils/
│   │   │   └── OutsideClick.jsx          # Click-away handler
│   │   ├── App.jsx                       # Root component
│   │   └── main.jsx                      # Entry point
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── server.js                   # Express server & Docker runner
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Docker** - [Download](https://www.docker.com/get-started)
  - Docker Desktop (Windows/macOS) or Docker Engine (Linux)
  - Ensure Docker is running before starting the backend
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LuckyBoy587/AI-Coding-Platform.git
   cd AI-Coding-Platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `frontend/` directory:
   ```bash
   # frontend/.env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Running Locally

#### Start the Backend Server
```bash
cd backend
npm start
```
The server will start on `http://localhost:8080`

#### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The app will open at `http://localhost:5173`

#### Configure Local Backend (Optional)

By default, the frontend uses a hosted backend. To use your local backend:

1. Open `frontend/src/components/ToolbarIcons/CodeRunnerIcon.jsx`
2. Change the URL:
   ```javascript
   // Change from:
   const url = "https://docker-test-3-9cf4cc04b890.herokuapp.com/run";
   
   // To:
   const url = "http://localhost:8080/run";
   ```

---

## 📚 Documentation

### Environment Variables

#### Frontend Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Yes | Your Google Generative AI API key for Gemini integration |

Create a `.env` file in the `frontend/` directory with your API key:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

#### Backend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 8080 | Port number for the Express server |

### Supported Languages

| Language | File Extension | Runtime | Compiler/Interpreter |
|----------|----------------|---------|---------------------|
| Python | `.py` | Python 3 | `python script.py` |
| C++ | `.cpp` | GCC | `g++ main.cpp -o main && ./main` |
| Java | `.java` | OpenJDK | `javac ClassName.java && java ClassName` |
| JavaScript | `.js` | Node.js 18 | `node script.js` |

### State Management

The application uses React Context for global state management:

#### CodeContext
Manages editor content and language selection:
- `code` - Current editor content
- `selectedLanguage` - Active programming language
- `userInput` - Custom stdin for code execution
- `updateCode()` - Update editor content
- `updateLanguage()` - Change language
- `clearCode()` - Clear editor

#### OutputContext
Manages code execution results:
- `output` - Execution output (stdout/stderr)
- `isSuccessful` - Execution status
- `showOutput` - Output panel visibility

#### ConversationContext
Manages AI chat history:
- `conversationHistory` - Array of messages
- `addMessage()` - Add new message
- `appendToLastMessage()` - Stream tokens to last message
- `clearConversation()` - Reset chat

---

## 🔌 API Reference

### POST `/run`

Execute code in a Docker container.

**Endpoint:** `POST http://localhost:8080/run`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "input": "optional stdin input"
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | Source code to execute |
| `language` | string | Yes | One of: `javascript`, `python`, `java`, `c++` |
| `input` | string | No | Input to provide to the program via stdin |

**Response:**

**Success (200 OK):**
```
Content-Type: text/plain

Hello, World!
```

**Error (400 Bad Request):**
```
Content-Type: text/plain

Error: [compilation or runtime error message]
```

**Example Usage:**

```javascript
// Using fetch
const response = await fetch('http://localhost:8080/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: 'console.log("Hello from Node.js!");',
    language: 'javascript',
    input: ''
  })
});

const output = await response.text();
console.log(output); // "Hello from Node.js!"
```

```bash
# Using curl
curl -X POST http://localhost:8080/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello from Python!\")",
    "language": "python"
  }'
```

---

## 🏗️ Building for Production

### Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`.

**Preview the production build:**
```bash
npm run preview
```

**Deploy:**
- Upload the `dist/` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- Or use the included GitHub Pages deployment script:
  ```bash
  npm run deploy
  ```

### Backend

The backend is deployed as a Node.js process. Ensure:
- Docker is installed and running on the host machine
- The `PORT` environment variable is set (if not using default 8080)
- CORS is configured for your frontend domain

**Example deployment on a VPS:**
```bash
# Install dependencies
cd backend
npm install --production

# Start with PM2 (recommended)
pm2 start server.js --name ai-coding-backend

# Or use a process manager of your choice
```

---

## 🎯 Usage Guide

### 1. Writing Code
- Select your language from the dropdown menu
- Start typing in the Monaco editor
- Use file upload to import existing code

### 2. Running Code
- Click the **Run** button in the toolbar
- Provide custom input if needed (in the AI panel)
- View results in the output panel

### 3. Using AI Assistant
- Click the **Gemini** icon to open the chat
- Ask questions about your code, debugging help, or algorithm explanations
- Use "Problem Statement" for specific coding challenges
- Click code blocks to copy or insert them into the editor

### 4. File Operations
- **Upload**: Click the folder icon and select a `.py`, `.cpp`, `.java`, or `.js` file
- **Download**: Click the download icon to save your current code

---

## 🔧 Configuration

### Language Configuration

Languages are defined in `frontend/src/constants/languages.js`:

```javascript
export const LANGUAGES = [
  {
    name: "Python",
    monacoId: "python",
    version: "3.x",
    fileExtension: ".py"
  },
  // ... more languages
];
```

### Editor Customization

Modify editor options in `frontend/src/components/Code.jsx`:

```javascript
<Editor
  theme="vs-dark"
  language={selectedLanguage}
  options={{
    wordWrap: "on",
    smoothScrolling: true,
    fontSize: 14,
    minimap: { enabled: true },
    // Add more options here
  }}
/>
```

---

## 🐛 Troubleshooting

### Common Issues

#### ❌ **Docker not found**
**Problem:** Backend can't find Docker
**Solution:** 
- Ensure Docker Desktop is installed and running
- Verify Docker is in your system PATH: `docker --version`

#### ❌ **Code execution fails**
**Problem:** Getting 400 errors when running code
**Solution:**
- Check that your code is syntactically correct
- For Java, ensure you have a `public class` matching the filename
- Review the error message in the output panel

#### ❌ **AI responses not working**
**Problem:** Gemini chat is not responding
**Solution:**
- Verify `VITE_GEMINI_API_KEY` is set in `frontend/.env`
- Restart the Vite dev server after adding the env variable
- Check your API key is valid and has quota remaining
- Ensure no network firewalls are blocking Google AI APIs

#### ❌ **File upload not working**
**Problem:** Uploaded file doesn't change the language
**Solution:**
- Ensure file has a supported extension (`.py`, `.cpp`, `.java`, `.js`)
- Check browser console for any error messages

#### ❌ **Port already in use**
**Problem:** `EADDRINUSE` error when starting servers
**Solution:**
- Backend: Change port with `PORT=3000 npm start`
- Frontend: Vite will auto-increment to 5174 if 5173 is taken

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🗺️ Roadmap

Check out our [Future Plans](frontend/FUTURE_PLANS.md) for upcoming features including:

- 🔄 Real-time collaboration
- 📱 Native mobile apps
- 🎨 Custom themes and layouts
- 🧪 Built-in testing framework
- 📊 Code analytics and insights
- 🔌 More language support (Rust, Go, TypeScript)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- **Monaco Editor** - The editor that powers VS Code
- **Google Gemini AI** - Advanced AI assistance
- **React Team** - Amazing UI framework
- **Vite** - Lightning-fast build tool
- **Docker** - Secure code execution
- **Tailwind CSS** - Beautiful styling made easy

---

## 📞 Support

Having issues? Need help?

- 📫 Open an issue on [GitHub Issues](https://github.com/LuckyBoy587/AI-Coding-Platform/issues)
- 💬 Start a discussion in [GitHub Discussions](https://github.com/LuckyBoy587/AI-Coding-Platform/discussions)
- ⭐ Star this repo if you find it useful!

---

<div align="center">

**Made with ❤️ for developers who love to code**

[⬆ Back to Top](#-ai-coding-platform)

</div>

import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash`;
const GENERATE_URL = `${BASE}:generateContent?key=${API_KEY}`;
const STREAM_URL = `${BASE}:streamGenerateContent?key=${API_KEY}`;

const sendRequestWithContext = async (problemStatement, code, query, context) => {
  // 1. Format conversation history
  const formattedContext = context.map(msg => ({
    role: msg.sender === "assistant" ? "model" : "user",
    parts: [{text: msg.message}]
  }));

  // 2. Build the latest user message
  const userMsg = {
    role: 'user',
    parts: [{
      text: `
          You are an expert in Data Structures and Algorithms.
          Problem Statement: ${problemStatement}
          User Query: ${query}
          User Code Snippet: ${code}
          Please provide a clear, step-by-step solution or explanation tailored to this scenario.
        `.trim()
    }]
  };

  // 3. Compose the request body
  const body = {
    contents: [
      ...formattedContext,
      userMsg
    ]
  };

  try {
    const response = await axios.post(GENERATE_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        // add authorization header if needed!
      }
    });
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
};

async function* streamGeminiResponse(problemStatement, code, query, context) {
  const formattedContext = context.map(msg => ({
    role: msg.sender === "assistant" ? "model" : "user",
    parts: [{text: msg.message}]
  }));

  const userMsg = {
    role: 'user',
    parts: [{
      text: `
        You are an expert in Data Structures and Algorithms.
        Problem Statement: ${problemStatement}
        User Query: ${query}
        User Code Snippet: ${code}
        Please provide a clear, step-by-step solution or explanation tailored to this scenario.
      `.trim()
    }]
  };

  const body = {
    contents: [
      ...formattedContext,
      userMsg
    ]
  };

  // ADD: X-Content-Type: 'text/event-stream' if required by Gemini API
  const response = await fetch(STREAM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer xx`,
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(body)
  });

  const decoder = new TextDecoder();

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  let buffer = "";

  while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, {stream: true});

    // Try to flush out full lines/events (assuming SSE or newline split)
    let parts = buffer.split("\n\n"); // double newlines are usually SSE delimiter
    for (let i = 0; i < parts.length - 1; i++) {
      const line = parts[i].trim();
      if (!line) continue;
      try {
        let data;
        if (line.startsWith('data:')) {
          // SSE format: `data: {...}`
          data = JSON.parse(line.replace(/^data:\s*/, ''));
        } else {
          // Plain JSON
          data = JSON.parse(line);
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) yield text;
      } catch (err) {
        console.error('Error parsing line:', line, err);
      }
    }
    buffer = parts[parts.length - 1];
  }
}


export {sendRequestWithContext, streamGeminiResponse};

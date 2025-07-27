import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const sendRequest = async (query) => {
  const body = {
    contents: [
      {
        parts: [
          {
            text: query
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
};

export { sendRequest };

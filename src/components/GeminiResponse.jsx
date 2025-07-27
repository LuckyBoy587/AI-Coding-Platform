import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const GeminiResponse = ({ text }) => (
  <div className="prose prose-base dark:prose-invert max-w-none">
    <Markdown remarkPlugins={[remarkGfm]}>
      {text}
    </Markdown>
  </div>
);

export default GeminiResponse;
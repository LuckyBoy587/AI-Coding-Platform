import { Editor } from "@monaco-editor/react";
import { LANGUAGES } from "../constants/languages.js";
import { useCode } from "../contexts/CodeContext.jsx";

const Code = () => {
  const { code, selectedLanguage, updateCode, updateLanguage } = useCode();

  const handleEditorDidMount = (editor) => {
    editor.onDidChangeModelContent(() => {
      const newCode = editor.getValue();
      updateCode(newCode);
    });
  };

  const handleLanguageChange = (e) => {
    updateLanguage(e.target.value);
  };

  // Always resolve monacoId from the selected language
  const currentLang = LANGUAGES.find(lang => lang.name === selectedLanguage);
  const monacoLangId = currentLang ? currentLang.monacoId : "plaintext";

  return (
    <div
      style={{height: "calc(100vh - 24px)"}}
      className="max-w-full bg-[var(--color-bg-secondary)] rounded-xl p-6 shadow-lg transition-colors duration-300 min-w-0 h-full">
      <div className="flex flex-col h-full w-full min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Code Editor</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="language-select" className="text-sm text-[var(--color-text-secondary)]">
              Language:
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-user-border)] rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200 shadow-md hover:border-[var(--color-accent)] focus:border-[var(--color-accent)] appearance-none relative cursor-pointer"
            >
              {LANGUAGES.map((lang, index) => (
                <option
                  key={index}
                  value={lang.name}
                  className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]"
                >
                  {lang.name} {lang.version && `(${lang.version})`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{zIndex: 0}}
          className="flex-1 min-h-0 w-full">
          <Editor
            language={monacoLangId}
            theme="vs-dark"
            value={code}
            onMount={handleEditorDidMount}
            options={{
              wordWrap: "on",
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Code;

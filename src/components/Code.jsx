import {Editor} from "@monaco-editor/react";
import {LANGUAGES} from "../constants/languages.js";
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

  return (
    <div className="max-w-full bg-[var(--color-bg-secondary)] rounded-xl p-6 shadow-lg h-full transition-colors duration-300 min-w-0">
      <div className={"flex flex-col h-full w-full min-w-0"}>
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
              className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-text-secondary)] rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-text-secondary)] transition-all duration-200 shadow-md hover:border-[var(--color-user-border)] focus:border-[var(--color-user-border)] appearance-none relative cursor-pointer"
            >
              {Array.from(LANGUAGES.entries()).map(([key, lang]) => (
                <option key={key} value={key} className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
                  {lang.name} {lang.version && `(${lang.version})`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1 min-h-0 w-full">
          <Editor
            defaultLanguage={LANGUAGES.get(selectedLanguage)?.monacoId || selectedLanguage}
            language={LANGUAGES.get(selectedLanguage)?.monacoId || selectedLanguage}
            theme={"vs-dark"}
            value={code}
            onMount={handleEditorDidMount}
            options={{
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: 'on',
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
  )
}

export default Code
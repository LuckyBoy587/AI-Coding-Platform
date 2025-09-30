import placeholder from "./placeholder-code.json"

export const LANGUAGES = [
  {name: "python", monacoId: "python", version: "3.10", fileExtension: "py"},
  {name: "c++", monacoId: "cpp", version: "17", fileExtension: "cpp"},
  {name: "java", monacoId: "java", version: "17", fileExtension: "java"},
  {name: "javascript", monacoId: "javascript", version: "ES6", fileExtension: "js"},
];

export const hasLanguageByName = (name) => LANGUAGES.some(language => language.name.toLowerCase() === name.toLowerCase());

export const hasLanguageByExtension = (extension) => LANGUAGES.some(language => language.fileExtension === extension);

export const findLanguageByExtension = (extension) => LANGUAGES.find(language => language.fileExtension === extension);

export const findExtensionByLanguage = (language) => LANGUAGES.find(lang => lang.name === language).fileExtension;

export const findPlaceholderByLanguage = (language) => placeholder[language.toLowerCase()];

export const DEFAULT_LANGUAGE = "java";

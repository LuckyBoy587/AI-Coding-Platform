export const LANGUAGES = [
  {name: "Python", monacoId: "python", version: "3.10", fileExtension: "py"},
  {name: "C++", monacoId: "cpp", version: "17", fileExtension: "cpp"},
  {name: "Java", monacoId: "java", version: "17", fileExtension: "java"},
  {name: "JavaScript", monacoId: "javascript", version: "ES6", fileExtension: "js"},
];

export const hasLanguageByName = (name) => LANGUAGES.some(language => language.name.toLowerCase() === name.toLowerCase());

export const hasLanguageByExtension = (extension) => LANGUAGES.some(language => language.fileExtension === extension);

export const findLanguageByExtension = (extension) => LANGUAGES.find(language => language.fileExtension === extension);

export const findExtensionByLanguage = (language) => LANGUAGES.find(lang => lang.name === language).fileExtension;

export const DEFAULT_LANGUAGE = "Java";

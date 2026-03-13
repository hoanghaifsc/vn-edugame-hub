/**
 * useLang.jsx — Language context
 * Lưu ngôn ngữ vào localStorage để nhớ qua reload.
 */
import { createContext, useContext, useState, useCallback } from 'react';
import { translate, LANGUAGES } from '../i18n/translations';

const LangContext = createContext(null);

const STORAGE_KEY = 'edugame_lang';

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'en'
  );

  const setLang = useCallback((code) => {
    setLangState(code);
    localStorage.setItem(STORAGE_KEY, code);
    // Cập nhật thuộc tính lang của <html>
    document.documentElement.lang = code;
  }, []);

  const t = (key, vars) => translate(key, lang, vars);

  return (
    <LangContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

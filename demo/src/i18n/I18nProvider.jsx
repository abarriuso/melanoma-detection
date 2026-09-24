import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext, LANG_KEY, detectLang, translator } from './context';

export default function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      // almacenamiento no disponible: la elección dura lo que la pestaña
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: translator(lang) }), [lang, setLang]);

  // <html lang> y el título siguen al idioma elegido (lectores de pantalla,
  // traductores del navegador y pestaña).
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = value.t('docTitle');
  }, [lang, value]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

import { createContext, useContext } from 'react';
import { STRINGS } from '../lib/strings';

export const LANGS = ['en', 'es'];
export const LANG_KEY = 'lang';

// Idioma inicial: ?lang= (enlaces compartidos) > elección guardada >
// idioma del navegador (español si empieza por "es"; si no, inglés).
export function detectLang() {
  try {
    const asked = new URLSearchParams(window.location.search).get('lang');
    if (LANGS.includes(asked)) return asked;
    const saved = window.localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    // almacenamiento bloqueado: se decide por el navegador
  }
  return /^es\b/i.test(window.navigator.language || '') ? 'es' : 'en';
}

// t(clave, ...args): cadena o función del diccionario del idioma, con el
// inglés como respaldo si faltara una clave.
export function translator(lang) {
  const dict = STRINGS[lang] ?? STRINGS.en;
  return (key, ...args) => {
    const entry = dict[key] ?? STRINGS.en[key] ?? key;
    return typeof entry === 'function' ? entry(...args) : entry;
  };
}

// Valor por defecto (inglés) para componentes renderizados sin proveedor,
// como en los tests unitarios de un componente suelto.
export const I18nContext = createContext({ lang: 'en', setLang: () => {}, t: translator('en') });

export const useI18n = () => useContext(I18nContext);

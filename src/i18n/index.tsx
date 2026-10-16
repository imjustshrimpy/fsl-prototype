import React, { createContext, useContext, useState, useEffect } from 'react';
import { enPH } from './en-PH';
import { filPH } from './fil-PH';
import { Locale } from '../types';

type TranslationDictionary = typeof enPH;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
}

const dictionaries: Record<Locale, TranslationDictionary> = {
  'en-PH': enPH,
  'fil-PH': filPH,
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('talinturo.locale');
      if (saved === 'fil-PH' || saved === 'en-PH') return saved;
    } catch (e) {}
    return 'en-PH';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('talinturo.locale', newLocale);
      document.documentElement.lang = newLocale === 'fil-PH' ? 'fil' : 'en';
    } catch (e) {}
  };

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const dict = dictionaries[locale] || enPH;
    const parts = keyPath.split('.');
    let cur: any = dict;

    for (const part of parts) {
      if (cur && typeof cur === 'object' && part in cur) {
        cur = cur[part];
      } else {
        // Fallback to English
        let fallbackCur: any = enPH;
        for (const fbPart of parts) {
          if (fallbackCur && typeof fallbackCur === 'object' && fbPart in fallbackCur) {
            fallbackCur = fallbackCur[fbPart];
          } else {
            return keyPath;
          }
        }
        cur = fallbackCur;
        break;
      }
    }

    if (typeof cur !== 'string') {
      return keyPath;
    }

    let result = cur;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return result;
  };

  useEffect(() => {
    document.documentElement.lang = locale === 'fil-PH' ? 'fil' : 'en';
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}


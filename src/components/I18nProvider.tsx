'use client';

import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import translations from '../../platform_translations.json'; // adjust path if needed

i18next.use(initReactI18next).init({
  resources: {
    de: {
      translation: translations,
    },
    // Add other languages here when available
  },
  lng: 'de',
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false, // React already safe from xss
  },
});

export default function I18nProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    i18next.changeLanguage(locale).then(() => {
      setIsReady(true);
    });
  }, [locale]);

  // Optionally, you can just render children immediately since we initialized synchronously above
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

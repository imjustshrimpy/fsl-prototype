import React from 'react';
import ReactDOM from 'react-dom/client';
import { AgeModeProvider } from './context/AgeModeContext';
import { I18nProvider } from './i18n';
import { AppContent } from './App';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nProvider>
      <AgeModeProvider>
        <AppContent />
      </AgeModeProvider>
    </I18nProvider>
  </React.StrictMode>
);


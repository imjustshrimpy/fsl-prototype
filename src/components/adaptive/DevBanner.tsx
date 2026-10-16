import React from 'react';
import { useTranslation } from '../../i18n';
import { AlertTriangle } from 'lucide-react';

export const DevBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      role="note"
      className="bg-brand-yellow text-on-brand-yellow px-4 py-2 text-caption-adaptive font-bold flex items-center justify-center gap-2 border-b border-adaptive"
    >
      <AlertTriangle className="w-4 h-4 text-brand-orange shrink-0" aria-hidden="true" />
      <span className="text-center">{t('app.devBanner')}</span>
    </div>
  );
};


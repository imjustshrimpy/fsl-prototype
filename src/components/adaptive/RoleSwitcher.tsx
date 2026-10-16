import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { UserRole } from '../../types';
import { GraduationCap, Users, User } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useAgeMode();
  const { t } = useTranslation();

  const roles: Array<{ id: UserRole; label: string; icon: React.ReactNode }> = [
    { id: 'learner', label: 'Learner', icon: <User className="w-3.5 h-3.5" aria-hidden="true" /> },
    { id: 'educator', label: 'Educator', icon: <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" /> },
    { id: 'family', label: 'Family', icon: <Users className="w-3.5 h-3.5" aria-hidden="true" /> },
  ];

  return (
    <div className="flex items-center gap-1 bg-surface-card p-1 rounded-pill border-adaptive shadow-low">
      {roles.map((r) => {
        const isActive = role === r.id;
        return (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            aria-pressed={isActive}
            aria-label={`Role: ${r.label}`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-pill text-caption-adaptive font-bold transition cursor-pointer ${
              isActive
                ? 'bg-brand-blue text-on-brand-blue shadow-low'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {r.icon}
            <span>{r.label}</span>
          </button>
        );
      })}
    </div>
  );
};


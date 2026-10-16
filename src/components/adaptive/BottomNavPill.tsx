import React from 'react';
import { motion } from 'framer-motion';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { withFeedback } from '../../lib/feedback';
import {
  Home,
  Play,
  MessageSquare,
  Video,
  BarChart3,
  Settings,
  Star,
  User,
} from 'lucide-react';

export const BottomNavPill: React.FC = () => {
  const { navItems, activeTab, setActiveTab, isKids, accessibility } = useAgeMode();
  const { t } = useTranslation();

  const getIcon = (name: string) => {
    const iconProps = { className: isKids ? 'w-6 h-6' : 'w-5 h-5', 'aria-hidden': true };
    switch (name) {
      case 'home':
        return <Home {...iconProps} />;
      case 'play':
        return <Play {...iconProps} />;
      case 'message-square':
        return <MessageSquare {...iconProps} />;
      case 'video':
        return <Video {...iconProps} />;
      case 'bar-chart':
        return <BarChart3 {...iconProps} />;
      case 'settings':
        return <Settings {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'user':
        return <User {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-3 pointer-events-none flex justify-center"
    >
      <div className="w-full max-w-lg bg-surface-card border-adaptive rounded-pill shadow-lg p-1.5 flex items-center justify-around pointer-events-auto backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                withFeedback(
                  () => setActiveTab(item.id),
                  'click',
                  accessibility.hapticsEnabled,
                  accessibility.optionalSoundEffects
                )();
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex-1 min-h-nav-item flex flex-col items-center justify-center gap-0.5 rounded-pill transition-colors cursor-pointer focus-ring-adaptive z-10 px-2 ${
                isActive
                  ? isKids
                    ? 'text-on-brand-yellow font-bold'
                    : 'text-on-brand-blue font-bold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {/* Sliding active pill indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className={`absolute inset-0 rounded-pill -z-10 shadow-sm ${
                    isKids ? 'bg-brand-yellow' : 'bg-brand-blue'
                  }`}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {getIcon(item.iconName)}
              <span className="text-caption-adaptive tracking-tight truncate max-w-full">
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

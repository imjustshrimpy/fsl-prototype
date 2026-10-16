import { Transition, TargetAndTransition } from 'framer-motion';

export const kidsSpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 15,
};

export const adultTransition: Transition = {
  type: 'tween',
  duration: 0.18,
  ease: 'easeOut',
};

export const reducedMotionTransition: Transition = {
  type: 'tween',
  duration: 0.15,
  ease: 'linear',
};

export const kidsFloatingLoop: TargetAndTransition = {
  y: [0, -6, 0],
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const adultHoverLift = {
  y: -2,
  transition: adultTransition,
};

export const kidsPressScale = {
  scale: 0.96,
  transition: kidsSpring,
};

export const staggerContainer = (staggerDelay = 0.06) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};


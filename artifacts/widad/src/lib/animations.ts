import { Variants } from 'framer-motion';

// Easing Curves
export const customEase = [0.25, 0.1, 0.25, 1] as const;
export const springEase = { type: "spring", bounce: 0.2, duration: 0.8 };

// Page transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: customEase, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.4, ease: customEase } }
};

// Item stagger for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: customEase } }
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: 'blur(5px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: customEase } }
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: 'blur(5px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: customEase } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: customEase } }
};

export const textSplitVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: customEase }
  })
};

// 3D Tilt or magnetic constraints
export const cardHover: Variants = {
  rest: { scale: 1, y: 0, boxShadow: 'var(--shadow-soft)' },
  hover: { scale: 1.02, y: -5, boxShadow: 'var(--shadow-glow)', transition: { duration: 0.3, ease: customEase } }
};

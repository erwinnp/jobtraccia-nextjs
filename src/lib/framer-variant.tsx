export const FADE_DOWN_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export const FADE_LEFT_VARIANTS = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' } },
};

export const BLUR_VARIANTS = {
  hidden: { filter: 'blur(10px)', opacity: 0 },
  show: { filter: 'blur(0px)', opacity: 1 },
};

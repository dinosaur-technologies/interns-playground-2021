export const jitter = (ms: number) => {
  const delay = ms + Math.random() * 1000;
  return Math.floor(delay);
};

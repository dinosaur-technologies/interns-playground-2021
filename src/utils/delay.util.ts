export const delay = (fn: () => void, ms = 1_000) => {
  if (ms < 1_000) {
    throw new Error('Delay cannot be lower than 1000ms');
  }

  if (typeof fn !== 'function') {
    throw new Error('Invalid function given');
  }

  const jitter = ms + Math.random() * 1_000;

  setTimeout(() => {
    fn();
  }, jitter);
};

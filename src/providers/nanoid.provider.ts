import { customAlphabet } from 'nanoid';

const AVAILABLE = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const generateID = (length = 21): string => {
  return customAlphabet(AVAILABLE, length)();
};

export const generateAccessToken = (length = 128): string => {
  return customAlphabet(AVAILABLE, length)();
};

export const generateOTP = (length = 6): string => {
  return customAlphabet('1234567890', length)();
};

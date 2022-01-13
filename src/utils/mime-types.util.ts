import mime from 'mime-types';

export const typeToExtension = (type: string) => {
  return mime.extension(type);
};

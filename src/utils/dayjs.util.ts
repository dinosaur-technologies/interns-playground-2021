import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayjsDuration from 'dayjs/plugin/duration';

Dayjs.extend(utc);
Dayjs.extend(dayjsDuration);

export const dayjs = Dayjs;

const KEYS = ['createdAt', 'updatedAt'];

export const formatTime = (json: any) => {
  for (const key in json) {
    if (KEYS.includes(key)) {
      json[key] = dayjs(json[key]).utc().format();
    }
  }
  return json;
};

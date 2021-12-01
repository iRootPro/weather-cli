import { padStartZero } from './padStartZero.js';

export const getCurrentDate = () => {
  const date = new Date();
  return `${padStartZero(date.getDate())}.${padStartZero(
    date.getMonth() + 1,
  )}.${padStartZero(date.getFullYear())}`;
};

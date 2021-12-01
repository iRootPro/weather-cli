import { padStartZero } from './padStartZero.js';

export const convertTimeStamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${padStartZero(date.getHours())}:${padStartZero(date.getMinutes())}`;
};

export const convertTimeStampDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${padStartZero(date.getDate())}.${padStartZero(
    date.getMonth(),
  )}.${padStartZero(date.getFullYear())}`;
};

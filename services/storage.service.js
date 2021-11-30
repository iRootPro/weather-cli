import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
const filePath = join(homedir(), '.weather.json');

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveKeyValue = async (key, value) => {
  let data = { [key]: value };
  if (await isExist(filePath)) {
    const rawData = await promises.readFile(filePath);
    data = { ...JSON.parse(rawData.toString()), ...data };
  }

  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeysValues = async () => {
  const data = await promises.readFile(filePath);
  return JSON.parse(data.toString());
};

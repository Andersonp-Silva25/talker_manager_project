const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const readTalkerManager = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllData = async () => {
  const talkerManager = await readTalkerManager();
  return talkerManager;
};

module.exports = { getAllData };
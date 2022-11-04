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

const getDataId = async (id) => {
  const talkerManager = await readTalkerManager();
  return talkerManager.filter((talker) => talker.id === id);
};

module.exports = { getAllData, getDataId };
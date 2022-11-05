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

const writeTalkerManager = async (talkerManager) => {
  try {
    const file = await fs.writeFile(join(__dirname, path), JSON.stringify(talkerManager));
    return file;
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

const createTalkerManager = async (talkerRequest) => {
  const talkerManager = await readTalkerManager();
  const newTalker = {
    id: talkerManager.length + 1,
    ...talkerRequest,
  };

  talkerManager.push(newTalker);
  await writeTalkerManager(talkerManager);

  return newTalker;
};

module.exports = { getAllData, getDataId, createTalkerManager };
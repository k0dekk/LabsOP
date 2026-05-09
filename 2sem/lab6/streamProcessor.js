const fs       = require('fs');
const readline = require('readline');

async function* readTeamConfigs(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line.trim()) {
      yield JSON.parse(line);
    }
  }
}

async function computeDatasetStats(filePath) {
  let totalRecords = 0;
  const uniqueNames  = new Set();
  const perTeamSlot  = [0, 0, 0, 0, 0, 0];
  const perColor     = {};
  let longestName    = '';

  for await (const config of readTeamConfigs(filePath)) {
    totalRecords++;
    uniqueNames.add(config.name);
    perTeamSlot[config.teamIndex]++;
    perColor[config.color.name] = (perColor[config.color.name] ?? 0) + 1;
    if (config.name.length > longestName.length) longestName = config.name;
  }

  const topNamesByLength = [...uniqueNames]
    .map(name => ({ name, length: name.length }))
    .sort((a, b) => b.length - a.length)
    .slice(0, 5);

  return { totalRecords, uniqueNames: uniqueNames.size, perTeamSlot, perColor, topNamesByLength, longestName };
}


async function findConfigsForSlot(filePath, teamIndex, colorName, limit = 10) {
  const results = [];

  for await (const config of readTeamConfigs(filePath)) {
    if (config.teamIndex === teamIndex && config.color.name === colorName) {
      results.push(config);
      if (results.length >= limit) break;
    }
  }

  return results;
}

async function processInChunks(filePath, chunkSize, onChunk) {
  let chunk      = [];
  let chunkIndex = 0;

  for await (const config of readTeamConfigs(filePath)) {
    chunk.push(config);

    if (chunk.length >= chunkSize) {
      onChunk(chunk, chunkIndex++);
      chunk = []; 
    }
  }

  if (chunk.length > 0) onChunk(chunk, chunkIndex);
}

module.exports = { readTeamConfigs, computeDatasetStats, findConfigsForSlot, processInChunks };
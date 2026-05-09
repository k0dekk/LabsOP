const path = require('path');
const fs   = require('fs');

const { generateTeamDataset }                                      = require('./generator');
const { computeDatasetStats, findConfigsForSlot, processInChunks } = require('./streamProcessor');
const { filterByTeamSlot, filterByInitialLetter }                  = require('./transformPipeline');
const { ADJECTIVES } = require('./data/adjectives');
const { NOUNS }      = require('./data/nouns');
const { COLORS }     = require('./data/colors');

const DATASET_PATH   = path.join(__dirname, '..', 'output', 'team_configs.jsonl');
const FILTERED_SLOT  = path.join(__dirname, '..', 'output', 'slot_0.jsonl');
const FILTERED_ALPHA = path.join(__dirname, '..', 'output', 'starts_with_A.jsonl');

const mb      = bytes => (bytes / 1_000_000).toFixed(2) + ' MB';
const heapMB  = ()    => (process.memoryUsage().heapUsed / 1_000_000).toFixed(1) + ' MB';

async function main() {
  fs.mkdirSync(path.dirname(DATASET_PATH), { recursive: true });  
  console.log('Starting Lab 6...');

  console.log('Generating dataset...');
  const t0 = Date.now();
  await generateTeamDataset(DATASET_PATH);
  console.log(`Time: ${((Date.now() - t0) / 1000).toFixed(1)}s, Heap: ${heapMB()}`);

  console.log('\nSTATISTICS:');
  const stats = await computeDatasetStats(DATASET_PATH);
  console.log('Total records:', stats.totalRecords);
  console.log('Unique names:', stats.uniqueNames);
  console.log('Longest name:', stats.longestName);

  console.log('\nTop 5 longest names:');
  const matches = await findConfigsForSlot(DATASET_PATH, 0, 'Gold', 5);
  console.log('Found matches:', matches.length);

  console.log('\nProcessing in chunks:');
  await processInChunks(DATASET_PATH, 10000, (chunk, idx) => {
    if (idx === 0) console.log(`Processed first chunk of ${chunk.length} items`);
  });

  console.log('\nRunning transform pipelines...');
  await filterByTeamSlot(DATASET_PATH, FILTERED_SLOT, 0);
  await filterByInitialLetter(DATASET_PATH, FILTERED_ALPHA, 'A');
  console.log('Pipelines finished!');
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
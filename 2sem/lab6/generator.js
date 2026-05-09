const fs   = require('fs');
const { ADJECTIVES } = require('./data/adjectives');
const { NOUNS }      = require('./data/nouns');
const { COLORS }     = require('./data/colors');

const TEAM_SLOTS = 6;

function* allTeamConfigs() {
  for (const adjective of ADJECTIVES) {
    for (const noun of NOUNS) {
      for (let teamIndex = 0; teamIndex < TEAM_SLOTS; teamIndex++) {
        for (const color of COLORS) {
          yield {
            adjective,
            noun,
            name: `${adjective} ${noun}`,
            teamIndex,
            color,
            id: `${adjective}_${noun}_${teamIndex}_${color.name}`,
          };
        }
      }
    }
  }
}

function generateTeamDataset(outputPath) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });
    const generator   = allTeamConfigs();
    let totalWritten  = 0;

    writeStream.on('error', reject);
    writeStream.on('finish', () => {
      console.log(`Written ${totalWritten.toLocaleString()} records`);
      resolve();
    });

    function writeNext() {
      let canContinue = true;

      while (canContinue) {
        const { value, done } = generator.next();

        if (done) {
          writeStream.end();
          return;
        }

        totalWritten++;
        canContinue = writeStream.write(JSON.stringify(value) + '\n');
      }

      writeStream.once('drain', writeNext);
    }

    writeNext();
  });
}

module.exports = { generateTeamDataset };
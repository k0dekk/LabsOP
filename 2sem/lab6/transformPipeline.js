const fs              = require('fs');
const { Transform, pipeline } = require('stream');
const { promisify }   = require('util');

const pipelineAsync = promisify(pipeline);

class TeamConfigFilter extends Transform {
  constructor(predicate) {
    super(); 
    this.predicate  = predicate;
    this.kept       = 0;
    this.total      = 0;
  }

  _transform(chunk, _encoding, callback) {
    const lines = chunk.toString('utf-8').split('\n');

    for (const line of lines) {
      if (!line.trim()) continue;
      this.total++;
      try {
        const config = JSON.parse(line);
        if (this.predicate(config)) {
          this.kept++;
          this.push(line + '\n');
        }
      } catch {
      }
    }

    callback();
  }
}

async function filterByTeamSlot(inputPath, outputPath, teamIndex) {
  const filter = new TeamConfigFilter(c => c.teamIndex === teamIndex);
  await pipelineAsync(
    fs.createReadStream(inputPath),
    filter,
    fs.createWriteStream(outputPath),
  );
  return { kept: filter.kept, total: filter.total };
}

async function filterByInitialLetter(inputPath, outputPath, letter) {
  const filter = new TeamConfigFilter(
    c => c.adjective.startsWith(letter.toUpperCase()),
  );
  await pipelineAsync(
    fs.createReadStream(inputPath),
    filter,
    fs.createWriteStream(outputPath),
  );
  return { kept: filter.kept, total: filter.total };
}

module.exports = { TeamConfigFilter, filterByTeamSlot, filterByInitialLetter };
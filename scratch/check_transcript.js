const fs = require('fs');
const path = 'C:\\Users\\d7610\\.gemini\\antigravity-ide\\brain\\5ede9cb3-cfbb-45b6-9310-b0e725c22f61\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf8').trim().split('\n');
lines.forEach((l, i) => {
  if (l.includes('2026-09-13T11:38:22')) {
    const obj = JSON.parse(l);
    console.log('Found on line', i, 'Type:', obj.type, 'Source:', obj.source, 'Keys:', Object.keys(obj));
    if (obj.content) {
      fs.writeFileSync('scratch/fresh_input_' + i + '.txt', obj.content);
    }
  }
});

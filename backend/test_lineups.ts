
import { getHardcodedLineup } from './utils/realLineups.js';
import fs from 'fs';

const testNames = [
  "Manchester City",
  "Manchester City FC",
  "Man City",
  "Arsenal",
  "Arsenal FC",
  "Liverpool FC",
  "Real Madrid",
  "Real Madrid CF",
  "FC Barcelona",
  "Barca",
  "Unknown Team FC"
];

let output = "--- Testing Lineup Matching ---\n";

testNames.forEach(name => {
  const result = getHardcodedLineup(name);
  output += `'${name}' -> ${result ? 'FOUND' : 'MISSING'}\n`;
});

fs.writeFileSync('backend/test_output.txt', output);
console.log("Test finished. Check backend/test_output.txt");

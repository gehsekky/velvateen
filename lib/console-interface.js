const readline = require('readline');

const consoleInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

module.exports = consoleInterface;
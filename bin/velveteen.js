#!/usr/bin/env node
'use strict';

const readline = require('readline');
const packageJson = require('../package.json');
const listExchanges = require('../lib/list-exchanges');
const listQueues = require('../lib/list-queues');
const showMessages = require('../lib/show-messages');



function getMenu() {
  let menu = '\nPlease choose from the following:\n\n';
  menu += '1) list exchanges\n';
  menu += '2) list queues\n';
  menu += '3) show messages in queue\n';
  menu += '4) exit\n\n';

  return menu;
}

const menuLoop = () => {
  const consoleInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  consoleInterface.question(getMenu(), answer => {
    return Promise.resolve()
    .then(() => {
      switch(answer) {
        case '1':
          return listExchanges();
          break;
        case '2':
          return listQueues();
          break;
        case '3':
          return showMessages();
          break;
        case '4':
          consoleInterface.close();
          process.exit();
          break;
      }
    })
    .then(() => {
      menuLoop();
    })
  });
};

// start app
console.log(`Welcome to Velveteen v${packageJson.version}`);
menuLoop();
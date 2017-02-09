#!/usr/bin/env node
'use strict';

const readline = require('readline');
const packageJson = require('../package.json');
const getExchanges = require('../lib/get-exchanges');
const getQueues = require('../lib/get-queues');
const showMessages = require('../lib/show-messages');

///////////////////////////////////////////////////////////////////////////////
// utility methods
///////////////////////////////////////////////////////////////////////////////

/**
 * print out a list of the rabbitmq exchanges on server
 */
function listExchanges() {
  return getExchanges()
  .then(exchanges => {
    for (const exchange of exchanges) {
      console.log(exchange.name);
    }
  })
}

/**
 * print out a list of the rabbitmq queues on server
 */
function listQueues() {
  return getQueues()
  .then(queues => {
    for (const queue of queues) {
      console.log(queue.name);
    }
  })
}

///////////////////////////////////////////////////////////////////////////////
// script methods
///////////////////////////////////////////////////////////////////////////////
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
        case '2':
          return listQueues();
        case '3':
          return showMessages();
        case '4':
          consoleInterface.close();
          process.exit();
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
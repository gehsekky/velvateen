const readline = require('readline');
const getQueues = require('./get-queues');
const getMessages = require('./get-messages');

function queueMenu(queues) {
  let menu = '\nSelect a queue to read messages from:\n\n';
  for (let i = 0; i < queues.length; i++) {
    menu += `${i + 1}) ${queues[i].name}\n`;

    if (i === queues.length - 1) {
      menu += `${i + 2}) back to main menu\n\n`;
    }
  }

  return menu;
}

function showQueueMenu(queues) {
  return new Promise(resolve => {
    const consoleQueueInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    consoleQueueInterface.question(queueMenu(queues), answer => {
      if (answer === (queues.length + 1).toString()) {
        consoleQueueInterface.close();
        resolve();
      } else {
        resolve(getMessages(queues[parseInt(answer)].name));
      }
    });
  });
}

function messagesMenu() {

}

module.exports = () => {
  return getQueues()
  .then(queues => {
    return showQueueMenu(queues);
  })
  .then(messages => {
    console.log('messages', messages);
  })
  .catch(err => {
    console.error(err);
  })
};
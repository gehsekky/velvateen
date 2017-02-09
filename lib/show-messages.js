const config = require('config');
const readline = require('readline');
const rabbitManagementApi = require('./rabbit-management-api');

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

module.exports = () => {
  const consoleQueueInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return rabbitManagementApi({
    path: '/api/queues',
    method: 'GET'
  })
  .then(response => {
    if (response.status.code !== 200) {
      console.log("The server encountered an error");
    }

    if (!response.entity || response.entity.length === 0) {
      console.log("No queues found");
    }

    let queues = response.entity;
    if (config.get('filter-default-queues')) {
      queues = queues.filter(queue => !/^amq\..+/i.test(queue.name))
    }

    return new Promise(resolve => {
      consoleQueueInterface.question(queueMenu(queues), answer => {
        return Promise.resolve()
        .then(() => {
          console.log('answer', answer);
          if (answer === (queues.length + 1).toString()) {
            consoleQueueInterface.close();
            resolve();
          }
        })
      });
    });
  })
  .catch(err => {
    console.error(err);
  })
};
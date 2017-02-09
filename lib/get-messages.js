const config = require('config');
const amqplib = require('amqplib');

module.exports = (queueName) => {
  const messages = [];
  return amqplib.connect(config.get('rabbitmq-server-url'))
  .then(conn => {
    return conn.createChannel();
  })
  .then(ch => {
    let promise = Promise.resolve();
    for (let i = 0; i < 10; i++) {
      let leave = false;
      promise = promise.then(() => {
        return ch.get(queueName, {
          noAck: true
        })
        .then(msg => {
          if (msg) {
            messages.push(msg);
          } else {
            leave = true;
          }
        })
        .catch(err => {
          throw err;
        });
      });

      if (leave) {
        break;
      }
    }

    return promise;
  })
  .then(() => {
    return messages;
  });
};
const config = require('config');
const rabbitManagementApi = require('./rabbit-management-api');

module.exports = () => {
  return rabbitManagementApi({
    path: '/api/queues',
    method: 'GET'
  })
  .then(response => {
    if (response.status.code === 200) {
      if (response.entity && response.entity.length > 0) {
        const queues = response.entity;
        for (const queue of queues) {
          if (!config.get('filter-default-queues') || !/^amq\..+/i.test(queue.name)) {
            console.log(queue.name);
          }
        }
      } else {
        console.log("No queues found");
      }
    } else {
      console.log("The server encountered an error");
    }
  })
  .catch(err => {
    console.error(err);
  })
};
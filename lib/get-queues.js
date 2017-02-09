const config = require('config');
const rabbitManagementApi = require('./rabbit-management-api');

module.exports = () => {
  return rabbitManagementApi({
    path: '/api/queues',
    method: 'GET'
  })
  .then(response => {
    if (response.status.code !== 200) {
      throw new Error(`Server responded with ${response.status.code}: ${response.entity}`);
    }

    let queues = [];

    if (response.entity && response.entity.length > 0) {
      queues = response.entity;

      if (config.get('filter-default-queues')) {
        queues = queues.filter(queue => !/^amq\..+/i.test(queue.name))
      }
    }

    return queues;
  });
};
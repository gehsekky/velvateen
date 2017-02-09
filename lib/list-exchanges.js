const config = require('config');
const rabbitManagementApi = require('./rabbit-management-api');

module.exports = () => {
  return rabbitManagementApi({
    path: '/api/exchanges',
    method: 'GET'
  })
  .then(response => {
    if (response.status.code === 200) {
      if (response.entity && response.entity.length > 0) {
        const exchanges = response.entity;
        for (const exchange of exchanges) {
          if (!config.get('filter-default-exchanges') || !/^amq\..+/i.test(exchange.name)) {
            console.log(exchange.name);
          }
        }
      } else {
        console.log("No exchanges found");
      }
    } else {
      console.log("The server encountered an error");
    }
  })
  .catch(err => {
    console.error(err);
  })
};
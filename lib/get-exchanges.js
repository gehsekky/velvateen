const config = require('config');
const rabbitManagementApi = require('./rabbit-management-api');

module.exports = () => {
  return rabbitManagementApi({
    path: '/api/exchanges',
    method: 'GET'
  })
  .then(response => {
    let exchanges = [];
    if (response.status.code === 200) {
      if (response.entity && response.entity.length > 0) {
        exchanges = response.entity;

        if (config.get('filter-default-exchanges')) {
          exchanges = exchanges.filter(exchange => !/^amq\..+/i.test(exchange.name));
        }
      }
    } else {
      throw new Error(`Server responded with ${response.status.code}: ${response.entity}`)
    }

    return exchanges;
  });
};
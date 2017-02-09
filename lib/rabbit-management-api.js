const config = require('config');
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const pathPrefix = require('rest/interceptor/pathPrefix');
const basicAuth = require('rest/interceptor/basicAuth');

const rabbitManagementApi = rest.wrap(mime)
.wrap(pathPrefix, {
  prefix: config.get('rabbitmq-management-url')
})
.wrap(basicAuth, {
  username: config.get('rabbitmq-management-username'),
  password: config.get('rabbitmq-management-password')
});

module.exports = rabbitManagementApi;
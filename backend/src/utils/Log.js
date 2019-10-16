import bunyan from 'bunyan';
import Elasticsearch from 'bunyan-elasticsearch';

var streams = [];
    streams.push({ stream: process.stdout })

// push to elasticsearch if enabled
if (process.env['APP_LOG_ES'] === 'true') {
  var esStream = new Elasticsearch({
    indexPattern: '[' + (process.env.APP_NAME) + ']YYYY.MM.DD',
    type: 'logs',
    host: process.env.APP_LOG_ES_HOST + ':' + process.env.APP_LOG_ES_PORT
  });
  esStream.on('error', (err) => console.log('Elasticsearch Stream Error:', err.stack));
  streams.push({ stream: esStream })
}

var level = 'info';
if (process.env.NODE_ENV === 'production') level = 'info';
if (process.env.NODE_ENV === 'staging') level = 'debug';
if (process.env.NODE_ENV === 'development') level = 'trace';


var log = bunyan.createLogger({
  name: process.env.APP_NAME || '-',
  streams: streams,
  serializers: bunyan.stdSerializers,
  level: level
});

// make it handy for handler
const logHandler = (handler, level) => (action, msg) => log[level]({handler, action}, msg)
const handler = (handler) => ({
  'trace': logHandler(handler, 'trace'),
  'debug': logHandler(handler, 'debug'),
  'info': logHandler(handler, 'info'),
  'warn': logHandler(handler, 'warn'),
  'error': logHandler(handler, 'error'),
  'fatal': logHandler(handler, 'fatal'),
})

module.exports = log;
module.exports.handler = handler;

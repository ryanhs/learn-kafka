import Promise from 'bluebird';
import _ from 'lodash';
import log from 'utils/Log';
import mysql from 'mysql2';
import Redis from 'redis';
import Redlock from 'redlock';

// loaders
// .........

// holders
global.data = { mysql: null, redis: null, redisLock: null, redisRedlock: null };


const bootstrap = async () => {
  // mysql pool
  if (process.env.APP_ACTIVE_MYSQL === '1') {
    global.data.mysql =  mysql.createPool({
      host: process.env.APP_MYSQL_HOSTNAME,
      user: process.env.APP_MYSQL_USERNAME,
      password: process.env.APP_MYSQL_PASSWORD,
      database: process.env.APP_MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      Promise
    }).promise();
    global.data.mysql.on('connection', () => log.info('Mysql connected!'));
  }

  // redis
  if (process.env.APP_ACTIVE_REDIS === '1') {
    Promise.promisifyAll(Redis.RedisClient.prototype)
    Promise.promisifyAll(Redis.Multi.prototype)
    global.data.redis = Redis.createClient({
      host: process.env.APP_REDIS_HOSTNAME,
      user: process.env.APP_REDIS_USERNAME,
      password: process.env.APP_REDIS_PASSWORD,
      db: process.env.APP_REDIS_DB,
    })
    global.data.redisRedlock = new Redlock([global.data.redis]);
    global.data.redis.onAsync('connect').then(() => log.info('Redis connected!'))
  }

  return global.data;
}

const getRedis = () => global.data.redis;
const getRedisLock = () => global.data.redisLock;
const getRedisRedlock = () => global.data.redisRedlock;
const getMysql = () => global.data.mysql;

export {
  bootstrap,
  getRedis,
  getRedisLock,
  getRedisRedlock,
  getMysql,
};

import manager from 'cache-manager';
import redisStore from 'cache-manager-redis-store';
import Promise from 'bluebird'

var stores = [];

// memory cache
if (process.env.APP_CACHE_MEMORY === '1') {
  stores.push(manager.caching({
    'store': 'memory',
    'max': process.env.APP_CACHE_MEMORY_MAX || 1000,
    'ttl': process.env.APP_CACHE_MEMORY_TTL || 60,
    'promiseDependency': Promise,
  }))
}

// redis cache
let redisCache = null;
if (process.env.APP_CACHE_REDIS === '1') {
  redisCache = manager.caching({
    'store': redisStore,
    'host': process.env.APP_CACHE_REDIS_HOST,
    'port': process.env.APP_CACHE_REDIS_PORT,
    'auth_pass': process.env.APP_CACHE_REDIS_PASS,
    'db': process.env.APP_CACHE_REDIS_DB || 0,
    'ttl': process.env.APP_CACHE_REDIS_TTL || 60,
    'promiseDependency': Promise,
  })
  stores.push(redisCache)
}

module.exports = manager.multiCaching(stores);
module.exports.redisCacheClient = redisCache == null ? null : redisCache.store.getClient();

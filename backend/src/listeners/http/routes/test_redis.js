import Log from 'utils/Log';
import { getRedis } from 'data';

// configs
const log = Log.child({api: 'test/redis'})

const handler = (req, res) => {
  log.trace('')

  // example without async await, plain promise
  getRedis().incrAsync('redis_test')
  .then(() => getRedis().getAsync('redis_test'))
  .then(current => res.json({current}))
  .catch(e => res.json('error!'))
}

export default handler

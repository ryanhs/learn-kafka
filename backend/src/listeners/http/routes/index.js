import log from 'utils/Log';

// middlewares

// endpoints
import ping from './ping'
import test_redis from './test_redis'
import test_mysql from './test_mysql'

const routes = (app) => {
    app.get('/api/ping', ping)
    app.get('/api/test_redis', test_redis)
    app.get('/api/test_mysql', test_mysql)
}

export default routes

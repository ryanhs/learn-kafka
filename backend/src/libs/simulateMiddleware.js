/*

import simulateMiddleware from 'libs/simulateMiddleware'

const handlerWrapper = simulateMiddleware(middlewares, handler)(req, res)

const middlewares = [
  check('current_password').isLength({ min: 1, max: 64 }).withMessage('Harus diisi!'),
  check('new_password').isLength({min: 1, max: 64}).withMessage('Harus diisi!'),
];


*/

const toPromise = v => (req, res, log) => new Promise((resolve, reject) => v(req, res, next => resolve(next), log))

const simulateMiddlewares = (middlewares, handler) => {
  middlewares = middlewares.map(toPromise);
  return (req, res, log) => Promise.all(middlewares.map(v => v(req, res, log))).then(() => handler(req, res, log))
}

module.exports = simulateMiddlewares;

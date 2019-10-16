import Log from 'utils/Log';

// configs
const log = Log.child({api: 'ping'})

const handler = (req, res) => {
  log.trace('')
  res.json(new Date().toString() + ' @' + process.env.NODE_ENV)
}

export default handler

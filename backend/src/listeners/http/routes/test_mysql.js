import Log from 'utils/Log';
import { getMysql } from 'data';

// configs
const log = Log.child({api: 'test/mysql'})

const handler = async (req, res) => {
  log.trace('')

  let [rows, fields] = await getMysql().query('SHOW TABLES');
  res.json(rows.map(v => v[fields[0]['name']]))
}

export default handler

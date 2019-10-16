import _ from 'lodash';

import pagination from 'utils/lodashPagination';
import cache from 'utils/Cache';
import { getRedis } from 'data';

export default {
  // (parent, args, context, info) => ...

  // example using cache manager
  hello: async (parent, {name = 'World'}) => await cache.wrap('key-is-hello/' + name, () => `Hello ${name}!`),

}

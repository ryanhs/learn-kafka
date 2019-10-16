import _ from 'lodash';

import pagination from 'utils/lodashPagination';
import cache from 'utils/Cache';


export default {
  helloMutation: async (parent, {name = 'World'}) => await cache.wrap('key-is-hello-without-unique-key', () => `Hello ${name}!`),
}

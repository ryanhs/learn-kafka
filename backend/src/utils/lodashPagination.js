import _ from 'lodash';

const pagination = (items, page, perPage = 3) => {
	var page = page || 1;
	var offset = (page - 1) * perPage;
	var paginatedItems = _.drop(items, offset).slice(0, perPage);
	var totalPages = Math.ceil(items.length / perPage);

	return {
    paginatorInfo: {
      count: paginatedItems.length,
      currentPage: page,
      hasMorePages: page < totalPages,
      lastPage: totalPages,
      perPage: perPage,
      total: items.length,
    },
		data: paginatedItems
	};
}

export default pagination

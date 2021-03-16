const createQuery = ({ route, page, limit, sort, sortAsc, searchText }) => {
  let query = `${route}?page=${page}&limit=${limit}&sort=${sortAsc ? '' : '-'}${sort}`;

  if (searchText) query += `&q=${searchText}`;

  return query;
};

export default createQuery;

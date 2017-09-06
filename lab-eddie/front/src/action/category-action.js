import superagent from 'superagent';

export const categorySet = (cats) => {
  type: 'CATEGORY_SET',
  payload: cats
}

export const categoryCreate = (cat) => {
  type: 'CATEGORY_CREATE',
  payload: cat
}

export const categoryUpdate = (cat) => {
  type: 'CATEGORY_UPDATE',
  payload: cat
}

export const categoryDelete = (cat) => {
  type: 'CATEGORY_DELETE',
  payload: cat
}

export const fetchAllCats = () => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/category`)
  .then(res => {
    dispatch(categorySet(res.body));
    return res;
  })
}

export const createCatRequest = cat => dispatch => {
  return superagent.post(`${__API_URL__}/api/category`)
  .send(cat)
  .then(res => {
    dispatch(categoryCreate(res.body));
    return res;
  })
}

export const updateCatRequest = cat => dispatch => {
  return superagent.put(`${__API_URL__}/api/category/${cat.id}`)
  .send(cat)
  .then(res => {
    dispatch(categoryUpdate(res.body));
    return res;
  })
}

export const deleteCatRequest = cat => dispatch => {
  return superagent.delete(`${__API_URL__}/api/category/${cat.id}`)
  .then(res => {
    dispatch(categoryUpdate(cat));
    return res;
  })
}

import superagent from 'superagent';

export const listSet = (lists) => ({
  type: 'LIST_SET',
  payload: lists
})

export const listCreate = (list) => ({
  type: 'LIST_CREATE',
  payload: list
})

export const listUpdate = (list) => ({
  type: 'LIST_UPDATE',
  payload: list
})

export const listDelete = (list) => ({
  type: 'LIST_DELETE',
  payload: list
})

export const listsClear = () => ({
  type: 'LISTS_CLEAR',
  payload: null
})

export const listsFetchRemote = () => {
  return superagent.get(`${__API_URL__}/api/lists`)
  .then(response => Promise.resolve(response));
}

export const listCreateRemote = (list) => {
  return superagent.post(`${__API_URL__}/api/lists`)
  .send(list)
  .then(response => Promise.resolve(response));
}

export const listUpdateRemote = (list) => {
  return superagent.put(`${__API_URL__}/api/lists`)
  .send(list)
  .then(response => Promise.resolve(response));
}

export const listDeleteRemote = (list) => {
  return superagent.delete(`${__API_URL__}/api/lists/${list._id}`)
  .then(response => Promise.resolve(list));
}
import superagent from 'superagent';

//talk to the redux store
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
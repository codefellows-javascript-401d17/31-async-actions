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

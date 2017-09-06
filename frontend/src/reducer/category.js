let validateCategory = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION ERROR: category must have an id');
  }
  if (!payload.title) {
    throw new Error('VALIDATION ERROR: category must have a title');
  }
}

export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'CATEGORY_SET':
      return payload
    case 'CATEGORY_CREATE':
      validateCategory(payload);
      return [payload, ...state]
    case 'CATEGORY_UPDATE':
      validateCategory(payload);
      return state.map( item =>
        item._id === payload.id ? payload : item)
    case 'CATEGORY_DELETE':
      validateCategory(payload);
      return state.filter( item =>
        item._id !== payload.id)
    default:
      return state;
  }
}
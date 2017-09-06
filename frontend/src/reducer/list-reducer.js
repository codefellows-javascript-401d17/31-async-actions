let validateList = (payload) => {
  if (!payload._id) {
    throw new Error('*** VALIDATION ERROR: List must have Id', '\n');
  }

  if (!payload.title) {
    throw new Error('*** VALIDATION Error: List must have title', '\n');
  }
};

export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'LIST_SET':
      return payload;

    case 'LIST_CREATE':
      validateList(payload);
      return [payload, ...state];

    case 'LIST_UPDATE':
      validateList(payload);
      return state.map( item => item._id === payload.id ? payload: item)

    case 'LIST_DELETE':
      validateList(payload);
      return state.filter( item => item._id !== payload._id)

    default:
      return state;
  }
}
const validate = (category) => {
  if(!category._id || !category.title || !category.budget || !category.published) {
    throw new Error('VALIDATION ERROR missing some stuff');
  }
};

export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
    case 'CATEGORY_SET':
      return payload;
    case 'CATEGORY_CREATE':
      validate(payload);
      return [payload, ...state];
    case 'CATEGORY_UPDATE':
      validate(payload);
      return state.map(cat => {
        return cat._id === payload._id ? payload : cat;
      });
    case 'CATEGORY_DELETE':
      validate(payload);
      return state.filter(cat => cat._id !== payload._id);
    default:
      return state;
  }


}

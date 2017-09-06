let validateBrewery = (payload) => {
  if(!payload._id) {
    throw new Error('VALIDATION ERROR: Brewery must have id')
  }
  if(!payload.name) {
    throw new Error('VALIDATION ERROR: Brewery must have name')
  }
  if(!payload.address) {
    throw new Error('VALIDATION ERROR: Brewery must have address')
  }
  if(!payload.phoneNumber) {
    throw new Error('VALIDATION ERROR: Brewery must have phoneNumber')
  }
  if(!payload.timestamp) {
    throw new Error('VALIDATION ERROR: Brewery must have timestamp')
  }
}

export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'BREWERY_SET':
      return payload;
    case 'BREWERY_CREATE':
      validateBrewery(payload);
      return [payload, ...state]
    case 'BREWERY_UPDATE':
      validateBrewery(payload);
      return state.map( brewery => brewery._id === payload._id ? payload : brewery)
    case 'BREWERY_DELETE':
      validateBrewery(payload);
      return state.filter( brewery => brewery._id !== payload._id)
    default:
      return state;
  }
}

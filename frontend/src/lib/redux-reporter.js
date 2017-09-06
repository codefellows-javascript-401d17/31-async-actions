import util from './util.js'

let reporter = store => next => action => {
  console.log('__ACTION__', action);

  try {
    let result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch (error) {
    error.action = action;
    console.logError('__ERROR__', error);
    return error;
  }
}

export default reporter;
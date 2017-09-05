import util from './util.js'

let reporter = store => next => action => {
  util.log('__ACTION__', action);

  try {
    let result = next(action);
    util.log('__STATE__', store.getState());
    return result;
  } catch (error) {
    error.action = action;
    util.logError('__ERROR__', error);
    return error;
  }
}

export default reporter;
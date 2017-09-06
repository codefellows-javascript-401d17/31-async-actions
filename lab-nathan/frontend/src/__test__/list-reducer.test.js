import listReducer from '../reducers/list.js';
import uuid from 'uuid/v1';

describe('List Reducer', () => {
  test('initial state should be an empty array', () => {
    let result = listReducer(undefined, { type: null });
    expect(result).toEqual([]);
  });

  test('if no action type is presented, the state should be returned', () => {
    let state = [ "some state" ];
    let result = listReducer(state, { type: null });
    expect(result).toEqual(state);
  });

  test('LIST_CREATE should append a list to the lists array', () => {
    let action = {
      type: 'LIST_CREATE',
      payload: { _id: uuid(), title: uuid() }
    };

    let result = listReducer([], action);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(action.payload);
  });

  test('LIST_UPDATE should update a list', () => {
    let action = {
      type: 'LIST_UPDATE',
      payload: { _id: uuid(), title: uuid() }
    };

    let result = listReducer([ { _id: action.payload._id ,title: uuid() }, { _id: uuid(), title: uuid() } ], action);

    expect(result[0]).toBe(action.payload);
  });

  test('LIST_DELETE should delete a list', () => {
    let action = {
      type: 'LIST_DELETE',
      payload: { _id: uuid(), title: uuid() }
    };

    let result = listReducer([ action.payload ], action);
    expect(result.length).toBe(0);
  });
});
import { listCreate, listUpdate, listDelete, listCreateRequest, listUpdateRequest, listDeleteRequest } from '../actions/list-actions.js';
import configureMockStore from 'redux-mock-store';
import thunk from '../lib/redux-thunk.js';
import superagent from 'superagent';

describe('List Actions', () => {
  afterEach(() => {
    return superagent.delete(`${__API_URL__}/api/lists`)
  });

  test('listCreate returns a LIST_CREATE action', () => {
    let action = listCreate({ id: '01234', title: 'test title' });
    expect(action.type).toEqual('LIST_CREATE');
    expect(action.payload.id).toBeTruthy();
    expect(action.payload.title).toBe('test title');
  });

  test('listDelete returns a LIST_DELETE action', () => {
    let list = { id: '01234', title: 'test title' };
    let action = listDelete(list);
    expect(action).toEqual({
      type: 'LIST_DELETE',
      payload: list
    });
  });

  test('listUpdate returns a LIST_UPDATE action', () => {
    let list = { id: '01234', title: 'test title' };
    let action = listUpdate(list);
    expect(action).toEqual({
      type: 'LIST_UPDATE',
      payload: list
    });
  });

  const mockStore = configureMockStore([thunk]);

  test('listCreateRequest returns a LIST_CREATE action', () => {
    expect.assertions(3);

    const store = mockStore({ lists: [] });
    const testList = { title: 'd' };

    return store.dispatch(listCreateRequest(testList)).then(response => {
      expect(response.status).toEqual(200);
      expect(response.body._id).toBeTruthy();
      expect(response.body.title).toBe(testList.title);
    });
  });

  test('listDeleteRequest returns a LIST_DELETE action', () => {
    expect.assertions(2);

    const store = mockStore({ lists: [] });
    const testList = { title: 'e' };

    return store.dispatch(listCreateRequest(testList))
    .then(response => store.dispatch(listDeleteRequest({ _id: response.body._id, title: response.body.title })))
    .then(response => {
      expect(response.status).toEqual(204);
      expect(response.body).toEqual({});
    });
  });
});
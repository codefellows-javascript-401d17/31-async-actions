import { listCreateRemote, listUpdateRemote, listDeleteRemote } from '../actions/list-actions.js';

describe('List Actions', () => {
  test('listCreate returns a LIST_CREATE action', () => {
    expect.assertions(2);
    return listCreateRemote({ title: 'test title' })
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body.title).toEqual('test title');
    })
    .catch(console.error);
  });

  test('listDelete returns a LIST_DELETE action', () => {
    expect.assertions(2);
    return listDeleteRemote({ title: 'test title' })
    .then(response => {
      expect(response.status).toEqual(204);
      expect(response.body).toEqual({});
    })
    .catch(console.error);
  });

  test('listUpdate returns a LIST_UPDATE action', () => {
    expect.assertions(2);
    return listUpdateRemote({ title: 'test title' })
    .then(response => {
      expect(response.status).toEqual(204);
      expect(response.body).toEqual({});
    })
    .catch(console.error);
  });
});
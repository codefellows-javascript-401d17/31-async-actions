import superagent from 'superagent';

export const brewerySet = (breweries) => ({
  type: 'BREWERY_SET',
  payload: breweries
})

export const breweryCreate = (brewery) => ({
  type: 'BREWERY_CREATE',
  payload: brewery
})

export const breweryUpdate = (brewery) => ({
  type: 'BREWERY_UPDATE',
  payload: brewery
})

export const breweryDelete = (brewery) => ({
  type: 'BREWERY_DELETE',
  payload: brewery
})

export const breweriesFetchRequest = () => (dispatch) => {
  console.log(`${__API_URL__}/api/brewery`);
  return superagent.get(`${__API_URL__}/api/brewery`)
  .then(res => {
    console.log('RES',res.body);
    dispatch(brewerySet(res.body));
    return res;
  })
}

export const breweryCreateRequest = (brewery) => (dispatch) => {
  return superagent.post(`${__API_URL__}/api/brewery`)
  .send(brewery)
  .then(res => {
    console.log(res.body);
    dispatch(breweryCreate(res.body));
    return res;
  })
}

export const breweryDeleteRequest = (brewery) => (dispatch) => {
  return superagent.delete(`${__API_URL__}/api/brewery/${brewery._id}`)
  .then(res => {
    dispatch(breweryDelete(brewery));
    return res;
  })
} ;

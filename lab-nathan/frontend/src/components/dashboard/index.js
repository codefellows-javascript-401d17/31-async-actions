import React from 'react';
import {connect} from 'react-redux';
import ListForm from '../list-form';
import * as listActions from '../../actions/list-actions.js';

class Dashboard extends React.Component {

  render() {
    return (
      <div className='dashboard'>
      <h2>To Do</h2>
      <ListForm
        onComplete={this.props.listCreate}
        buttonText='create list' />

      {this.props.lists.map(list =>
        <div key={list._id}>
          <p>{list.title}</p>
          <button onClick={() => this.props.listDelete(list)}>x</button>
        </div>
      )}
    </div>
    );
  }
}

let mapStateToProps = (state) => ({
  lists: state.lists
});

let mapDispatchToProps = (dispatch) => ({
  listCreate: (list) => {
    listActions.listCreateRequest(list)
    .then(response => dispatch(listActions.listCreate(response.body)))
  },
  listDelete: (list) => {
    listActions.listDeleteRequest(list)
    .then(response => dispatch(listActions.listDelete(response.body)))
  },
  listsFetch: (list) => {
    listActions.listsFetchRequest()
    .then(response => dispatch(listActions.listsFetch(response.body)))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
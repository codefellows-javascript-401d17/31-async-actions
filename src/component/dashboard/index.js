import React from 'react';
import {connect} from 'react-redux';
import ListForm from '../list-form';
import * as util from '../../lib/util.js';
import * as listActions from '../../action/list-actions.js';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.listsFetch();
  }

  render() {
    return (
      <div className='dashboard'>
        <h2>To-Do App</h2>
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
    )
  }
}

let mapStateToProps = (state) => ({ lists: state.lists });

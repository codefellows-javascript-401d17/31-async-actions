import React from 'react';
import {connect} from 'react-redux';
import * as catActions from '../../action/category-action.js';


class Dashboard extends React.Component {
  componentWillMount() {
    console.log(this.props);
    this.props.fetchAllCats()
  }
  render() {
    return(
      <h1>Hello</h1>
    )
  }
}

let mapStateToProps = (state) => ({category: state.category});
let mapDispatchToProps = (dispatch) => ({
  createCategory: (cat) => dispatch(catActions.createCatRequest(cat)),
  deleteCategory: (cat) => dispatch(catActions.deleteCatRequest(cat)),
  updateCategory: (cat) => dispatch(catActions.updateCatRequest(cat)),
  fetchAllCats: () => dispatch(catActions.fetchAllCats())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

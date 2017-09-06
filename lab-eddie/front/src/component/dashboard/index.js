import React from 'react';
import {connect} from 'react-redux';
import * as catActions from '../../action/category-action.js';
import CategoryForm from '../cat-form';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCat = this.deleteCat.bind(this);
  }

  deleteCat(cat) {
    let result = this.props.deleteCategory(cat)

    if(result instanceof Promise) {
      result.then(() => this.setState({error: null}))
      .catch(error => {
        this.setState({error})
      })
    }
  }
  componentWillMount() {
    this.props.fetchAllCats()

  }
  render() {
    return(
      <span>
        <CategoryForm
          onComplete={this.props.createCategory}
          firstPlace='Enter Title'
          secondPlace='Enter Budget'
          buttonText='Create Category'
        />
        <ul>
          {this.props.category.map(cat => {
            return(
              <li key={cat.id}>
                <button onClick={() => this.deleteCat(cat)}>X</button>
                <h3>{cat.title}</h3>
                <p>{cat.budget}</p>
                <CategoryForm
                  category={cat}
                  buttonText='Update'
                  onComplete={this.props.updateCategory}
                />
              </li>
              )
          })}
        </ul>
      </span>

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

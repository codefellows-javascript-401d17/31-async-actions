import React from 'react';
import {connect} from 'react-redux';
import BreweryFrom from '../brewery-form';
import * as util from '../../lib/util.js';
import * as breweryActions from '../../action/brewery-actions.js'

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.breweriesFetch()
  }

  render() {
    console.log('***********',this.props);
    return (
      <div className='dashboard'>
        <h2>brewery app</h2>
        <BreweryFrom
          onComplete={this.props.breweryCreate}
          buttonText='create brewery' />

        {this.props.breweries.map( brewery =>
          <div key={brewery._id}>
            <h1>{brewery.name}</h1>
            <p>{brewery.address}</p>
            <p>{brewery.phoneNumber}</p>
            <p>{brewery.timestamp}</p>
            <button onClick={() => this.props.breweryDelete(brewery)}>x</button>
          </div>
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({ breweries: state.breweries});

let mapDispatchToProps = (dispatch) => ({
  breweryCreate: (brewery) => dispatch(breweryActions.breweryCreateRequest(brewery)),
  breweryDelete: (brewery) => dispatch(breweryActions.breweryDeleteRequest(brewery)),
  breweriesFetch: () => dispatch(breweryActions.breweriesFetchRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

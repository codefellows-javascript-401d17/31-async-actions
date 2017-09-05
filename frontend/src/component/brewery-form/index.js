import React from 'react';
import * as util from '../../lib/util.js';

class BreweryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.brewery ? {...props.brewery} : {name: '', address: '', phoneNumber: '', timestamp: ''}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.brewery) {
      this.setState(props.brewery)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let {onComplete} = this.props;
    let result = onComplete(this.state);
    if (result instanceof Promise) {
      result.then(() => this.setState({ error: null }))
      .catch(error => {
        util.log('breweryForm Error:', error);
        this.setState({ error })
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <form
        onSubmit={this.handleSubmit}
        className={util.classToggler({
          'brewery-form': true,
          'error': this.state.error
        })}>

        <input
          name='name'
          type='text'
          placeholder='enter brewery name'
          value={this.state.name}
          onChange={this.handleChange} />

        <input
          name='address'
          type='text'
          placeholder='enter brewery address'
          value={this.state.address}
          onChange={this.handleChange} />

        <input
          name='phoneNumber'
          type='text'
          placeholder='enter brewery phone number'
          value={this.state.phoneNumber}
          onChange={this.handleChange} />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default BreweryFrom

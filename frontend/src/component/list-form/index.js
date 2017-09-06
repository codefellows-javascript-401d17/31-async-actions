import React from 'react';
import * as util from '../../lib/util.js';

class ListForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.list ? props.list : { title: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.list) {
      this.setState(props.list);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let {onComplete} = this.props;
    let result = onComplete(this.state);
    if (result instanceof Promise) {
      result.then(() => this.setState({ error: null }))
      .catch( error => {
        util.log('ListForm Error:', error);
        this.setState({ error })
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form
        className={util.classToggler({
            'list-form': true,
            'error': this.state.error
        })}
        onSubmit={this.handleSubmit}>

        <input
          name='title'
          type='text'
          placeholder='enter a title'
          value={this.state.title}
          onChange={this.handleChange}
          />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default ListForm;
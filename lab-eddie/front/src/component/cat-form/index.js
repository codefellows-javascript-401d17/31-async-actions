import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.category || {title: '', budget: 0};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.category) {
      this.setState(props.category);
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    let {onComplete} = this.props;
    let result = onComplete(this.state);
    if(result instanceof Promise) {
      result.then(() => this.setState({error: null}))
      .catch(error => {
        this.setState({error})
      })
    }
  }

  render() {
    let {title, budget} = this.props.category;
    !title ? title = this.props.firstPlace : null;
    !budget ? budget = this.props.secondPlace : null;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='title'
          required={true}
          placeholder={title}
          type='text'
          onChange={this.onChange}
          value={this.state.title}
        />
        <input
          name='budget'
          type='number'
          required={true}
          placeholder={budget}
          onChange={this.onChange}
          value={this.state.budget}
        />
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default CategoryForm;

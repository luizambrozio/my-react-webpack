import React, { Component } from 'react';

class Controlled extends Component {
    render() {
        return (
            <div className='content'>
                <p>A controlled input accepts its current value as a prop, as well as a callback to change that value.</p>
<pre>{`class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}`}</pre>

<h2 className='title'>Example</h2>

<pre>{`class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  
  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }
  
  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }
  
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, password } = this.state;
    alert("Signed up with email:" + email + " password:" + password);
  }
  
  canBeSubmitted() {
    const { email, password } = this.state;
    return (
      email.length > 0 &&
      password.length > 0
    );
  }
  
  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button disabled={!isEnabled}>Sign up</button>
      </form>
    )
  }
}

ReactDOM.render(<SignUpForm />, document.body);`}</pre>
            </div>
        )
    }
}

export default Controlled;
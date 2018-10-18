import React, { Component } from 'react';

class UnControlled extends Component {
    render() {
        return (
            <div className='content'>
                <p> Uncontrolled inputs are similar to traditional HTML form inputs:</p>
                <pre>{`class Form extends Component {
  handleSubmitClick = () => {
    const name = this.name.value;
    // do something with "this.name"
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => this.name = input} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}`}</pre>
            </div>
        )
    }
}

export default UnControlled;
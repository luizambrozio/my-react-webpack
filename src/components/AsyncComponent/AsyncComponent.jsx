import React, { Component } from 'react';

const AsyncComponent = (module = 'default') => (getComponent) => {
  return class AsyncComponent extends Component {
    constructor(props){
      super(props);
      this.Component = null;
      this.state = { Component: AsyncComponent.Component };
    }    

    componentWillMount() {
      if (!this.state.Component) {
        getComponent()
        .then(m => m[module])
        .then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  }
}

export default AsyncComponent;

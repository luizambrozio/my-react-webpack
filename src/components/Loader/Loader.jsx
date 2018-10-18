import React, { Component } from 'react';
import style from './style.css';

const Loader = (prop) => (WrappedComponent) => {
  return class Loader extends Component {
    render() {
      return this.props[prop] ? <div className={style.loader} /> : <WrappedComponent {...this.props} />;
    }
  }
}


export default Loader;

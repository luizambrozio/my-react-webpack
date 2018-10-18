import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './../../../../redux/counter';

class ReduxCounter extends Component {
    render() {
        const { counter, plusOne, minusOne } = this.props;

        return (
            <div>
                <h1>Redux: {counter}</h1>
                <button onClick={plusOne}>+</button>
                <button onClick={minusOne}>-</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.counter
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         plusOne: () => dispatch(plusOne()),
//         minusOne: () => dispatch(minusOne()),
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     plusOne() {
//         dispatch(plusOne());
//     },
//     minusOne() {
//         dispatch(minusOne());
//     }
// })

export default connect(mapStateToProps, actions)(ReduxCounter);
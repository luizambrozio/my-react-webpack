import React, {Component} from 'react';


class ReactCounter extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter: props.counter
        }
    }

    plusOne = () => this.setState( state => ({counter: state.counter + 1}) );
    minusOne = () => this.setState( state => ({counter: state.counter - 1}) );

    render(){
        return (
            <div>
                <h1>React: {this.state.counter}</h1>
                <button onClick={this.plusOne}>+</button>
                <button onClick={this.minusOne}>-</button>
            </div>
        )
    }
}

export default ReactCounter;
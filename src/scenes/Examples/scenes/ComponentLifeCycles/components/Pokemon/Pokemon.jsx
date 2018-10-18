import React, { Component } from 'react';

const logger = (msg, color='#34495e') => console.log(`%c ${msg}`, `font-weight: bold; color:${color};`)

class Pokemon extends Component {
    // Mounting
    constructor(props) {
        super(props);
        logger('constructor || componentWillMount: can safely query this.props and this.state', '#3D9970');
    }

    render() {
        logger('render: Birth of the Component', '#C91F37')
        const { name, image } = this.props;
        return (
            <figure>
                <img src={image} />
                <figcaption>{name}</figcaption>
            </figure>
        )
    }

    componentDidMount() {
        logger('componentDidMount: Pokemon component mounted successfully', '#2ECC40');
    }

    // Updating
    componentWillReceiveProps(nextProps) {
        logger('componentWillReceiveProps: called when props are passed to the Component instance', '#264348');
        logger(`currentProps: ${this.props.name} — nextProps: ${nextProps.name}`, '#264348');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.id == this.props.id) {
            logger('shouldComponentUpdate: false', '#049372');
            return false;
        }
        logger('shouldComponentUpdate: true', '#049372');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        logger('componentWillUpdate: perform any preparations for an upcoming update');
    }

    // render()

    componentDidUpdate(prevProps, prevState) {
        logger('componentDidUpdate: can be used to perform DOM operations', '#317589');
    }

    // End of Life
    componentWillUnmount(){
        logger('componentWillUnmount: Good Bye', '#C91F37');
    }
}

export default Pokemon;
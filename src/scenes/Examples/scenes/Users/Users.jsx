import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './../../../../components/Loader'

import * as actions from './../../../../redux/users';

import style from './style.css';

class Users extends Component {
    render() {
        const { users, fetchUsers } = this.props;

        return (
            <div>
                <section className={style.pictures}>
                    {users.map(({ picture }, id) =>
                        <img src={picture} key={id} />
                    )}
                </section>
                <button className='button is-primary' onClick={fetchUsers}>Fetch Users</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.users
    };
}

export default connect(mapStateToProps, actions)(Loader('isFetching')(Users));
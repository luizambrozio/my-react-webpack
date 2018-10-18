import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import style from './style.scss';

class NavBar extends Component {
    state = { isActive: false };

    onClickNav = () => {
        this.setState(state => ({ isActive: !state.isActive }));
    }

    render() {
        const isActive = classNames({
            [style['is-active']] : this.state.isActive
        });

        return (
            <nav className={`${style.nav} ${style['has-shadow']}`} role='navigation'>
                <span className={`${style['nav-toggle']} ${isActive}`} onClick={this.onClickNav}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className={`${style['nav-right']} ${style['nav-menu']} ${isActive}`} onClick={this.onClickNav}>
                    <NavLink className={style['nav-item']} activeClassName={style['is-active']} exact to='/'>Home</NavLink>
                    <NavLink className={style['nav-item']} activeClassName={style['is-active']} to='/examples'>Examples</NavLink>
                </div>
            </nav>
        )
    }
}

export default NavBar;

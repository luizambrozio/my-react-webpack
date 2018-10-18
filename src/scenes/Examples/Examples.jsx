import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import style from './style.css';
import AsyncComponent from './../../components/AsyncComponent';

const Communication = AsyncComponent()(() => import('./scenes/Communication'));
const ReactCounter = AsyncComponent()(() => import('./scenes/ReactCounter'));
const Forms = AsyncComponent()(() => import('./scenes/Forms'));
const ReduxCounter = AsyncComponent()(() => import('./scenes/ReduxCounter'));
const ComponentLifeCycles = AsyncComponent()(() => import('./scenes/ComponentLifeCycles'));
const Users = AsyncComponent()(() => import('./scenes/Users'));

const ExamplesNavBar = ({ url }) => (
    <ul>
        <li><NavLink to={`${url}/communication`}>React Components Communication</NavLink></li>
        <li><NavLink to={`${url}/forms`}>Forms</NavLink></li>
        <li><NavLink to={`${url}/react-counter`}>React counter</NavLink></li>
        <li><NavLink to={`${url}/redux-counter`}>Redux Counter</NavLink></li>
        <li><NavLink to={`${url}/life-cycles`}>Life Cycles Example</NavLink></li>
        <li><NavLink to={`${url}/async`}>Async Example</NavLink></li>
    </ul>
)

const Examples = ({ match }) => (
    <section className='section'>
        <h1 className='title'>Examples</h1>

        {ExamplesNavBar(match)}

        <section className='section'>
            <Route exact path={match.url} render={() => (
                <h3>Please select an Example.</h3>
            )} />
            <Route path={`${match.url}/communication`} component={Communication} />
            <Route path={`${match.url}/forms`} component={Forms} />
            <Route path={`${match.url}/react-counter`} render={(props) => <ReactCounter counter={10} {...props} />} />
            <Route path={`${match.url}/redux-counter`} component={ReduxCounter} />
            <Route path={`${match.url}/life-cycles`} component={ComponentLifeCycles} />
            <Route path={`${match.url}/async`} component={Users} />
        </section>
    </section>


)

export default Examples;
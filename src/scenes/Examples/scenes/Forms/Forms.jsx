import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Tab from './../../../../components/Tab';
import Controlled from './components/Controlled';
import UnControlled from './components/UnControlled';

const tabs = ({ url }) => (
    <div className='tabs is-boxed'>
        <ul>
            <Tab exact to={url}> Controlled Components </Tab>
            <Tab to={`${url}/uncontrolled`}> UnControlled Components </Tab>
        </ul>
    </div>
);


const Forms = ({ match }) => (
    <section className='container'>
        <section className="columns">
            <div className="column">
                {tabs(match)}
            </div>
        </section>

        <section className="columns">
            <div className="column">
                <div className='section'>
                    <Route exact path={`${match.url}`} component={Controlled} />
                    <Route path={`${match.url}/uncontrolled`} component={UnControlled} />
                </div>
            </div>
        </section>
    </section>


)

export default Forms;
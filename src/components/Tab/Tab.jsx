import React from 'react';
import { Route, Link } from 'react-router-dom';

const Tab = ({ label, to, exact, children }) => (
    <Route path={to} exact children={({ match }) => (
        <li className={match ? 'is-active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    )} />
);

export default Tab;
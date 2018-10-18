import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '!style-loader!css-loader!bulma/css/bulma.css';

import store from './store';

import NavBar from './components/NavBar';
import AsyncComponent from './components/AsyncComponent';

const Home = AsyncComponent()(() => import('./scenes/Home'));
const Examples = AsyncComponent()(() => import('./scenes/Examples'));

render(
    <Provider store={store}>
        <Router>
            <div>
                <NavBar />
                <div className='container'>
                    <Route exact path="/" component={Home} />
                    <Route path="/examples" title="Examples" component={Examples} />
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

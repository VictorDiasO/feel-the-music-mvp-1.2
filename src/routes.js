import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainContent from './pages/MainContent/index';

export default class Routes extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainContent} />
                </Switch>
            </BrowserRouter>
        );
    }
}

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainContent from './pages/MainContent/index';
import MobileContent from './pages/Mobile/index';
// import BeatTrap from './assets/musics/BeatTrap.mp3';

export default class Routes extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainContent} />
                    <Route path="/mobile" component={MobileContent} />
                    {/* <Route exact path="/BeatTrap.mp3" component={BeatTrap} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

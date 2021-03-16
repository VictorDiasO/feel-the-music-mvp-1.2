import React, { Component } from 'react';

import './styles.css';

class MobileContent extends Component {
    constructor(props){
        super(props)
        this.state = {
            paused: true
        }
    }

    test() {
        console.log('pause')
    }

    render() {
        return(
            <div className="app">
                {/* <text>Mobile Version</text> */}

                <div className="music-menu">
                    <text className="musictext">Music Menu</text>
                </div>
                
                <div className="circle"></div>

                {/* <div className="triangle"></div> */}

                {/* <div className="arrow-up"></div>
                <div className="arrow-down"></div>
                <div className="arrow-left"></div> */}
                <div className="arrow-right" onClick={this.test}></div>
                <div className="pause" onClick={this.test}></div>
            </div>
        )
    }
} 

export default MobileContent;
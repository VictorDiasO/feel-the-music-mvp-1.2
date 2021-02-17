import React, { Component } from 'react';

import './styles.css';
import AudioAnalyser from '../../components/AudioAnalyser';
import Rythm from '../../api/Rythm.js/src/'; 

const rythm = new Rythm();
class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: null
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }

    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        this.setState({ audio });
    }

    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({ audio: null });
    }

    toggleMicrophone() {
        if (this.state.audio) {
            this.stopMicrophone();
        } else {
            this.getMicrophone();
        }
    }

    vibrate = () => window.navigator.vibrate(200);

    startRythm() {
        rythm.maxValueHistory = 100;
        rythm.setMusic('./BeatTrap.mp3');
        rythm.setGain(2);

        /*
        * @elementClass: Class that you want to link your rythm to
        * @danceType: Use any of the built-in effect or give your own function
        * @startValue: The starting frequency of your rythm
        * @nbValue: The number of frequency of your rythm
        * 1024 Frequencies, your rythm will react to the average of your selected frequencies.
        * Examples: bass 0-10 ; medium 150-40 ; high 500-100
        */
        // rythm.addRythm("controls", 'color', 150, 40)
        rythm.addRythm('pulse1', 'pulse', 0, 10)

        rythm.start();
    }

    stopRythm() {
        rythm.stop();
    }

    render() {
        return(
            <div className="App">
                <div className="vibrate-button">
                    <button onClick={this.vibrate} >VIBRATE</button>
                </div>
                <div className="controls">
                    <button onClick={this.toggleMicrophone}>
                        {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
                    </button>
                </div>
                { this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : '' }
                <div className="RythM">
                    <button onClick={this.startRythm}>Start Rythm</button>
                </div>
                <div className="RythM2">
                    <button onClick={this.stopRythm}>Stop Rythm</button>
                </div>
            </div>
        );
    }

}

export default MainContent;




// import React from 'react';
// import AudioSpectrum from 'react-audio-spectrum';

// import './styles.css';
// import BeatTrap from '../../assets/musics/BeatTrap.mp3';

// export default function MainContent() {
//     // var vibrate = window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
//     const vibrate = () => window.navigator.vibrate(200);

//     this.audioEle = new Audio(BeatTrap); 


//     return (
//         <div>
//             <div>
//                 <text>Bom dia</text>
//             </div>

//             <div>
//                 <text>Puts</text>
//             </div>

//             <div>
//                 <button onClick={vibrate} >VIBRATE</button>
//             </div>

//             <audio id="audio-element"
//                 src="../../assets/musics/BeatTrap.mp3"
//                 autoPlay
//             >
//             </audio>

//             <div>
//                 <text>Puuuts</text>
//             </div>

//             <AudioSpectrum
//                 id="audio-canvas"
//                 height={200}
//                 width={300}
//                 audioId={'audio-element'}
//                 capColor={'red'}
//                 capHeight={2}
//                 meterWidth={2}
//                 meterCount={512}
//                 meterColor={[
//                     {stop: 0, color: '#f00'},
//                     {stop: 0.5, color: '#0CD7FD'},
//                     {stop: 1, color: 'red'}
//                 ]}
//                 gap={4}
//             />
//             <AudioSpectrum
//             id="audio-canvas"
//             height={200}
//             width={300}
//             audioEle={this.audioEle}
//             />


//         </div>
//     )
// }

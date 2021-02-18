import React, { Component, createRef } from 'react';

import soundFile from '../assets/musics/BeatTrap.mp3'
// let ctx;
// const width = window.innerWidth;
// const height = window.innerHeight;
class SoundAnalyser extends Component {
    constructor(props) {
        super(props);
        this.audio = new Audio(soundFile);
        this.canvas = createRef();
    }

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");
    }

    togglePlay = () => {
        let { audio } = this;
        // var playPromise = audio.play();
        if(audio.paused) {
            audio.play();
            // if (playPromise !== undefined) {
            //     playPromise.then(_ => {
            //         this.audio.play();
            //     }).catch(error => {
            //         console.log('Errooo: ', error);
            //     });
            // }
            this.rafId = requestAnimationFrame(this.tick);

         } else {
            audio.pause();
            cancelAnimationFrame(this.rafId);
         }
    }

    draw() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;
    
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.clearRect(0, 0, width, height);
    
        context.beginPath();
        context.moveTo(0, height / 2);
        for (const item of audioData) {
          const y = (item / 255.0) * height;
          context.lineTo(x, y);
          x += sliceWidth;
        //   console.log('Vee: ', x)
        //   if ( x >= magicNumber ) {
        //       this.vibrate()
        //   }
        }
        context.lineTo(x, height / 2);
        context.stroke();
    
    //     console.log(height);
    //     console.log('sa: ', width);
    //     console.log('Slice Width: ', sliceWidth);
    //     console.log('bglh certo:  ', height / 2);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }
    render() {
        return <>
            <button onClick={this.togglePlay}>Play/Pause</button>
            <canvas ref={this.canvas}  />
        </>
    }

}

export default SoundAnalyser;




// import React, { Component } from 'react';
// import SoundVisualiser from './SoundVisualiser';

// import soundFile from '../assets/musics/BeatTrap.mp3'

// export default class SoundAnalyser extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { audioData: new Audio(soundFile) };
//         // this.audio = new Audio(soundFile)
//         this.tick = this.tick.bind(this);
//     }

//     componentDidMount() {
//         this.audioContext = new (window.AudioContext || 
//             window.webkitAudioContext)();
//         this.analyser = this.audioContext.createAnalyser();
//         this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
//         // this.source = this.audioContext.createMediaStreamSource(this.props.audio);
//         this.source = this.audioContext.createMediaElementSource(this.props.audio);  
//         this.source.connect(this.analyser);
//         this.rafId = requestAnimationFrame(this.tick);
//     }

//     tick() {
//         this.analyser?.getByteTimeDomainData(this.dataArray);
//         this.setState({ audioData: this.dataArray });
//         this.rafId = requestAnimationFrame(this.tick);
//     }

//     componentWillUnmount() {
//         cancelAnimationFrame(this.rafId);
//         this.analyser.disconnect();
//         this.source.disconnect();
//     }

//     togglePlay = () => {
//         let { audioData } = this;
//         // var playPromise = audio.play();
//         if(this.state.audioData.paused) {
//             this.state.audioData.play();
//             // if (playPromise !== undefined) {
//             //     playPromise.then(_ => {
//             //         this.audio.play();
//             //     }).catch(error => {
//             //         console.log('Errooo: ', error);
//             //     });
//             // }
//             this.rafId = requestAnimationFrame(this.tick);

//          } else {
//             this.state.audioData.pause();
//             cancelAnimationFrame(this.rafId);
//          }
//     }

//     render() {
//         return <> 
//             <button onClick={this.togglePlay}>Play/Pauseeeeee</button>
//             <SoundVisualiser audioData={this.state.audioData} />;
//         </>
//     }
// }



import React, { Component, createRef } from 'react';

import soundFile from '../assets/musics/BeatTrap.mp3'

// Changing Variables
let ctx, x_end, y_end, bar_height;

// constants
const width = window.innerWidth;
const height = window.innerHeight;
const bars = 555;
const bar_width = 1;
const radius = 0;
const center_x = width / 2;
const center_y = height / 2;

const timesToGetInfo = 5;

class Canvas extends Component {
    constructor(props) {
        super(props)
        // this.audio = new Audio('../assets/musics/BeatTrap.mp3');
        this.audio = new Audio(soundFile)
        this.canvas = createRef();
    }

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        for (var i = 0; i < bars; i++) {
            //divide a circle into equal part
            const rads = Math.PI * 2 / bars;

            // Math is magical
            bar_height = this.frequency_array[i] * 2;

            const x = center_x + Math.cos(rads * i) * (radius);
            const y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

            //draw a bar
            this.drawBar(x, y, x_end, y_end, this.frequency_array[i], ctx, canvas);

            // Get sound infos
            // this.getSoundInfos(this.frequency_array)
            this.getSoundInfosFrom2Datas(x, x_end);

            // Vibrate
            this.vibrating(x, x_end, y, y_end);
        }
    }

    drawBar(x1=0, y1=0, x2=0, y2=0, frequency, ctx, canvas) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
        gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
        ctx.fillStyle = gradient;

        const lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = bar_width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    getSoundInfos(data) {
        console.log(data);
    }

    getSoundInfosFrom2Datas(data1, data2) {
        console.log('1: ', data1);
        console.log('2: ', data2);
    }

    vibrate = () => window.navigator.vibrate(200);

    vibrating(x, end_x, y, end_y) {
        const magicNumber = 450.3692930842692;
        if (magicNumber <= end_x || magicNumber <= end_y ) {
            this.vibrate()
        }
    }

    componentDidMount() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createMediaElementSource(this.audio);

        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);


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

    tick = () => {
        this.animationLooper(this.canvas.current);
        this.analyser.getByteTimeDomainData(this.frequency_array);
        this.rafId = requestAnimationFrame(this.tick);
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

export default Canvas;
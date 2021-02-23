import React, { Component, createRef } from 'react';

import soundFile from '../assets/musics/BeatTrap.mp3'

// import {} from '../api/numjs/src/index';

// https://github.com/meyda/meyda

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

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

        // Normalize sound
        // this.normalizer('BeatTrap');

        for (var i = 0; i < bars; i++) {
            //divide a circle into equal part
            const rads = Math.PI * 2 / bars;

            // Math is magical
            bar_height = this.frequency_array[i] * 2;

            const x = center_x + Math.cos(rads * i) * (radius);
            const y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);


            // Get sound infos
            // this.getSoundInfos(this.frequency_array)
            this.getSoundInfosFrom2Datas(x, x_end);

            // // Vibrate
            this.vibrating(x, x_end, y, y_end);

            // Normalize sound
            // this.normalizer(this.audio)
            // this.soundNormalizer()


            //draw a bar
            this.drawBar(x, y, x_end, y_end, this.frequency_array[i], ctx, canvas);
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

    // Novo
    soundNormalizer(){
        // https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode/normalize - FALHOU
        // https://stackoverflow.com/questions/38533410/normalize-audio-data-from-getbytefrequencydata-by-volume  - TESTANDO

        // Config

        var spectrum = [];

        // Getting the frequency
        this.analyser = this.context.createAnalyser();
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);

        // this.analyser.getbyteFrequencyData()
        console.log(spectrum);
        for (var i = 0; i < this.frequency_array.length; i++) {
            var value = this.frequency_array[i];
            spectrum.push(value)
        }

        console.log(spectrum)
        
    
    }

    // Antigo
    normalizer(name) {
        // console.log('oi')
        var audioElem = this.audio;
        // var src = audioCtx.createMediaElementSource(this.audio);
        var gainNode = audioCtx.createGain();
        // var gainNode = audioCtx.createPeriodicWave

        gainNode.gain.value = 1.0;

        // audioElem.addEventListener("play the nnormaizer", function() {
        //     src.connect(gainNode);
        //     gainNode.connect(audioCtx.destination);
        // }, true)

        // audioElem.addEventListener("pause the nnormaizer", function() {
        //     // Disconnect the nodes after click in "pause", otherwise all nodes always run
        //     src.disconnect();
        //     gainNode.disconnect(audioCtx.destination);
        // }, true)

        fetch(name + '.mp3')
            .then(function(res) { return res.arrayBuffer(); })
            .then(function(buf) {
                return audioCtx.decodeAudioData(buf);
            }).then(function(decodedData) {
                var decodedBuffer = decodedData.getChannelData(0);
                var sliceLen = Math.floor(decodedData.sampleRate * 0.05);
                var averages = [];
                var sum = 0.0;
                for (var i = 0; i < decodedBuffer.length; i++) {
                    sum += decodedBuffer[i] ** 2;
                    if (i % sliceLen === 0) {
                        sum = Math.sqrt(sum / sliceLen);
                        averages.push(sum);
                        sum = 0;
                    }
                }

                averages.sort(function(a, b) { return a - b; });

                var a = averages[Math.floor(averages.length * 0.95)];

                var gain = 1.0 / a;

                gain = gain / 10.0;

                console.log("Gain determined: ", name, " // ", a, " // ", gain);
                gainNode.gain.value = gain;
                audioElem.textContent = gain.toPrecision(4);
            })
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
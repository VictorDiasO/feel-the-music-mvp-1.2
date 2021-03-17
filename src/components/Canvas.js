import React, { Component, createRef } from 'react';

import soundFile from '../assets/musics/BeatTrap.mp3'

import './Canva.css'

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
        this.currentTime = 0;
        this.duration = 0;
        this.canvas = createRef();
    }

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        // Normalize sound
        // this.normalizer('BeatTrap');

        // this.getSoundInfos(this.audio)
        // this.getSoundTime(this.audio);

        // this.SoundAnalyser(this.audio);
        // this.SoundAnalyser(this.audio);
        // this.SoundAnayserInit(this.audio);

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
            // this.getSoundInfosFrom2Datas(x, x_end);

            // // Vibrate
            this.vibrating(x, x_end, y, y_end);

            // Normalize sound
            // this.normalizer(this.audio)
            // this.soundNormalizer()

            // this.SoundAnalyser(x_end, y_end);


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
        console.log(data.length);
    }

    getSoundTime(sound) {
        sound.addEventListener("timeupdate", e => {
            this.currentTime = e.target.currentTime
            this.duration = e.target.duration
        });
        console.log('Duration 1: ', this.duration)
        console.log('Duration 2: ', this.currentTime);
    }

    getSoundInfosFrom2Datas(data1, data2) {
        console.log('1: ', data1);
        console.log('2: ', data2);
    }

    // vibrate = () => window.navigator.vibrate(500);
    vibrate = () => window.navigator.vibrate([500, 100]); // Vou mudar esses 500ms aí para testar depois

    vibrating(x, end_x, y, end_y) {
        const magicNumber = 490.3692930842692;
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

    // async SoundAnalyser(end_x, end_y) {
    SoundAnayserInit(sound) {
        return sound;
    }

    async SoundAnalyser(sound) {
        // Talvez usar o mesmo magicNumber e armazenar o tempo em que esse magicNumber é atingido ou ultrapassado, depois criar uma função que vibre quando a música alcançar aquele tempo especificado 
        // const magicNumber = 490.3692930842692;
        const newMagicNumber = 126;
        // var time = [];
        var time = new Array();

        // console.log('before: ', time);

        // if ( magicNumber <= end_x || magicNumber <= end_y ) {
        //     time.push(this.currentTime);
        // }
        // console.log('after: ', time);

        // let time_beats = [time][beats];

        // Quando

        let durationn = 0;
        let currentTimee = 0;
        let musicDuration = 0;

        await sound.addEventListener("timeupdate", e => {
            // this.currentTime = e.target.currentTime
            // this.duration = e.target.duration
            currentTimee = e.target.currentTime
            durationn = e.target.duration

            console.log('Value: ', durationn)

            for (let i = 0; i < durationn; i++) {
                // const rads = Math.PI * 2 / bars;
                // bar_height = this.frequency_array[i] * 2;
                // x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
                // y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
                // if (newMagicNumber >= this.frequency_array[i] ) {
                //     time.push(this.frequency_array[i])
                //     console.log('TIme: ', time)
                // }
                if ( this.frequency_array[i] >= newMagicNumber ) {
                    // time.push(this.frequency_array[i])
                    time.push(this.frequency_array[i])
                    // console.log('TIme: ', time)
                }
    
                console.log('TIme222: ', time)
            }
            // console.log('TIME333: ', time)
            
        });


        // console.log(this.frequency_array)
        for (let i = 0; i < this.durationn; i++) {
            // const rads = Math.PI * 2 / bars;
            // bar_height = this.frequency_array[i] * 2;
            // x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            // y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
            if (newMagicNumber >= this.frequency_array[i] ) {
                await time.push(this.frequency_array[i])
                console.log('TIme: ', time)
            }

            console.log('TIme222: ', time)
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

    toggleAnalyse = () => {
        let { audio } = this;

        // const sound = new Audio(soundFile);

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
            this.SoundAnalyser(audio);
        } else {
            audio.pause();
            cancelAnimationFrame(this.rafId);
            // audio.pause()
            // this.SoundAnalyser(this.audio);
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
            {/* <canvas ref={this.canvas}  /> */}

            <div className="analyse">
                <button className="analyse-button" onClick={this.toggleAnalyse}>Analyse & Add to your PLaylist</button>
            </div>

            <div className="button-see-playlist">
                <button className="see-playlist">Ver playlist</button>
            </div>

            <div className="circle"></div>
            <div className="arrow-right" onClick={this.togglePlay}></div>
            <div className="pause" onClick={this.togglePlay}></div>
        </>
    }
}

export default Canvas;
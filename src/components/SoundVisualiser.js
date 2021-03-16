import React, { Component } from 'react';


// the number 210.05859375, this can be get with an print of "x" variable

const magicNumber = 215.05859375;
class SoundVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  vibrate = () => window.navigator.vibrate(200);

  componentDidUpdate() {
    this.draw();
  }

  vibrating() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
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
      if ( x >= magicNumber ) {
          this.vibrate()
      }
    }
    context.lineTo(x, height / 2);
    context.stroke();

//     console.log(height);
//     console.log('sa: ', width);
//     console.log('Slice Width: ', sliceWidth);
//     console.log('bglh certo:  ', height / 2);
    }

  render() {
    return <>
     <canvas width="300" height="300" ref={this.canvas} />;
    </>
  }
}

export default SoundVisualiser;
// import React, { Component } from 'react';

// import AudioAnalyser from './components/AudioAnalyser';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       audio: null
//     };
//     this.toggleMicrophone = this.toggleMicrophone.bind(this);
//   }

//   async getMicrophone() {
//     const audio = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: false
//     });
//     this.setState({ audio });
//   }

//   stopMicrophone() {
//     this.state.audio.getTracks().forEach(track => track.stop());
//     this.setState({ audio: null });
//   }

//   toggleMicrophone() {
//     if (this.state.audio) {
//       this.stopMicrophone();
//     } else {
//       this.getMicrophone();
//     }
//   }

//   render() {
//     return(
//       <div className="App">
//         <div className="controls">
//           <button onClick={this.toggleMicrophone}>
//             {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
//           </button>
//         </div>
//         { this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : '' }
//       </div>
//     );
//   }
// }

// export default App;



import React from 'react';
import Routes from './routes';

import './App.css';

const App = () => (
  <div className="app">
    <Routes />
  </div>
);

export default App;




// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

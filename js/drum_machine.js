"use strict";


const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function setupSample() {
  const filePath = "audio/percs/tamby.mp3";
  const sample = await getFile(audioCtx, filePath);
  return sample;
}

function playSample(audioContext, audioBuffer) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioContext.destination)
  sampleSource.start();
  return sampleSource;
}

// setupSample().then((sample) => {
//   console.log("file loaded...I think?");
//   playSample(audioCtx, sample);
//   console.log(audioCtx.currentTime);
// });


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: "on",
      volume: 1,
      metronomePlaying: false,
      sampleTest: ""
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.toggleMetronomePlaying = this.toggleMetronomePlaying.bind(this);
  }

  togglePower() {
    if(this.state.power === "on") {
      this.setState({
        power: "off",
        metronomePlaying: false,
        currentTrack: "track1",
        currentKit: "kit1",
        currentPad: "",
        nowRecording: false,
        playbackArrUndone: JSON.parse(localStorage.getItem("track1")),
        playbackArr: JSON.parse(localStorage.getItem("track1")),
        nowPlaying: false
      });

      if(this.state.nowRecording === true) {
        clearTimeout(this.recordingFinishTimeout);

        console.log("RECORDING STOPPED");
      }
      if(this.state.nowPlaying === true) {
        this.playbackTimeouts.forEach(function(i) {
          clearTimeout(i);
        }.bind(this));

        clearTimeout(this.playbackFinishTimeout);

        console.log("PLAYBACK STOPPED");
      }
    }
    else {
      this.setState({
        power: "on"
      });
    }
  }

  toggleVolume() {
    if(this.state.volume === 1) {
      this.setState({
        volume: 0
      });
    }
    else {
      this.setState({
        volume: 1
      });
    }
  }

  toggleMetronomePlaying() {
    if(this.state.metronomePlaying === false) {
      this.setState({
        metronomePlaying: true
      });

      playSample(audioCtx, this.state.sampleTest);
    }
    else {
      this.setState({
        metronomePlaying: false
      });

      playSample(audioCtx, this.state.sampleTest)
    }
  }

  componentDidMount() {
    setupSample().then((sample) => {
      console.log("file loaded...I think?");
      // playSample(audioCtx, sample);
      console.log(audioCtx.currentTime);

      this.setState({
        sampleTest: sample
      });

      console.log(this.state.sampleTest);
    });
  }

  render() {
    return (
      <div>
        <div id="drum-machine">
          <div id="machine-controls">
            <Metronome power={this.state.power} volume={this.state.volume} metronomePlaying={this.state.metronomePlaying} toggleMetronomePlaying={this.toggleMetronomePlaying} />
          </div>
        </div>
      </div>
    );
  }
}

const reactContainer = document.querySelector("#react-container");
ReactDOM.render(<DrumMachine />, reactContainer);

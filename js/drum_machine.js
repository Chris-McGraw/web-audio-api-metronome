"use strict";


const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


const audioKit1 = ["audio/percs/tamby.mp3", "audio/percs/kick5.mp3", "audio/percs/clap1.mp3"];


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: "on",
      volume: 1,
      metronomePlaying: false,
      audioCtx: audioCtx,
      sampleTest: "",
      sampleTestKick: "",
      sampleTestClap: ""
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.getAudioKitFiles = this.getAudioKitFiles.bind(this);
    this.setupSampleArray = this.setupSampleArray.bind(this);
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

  async getAudioKitFiles(audioContext, audioKit) {
    const audioBufferArray = [];

    for(const filepath of audioKit) {
      const response = await fetch(filepath);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      audioBufferArray.push(audioBuffer);
    }

    return audioBufferArray;
  }

  async setupSampleArray() {
    const sampleArray = await this.getAudioKitFiles(this.state.audioCtx, audioKit1);
    return sampleArray;
  }

  toggleMetronomePlaying() {
    if(this.state.metronomePlaying === false) {
      this.setState({
        metronomePlaying: true
      });
    }
    else {
      this.setState({
        metronomePlaying: false
      });
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener("touchstart",(event)=> {
      event.preventDefault();
    });

    this.setupSampleArray().then((sampleArray) => {
      this.setState({
        sampleTest: sampleArray
      });

      console.log("audio sample array files loaded");
      console.log(this.state.sampleTest);
    });
  }

  render() {
    return (
      <div>
        <div id="drum-machine">
          <Metronome power={this.state.power} volume={this.state.volume} audioCtx={this.state.audioCtx} sampleTest={this.state.sampleTest} metronomePlaying={this.state.metronomePlaying} toggleMetronomePlaying={this.toggleMetronomePlaying} />
          <PadTest audioCtx={this.state.audioCtx} sampleTest={this.state.sampleTest} />
        </div>
      </div>
    );
  }
}

const reactContainer = document.querySelector("#react-container");
ReactDOM.render(<DrumMachine />, reactContainer);

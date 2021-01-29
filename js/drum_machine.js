"use strict";


const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


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
    this.getFile = this.getFile.bind(this);
    this.setupSample = this.setupSample.bind(this);
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

  async getFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async setupSample() {
    const filePath = "audio/percs/tamby.mp3";
    const sample = await this.getFile(this.state.audioCtx, filePath);
    return sample;
  }

  async setupSampleKick() {
    const filePath = "audio/percs/kick5.mp3";
    const sample = await this.getFile(this.state.audioCtx, filePath);
    return sample;
  }

  async setupSampleClap() {
    const filePath = "audio/percs/clap1.mp3";
    const sample = await this.getFile(this.state.audioCtx, filePath);
    return sample;
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

    this.setupSample().then((sample) => {
      console.log("metronome audio file loaded");

      this.setState({
        sampleTest: sample
      });

      console.log(this.state.sampleTest);
    });

    this.setupSampleKick().then((sample) => {
      console.log("kick test audio file loaded");

      this.setState({
        sampleTestKick: sample
      });

      console.log(this.state.sampleTestKick);
    });

    this.setupSampleClap().then((sample) => {
      console.log("clap test audio file loaded");

      this.setState({
        sampleTestClap: sample
      });

      console.log(this.state.sampleTestClap);
    });
  }

  render() {
    return (
      <div>
        <div id="drum-machine">
          <Metronome power={this.state.power} volume={this.state.volume} audioCtx={this.state.audioCtx} sampleTest={this.state.sampleTest} metronomePlaying={this.state.metronomePlaying} toggleMetronomePlaying={this.toggleMetronomePlaying} />
          <PadTest audioCtx={this.state.audioCtx} sampleTestKick={this.state.sampleTestKick} sampleTestClap={this.state.sampleTestClap} />
        </div>
      </div>
    );
  }
}

const reactContainer = document.querySelector("#react-container");
ReactDOM.render(<DrumMachine />, reactContainer);

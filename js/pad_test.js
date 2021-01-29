"use strict";

class PadTest extends React.Component {
  constructor(props) {
    super(props);
    this.playSample = this.playSample.bind(this);
    this.kickTest = this.kickTest.bind(this);
    this.clapTest = this.clapTest.bind(this);
  }

  playSample(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
  }

  kickTest() {
    this.playSample(this.props.audioCtx, this.props.sampleTest[1], this.props.audioCtx.currentTime);
  }

  clapTest() {
    this.playSample(this.props.audioCtx, this.props.sampleTest[2], this.props.audioCtx.currentTime);
  }

  render() {
    return (
      <div id="pad-test-section">
        <div id="pad-test-inner">
          <div id="pad-left" onMouseDown={this.kickTest} onTouchStart={this.kickTest}></div>
          <div id="pad-right" onMouseDown={this.clapTest} onTouchStart={this.clapTest}></div>
        </div>
      </div>
    );
  }
}

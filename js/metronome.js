"use strict";

class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metroBPM: 100,
      btnRepeatSpeed: 200
    };
    this.metroBtnUp = this.metroBtnUp.bind(this);
    this.playSample = this.playSample.bind(this);
    this.metronomeToggle = this.metronomeToggle.bind(this);
    this.metronomeTimeout = null;
    this.metroTempoDown = this.metroTempoDown.bind(this);
    this.metroTempoUp = this.metroTempoUp.bind(this);
    this.metroTempoTimeout = null;
  }

  metroBtnUp(event) {
    if(event !== undefined) {
      clearTimeout(this.metroTempoTimeout);

      this.setState({
        btnRepeatSpeed: 200
      });

      event.currentTarget.style.boxShadow = "6px 6px 6px rgba(0,0,0, 1.0), inset 0 0 0 0 rgba(255, 255, 255, 0.0)";
    }
  }

  playSample(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(audioContext.currentTime + time);
    return sampleSource;
  }

  metronomeToggle(event) {
    if(this.props.power === "on") {
      if(this.props.metronomePlaying === false && event !== undefined) {
        clearTimeout(this.metronomeTimeout);

        this.props.toggleMetronomePlaying();

        if(this.props.audioCtx.state === "suspended") {
          this.props.audioCtx.resume();
        }
        this.playSample(this.props.audioCtx, this.props.sampleTest, 0);

// TEST
        this.playSample(this.props.audioCtx, this.props.sampleTest, 0.214);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 0.428);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 0.642);

        this.playSample(this.props.audioCtx, this.props.sampleTest, 0.856);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 0.963);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 1.070);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 1.284);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 1.498);

        this.playSample(this.props.audioCtx, this.props.sampleTest, 1.712);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 1.926);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 2.140);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 2.354);

        this.playSample(this.props.audioCtx, this.props.sampleTest, 2.568);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 2.675);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 2.782);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 2.996);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 3.210);

        this.playSample(this.props.audioCtx, this.props.sampleTest, 3.424);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 3.638);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 3.852);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 4.066);

        this.playSample(this.props.audioCtx, this.props.sampleTest, 4.280);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 4.387);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 4.494);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 4.708);
        this.playSample(this.props.audioCtx, this.props.sampleTest, 4.922);
// TEST

        event.currentTarget.style.boxShadow = "4px 4px 6px rgba(0,0,0, 1.0)";

        // this.metronomeTimeout = setTimeout(function() {
        //   this.metronomeToggle();
        // }.bind(this), ((60 / this.state.metroBPM) * 1000) );
      }
      else if(this.props.metronomePlaying === true && event === undefined) {
        let audio = document.getElementById("metroAudio").cloneNode(true);

        audio.volume = this.props.volume;
        audio.play();
        // console.log("metronome ticked");

        this.metronomeTimeout = setTimeout(function() {
          this.metronomeToggle();
        }.bind(this), ((60 / this.state.metroBPM) * 1000) );
      }
      else if(this.props.metronomePlaying === true && event !== undefined) {
        clearTimeout(this.metronomeTimeout);

        this.props.toggleMetronomePlaying();

        event.currentTarget.style.boxShadow = "4px 4px 6px rgba(0,0,0, 1.0)";
      }
    }
  }

  metroTempoDown(event) {
    if(this.props.power === "on" && this.props.metronomePlaying === false && this.state.metroBPM > 40) {
      if(event !== undefined) {
        event.currentTarget.style.boxShadow = "4px 4px 6px rgba(0,0,0, 1.0), inset 0 0 100px 100px rgba(255, 255, 255, 0.5)";
      }
      else if(this.state.btnRepeatSpeed > 20) {
        this.setState({
          btnRepeatSpeed: this.state.btnRepeatSpeed - 20
        });
      }

      this.setState({
        metroBPM: this.state.metroBPM - 1
      });

      this.metroTempoTimeout = setTimeout(function() {
        if(this.state.metroBPM > 40) {
          this.metroTempoDown();
        }
      }.bind(this), this.state.btnRepeatSpeed);
    }
  }

  metroTempoUp(event) {
    if(this.props.power === "on" && this.props.metronomePlaying === false && this.state.metroBPM < 200) {
      if(event !== undefined) {
        event.currentTarget.style.boxShadow = "4px 4px 6px rgba(0,0,0, 1.0), inset 0 0 100px 100px rgba(255, 255, 255, 0.5)";
      }
      else if(this.state.btnRepeatSpeed > 20) {
        this.setState({
          btnRepeatSpeed: this.state.btnRepeatSpeed - 20
        });
      }

      this.setState({
        metroBPM: this.state.metroBPM + 1
      });

      this.metroTempoTimeout = setTimeout(function() {
        if(this.state.metroBPM < 200) {
          this.metroTempoUp();
        }
      }.bind(this), this.state.btnRepeatSpeed);
    }
  }

  metroDisplayStyle() {
    if(this.props.power === "on") {
      return "metro-display metro-display-on";
    }
    else {
      return "metro-display metro-display-off"
    }
  }

  metroBtnStyle(btn) {
    if(this.props.power === "on" && this.props.metronomePlaying === true && btn === "metro-toggle-btn") {
      return "metro-btn metro-btn-on metro-btn-active";
    }
    else if(this.props.power === "on" && this.props.metronomePlaying === false) {
      return "metro-btn metro-btn-on metro-btn-on";
    }
    else {
      return "metro-btn metro-btn-off"
    }
  }

  metroGlowStyle(btn) {
    if(this.props.power === "on" && this.props.metronomePlaying === true && btn === "metro-toggle-btn") {
      return "metro-glow metro-glow-on";
    }
    else if(this.props.power === "on" && this.props.metronomePlaying === false) {
      return "metro-glow metro-glow-on";
    }
    else {
      return "metro-glow metro-glow-off"
    }
  }

  render() {
    return (
      <div id="metronome-section">
        <div id="metronome-container">
          <p id="metro-header">Metronome</p>

          <div id="metro-container-inner">
            <div id="metro-display">
              <p className={this.metroDisplayStyle()}>{this.state.metroBPM} BPM</p>
            </div>

            <div id="metro-controls">
              <div className={this.metroBtnStyle("metro-toggle-btn")} onMouseDown={this.metronomeToggle}
              onMouseUp={this.metroBtnUp} onMouseLeave={this.metroBtnUp}>
                <div className={this.metroGlowStyle("metro-toggle-btn")}></div>
                <div id="metro-play-stop-span">
                   <i className="fas fa-play"></i> <span id="metro-slash-span">/</span> <i className="fas fa-stop"></i>
                 </div>
              </div>

              <div className={this.metroBtnStyle()} onMouseDown={this.metroTempoDown}
              onMouseUp={this.metroBtnUp} onMouseLeave={this.metroBtnUp}>
                <div className={this.metroGlowStyle()}>
                  <i className="fas fa-caret-down"></i>
                </div>
              </div>

              <div className={this.metroBtnStyle()} onMouseDown={this.metroTempoUp}
              onMouseUp={this.metroBtnUp} onMouseLeave={this.metroBtnUp}>
                <div className={this.metroGlowStyle()}>
                  <i className="fas fa-caret-up"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

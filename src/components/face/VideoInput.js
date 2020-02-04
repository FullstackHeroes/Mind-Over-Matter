import React, { Component } from "react";
import { connect } from "react-redux";
import Webcam from "react-webcam";
import { loadModels, getFaceDescr } from "../../utils/faceBase";
import { sentimentAlgo } from "../../utils/utilities";
import { getLSScoreObj } from "../../store";

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      snapInterval: 3000,
      dbInterval: (15 * 60 * 1000) / 30, // 15 MINUTES
      facingMode: "user",
      detections: null
    };
  }

  componentDidMount = async () => {
    await loadModels();
    this.startCapture();
  };

  // LOCAL STORAGE MANAGER
  appendLocalStorage = (snapshot, userId = 1) => {
    snapshot.timeStamp = new Date();
    snapshot.userId = userId; // TEMP HARDCODE !!
    if (localStorage.getItem("snapshots")) {
      const currSnapshot = JSON.parse(localStorage.getItem("snapshots"));
      currSnapshot.push(snapshot);
      localStorage.setItem("snapshots", JSON.stringify(currSnapshot));
      this.props.getLSScoreObj(currSnapshot);
    } else {
      localStorage.setItem("snapshots", JSON.stringify([snapshot]));
      this.props.getLSScoreObj([snapshot]);
    }
  };

  // TIME INTERVAL FOR CAPTURING SNAPSHOTS
  startCapture = () => {
    const { user } = this.props;
    if (user && user.id) {
      this.interval = setInterval(() => {
        this.capture();
      }, this.state.snapInterval);
    }
  };

  // CAPTURING SNAPSHOT AND APPENDING LOCAL STORAGE
  capture = () => {
    try {
      if (!!this.webcam.current) {
        getFaceDescr(this.webcam.current.getScreenshot(), inputSize).then(
          fullDesc => {
            if (!!fullDesc && fullDesc.length) {
              this.setState({
                detections: fullDesc.map(fd => fd.detection)
              });

              const desc = fullDesc[0],
                screenScore = desc.detection._score,
                expressions = desc.expressions,
                fullScoreObj = sentimentAlgo(screenScore, expressions);

              // APPENDING LOCAL STORAGE
              this.appendLocalStorage(fullScoreObj);
            } else console.error("WAHH -- no current detection");
          }
        );
      }
    } catch (error) {
      console.error("WAHH --", error);
    }
  };

  // TIME INTERVAL FOR NORMALIZED SCORE AND DB INTERACTION
  startDatabase = () => {
    this.interval = setInterval(() => {
      this.pushToDatabase();
    }, this.state.dbInterval);
  };

  pushToDatabase = () => {
    console.log("VIDEO DATABSE !!");
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { detections, facingMode } = this.state;
    let videoConstraints = null;
    let detected = "";

    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
    }

    // DETECTION BOX CODE (POSSIBLY OPTIONAL)
    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, idx) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        detected = "detected";

        return (
          <div key={idx}>
            GOT DETECTIONS!
            <div
              style={{
                position: "absolute",
                border: "solid",
                borderColor: "blue",
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            />
          </div>
        );
      });
    }

    return (
      <div className="cameraFullDiv">
        <div className={detected}></div>
        <div
          className="camera"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "black"
          }}>
          <div
            style={{
              width: WIDTH,
              height: HEIGHT,
              opacity: 1
            }}>
            <div style={{ position: "relative", width: WIDTH }}>
              {!!videoConstraints ? (
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "black"
                  }}>
                  <Webcam
                    audio={false}
                    width={WIDTH}
                    height={HEIGHT}
                    ref={this.webcam}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </div>
              ) : null}
              {!!drawBox ? drawBox : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLSScoreObj: LSData => dispatch(getLSScoreObj(LSData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoInput);

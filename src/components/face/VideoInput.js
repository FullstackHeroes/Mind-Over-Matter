import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Webcam from "react-webcam";
import { loadModels, getFaceDescr } from "../../utils/faceBase";
import {
  sentimentAlgo,
  calcWeightedTrueScore,
  dateCreate
} from "../../utils/utilities";
import PopUp from "../global/PopUp";
import {
  setNormalizedScore,
  postCurrentRunningSentiment,
  setFullScoreObj,
  postNormalizedScore,
  postLSScoreObj,
  getTimeInterval
} from "../../store";

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      detections: null
    };
  }

  componentDidMount = async () => {
    await loadModels();
    this.props.getTimeInterval();
  };

  componentDidUpdate(prevProps) {
    const { snapInterval, dbInterval, user } = this.props;
    if (
      snapInterval !== prevProps.snapInterval ||
      dbInterval !== prevProps.dbInterval
    ) {
      this.startCapture();
      this.startDatabase();
    }
  }

  // LOCAL STORAGE MANAGER
  appendLocalStorage = (snapshot, userId) => {
    const date = dateCreate(),
      hoursDiff = date.getHours() - date.getTimezoneOffset() / 60,
      minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);
    snapshot.timeStamp = date;
    snapshot.userId = userId;
    if (localStorage.getItem("snapshots")) {
      const currSnapshot = JSON.parse(localStorage.getItem("snapshots"));
      currSnapshot.push(snapshot);
      localStorage.setItem("snapshots", JSON.stringify(currSnapshot));
      this.props.setFullScoreObj(userId);
    } else {
      localStorage.setItem("snapshots", JSON.stringify([snapshot]));
      this.props.setFullScoreObj(userId);
    }
  };

  // TIME INTERVAL FOR CAPTURING SNAPSHOTS
  startCapture = () => {
    const { user } = this.props;
    if (user && user.id) {
      this.intervalSnap = setInterval(() => {
        this.capture(user.id);
        this.props.setNormalizedScore(user.id);
      }, this.props.snapInterval);
    }
  };

  // CAPTURING SNAPSHOT AND APPENDING LOCAL STORAGE
  capture = async userId => {
    try {
      if (!!this.webcam.current) {
        await getFaceDescr(this.webcam.current.getScreenshot(), inputSize).then(
          async fullDesc => {
            if (!!fullDesc && fullDesc.length) {
              this.setState({
                detections: fullDesc.map(fd => fd.detection)
              });

              const desc = fullDesc[0],
                screenScore = desc.detection._score,
                expressions = desc.expressions,
                fullScoreObj = sentimentAlgo(screenScore, expressions);

              // APPENDING LOCAL STORAGE
              this.appendLocalStorage(fullScoreObj, userId);

              //USER DATA AND CALCULATIONS
              const { normalizedScore } = this.props,
                mostRecentNormalized =
                  normalizedScore[normalizedScore.length - 1].normalizeScore,
                RunningTrueScore = await calcWeightedTrueScore(userId);
              this.props.postCurrentRunningSentiment(
                (RunningTrueScore / mostRecentNormalized) * 100
              );
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
    const { user } = this.props;
    if (user && user.id) {
      this.intervalDB = setInterval(() => {
        this.pushToDatabase(user.id);
      }, this.props.dbInterval);
    }
  };

  pushToDatabase = userId => {
    try {
      const currSnapshot = JSON.parse(localStorage.getItem("snapshots"));
      if (currSnapshot && currSnapshot.length) {
        this.props.postNormalizedScore(userId);
        this.props.postLSScoreObj(userId);
      }
    } catch (error) {
      console.error("WAHH --", error);
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalSnap);
    clearInterval(this.intervalDB);
  }

  render() {
    const { detections } = this.state;
    const videoConstraints = {
      width: WIDTH,
      height: HEIGHT,
      facingMode: "user"
    };
    let detected = "";

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
            alignItems: "center"
            // backgroundColor: "black"
          }}>
          <div
            // TO ADD THE CAMERA BACK, width: WIDTH, height: HEIGHT, opacity: 1
            style={{
              width: 0,
              height: 0,
              opacity: 0
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
            <div
              style={{
                position: "relative"
              }}></div>
          </div>
        </div>
        {/* <PopUp currentSentiment={this.props.currentRunningSentiment} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    snapInterval: state.score.snapInterval,
    dbInterval: state.score.dbInterval,
    normalizedScore: state.score.normalizedScore,
    currentRunningSentiment: state.score.currentRunningSentiment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    postNormalizedScore: userId => dispatch(postNormalizedScore(userId)),
    postLSScoreObj: userId => dispatch(postLSScoreObj(userId)),
    getTimeInterval: (snapInterval, dbInterval) =>
      dispatch(getTimeInterval(snapInterval, dbInterval)),
    setNormalizedScore: userId => dispatch(setNormalizedScore(userId)),
    postCurrentRunningSentiment: currentSentiment =>
      dispatch(postCurrentRunningSentiment(currentSentiment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoInput);

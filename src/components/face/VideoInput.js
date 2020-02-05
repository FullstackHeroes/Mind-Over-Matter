import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Webcam from "react-webcam";
import { setNormalizedScore } from "../../store";
import { loadModels, getFaceDescr } from "../../utils/faceBase";
import {
  sentimentAlgo,
  calcWeightedTrueScore,
  percentDifference
} from "../../utils/utilities";
import PopUp from "../global/PopUp";
import {
  setFullScoreObj,
  postNormalizedScore,
  postLSScoreObj,
  getTimeInterval
} from "../../store";
import { relative } from "path";

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      facingMode: "user",
      detections: null,
      showPopUp: false,
      emoPercent: 0
    };
  }

  componentDidMount = async () => {
    await loadModels();
    this.props.getTimeInterval();
    // this.startCapture();
    // this.startDatabase();
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

  // BIND METHODS

  // LOCAL STORAGE MANAGER
  appendLocalStorage = (snapshot, userId) => {
    snapshot.timeStamp = new Date();
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
                mostRecentNormalized = normalizedScore[0].normalizeScore,
                RunningTrueScore = await calcWeightedTrueScore(userId),
                perDiff = percentDifference(
                  RunningTrueScore,
                  mostRecentNormalized
                );

              //THE TRIGGER TO SHOW THE HELP MODAL
              console.log("percent diff:", perDiff);
              if (perDiff <= 45) {
                this.setState({
                  emoPercent: perDiff
                });
                this.showHelp();
              }
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

  showHelp = () => {
    this.setState({ showPopUp: true });
  };

  hideHelp = () => {
    this.setState({ showPopUp: false });
  };

  componentWillUnmount() {
    clearInterval(this.intervalSnap);
    clearInterval(this.intervalDB);
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
        <PopUp show={this.state.showPopUp} onClose={this.hideHelp} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    snapInterval: state.score.snapInterval,
    dbInterval: state.score.dbInterval,
    normalizedScore: state.score.normalizedScore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    postNormalizedScore: userId => dispatch(postNormalizedScore(userId)),
    postLSScoreObj: userId => dispatch(postLSScoreObj(userId)),
    getTimeInterval: (snapInterval, dbInterval) =>
      dispatch(getTimeInterval(snapInterval, dbInterval)),
    setNormalizedScore: userId => dispatch(setNormalizedScore(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoInput);

import React, { Component } from "react";
import { connect } from "react-redux";
import Webcam from "react-webcam";
import { loadModels, getFaceDescr } from "../../utils/faceBase";
import { sentimentAlgo, dateCreate } from "../../utils/utilities";
import {
  setNormalizedScore,
  setFullScoreObj,
  postNormalizedScore,
  postLSScoreObj,
  getTimeInterval,
  postFullScoreObj
} from "../../store";

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
  }

  componentDidMount = async () => {
    await loadModels();
    this.props.getTimeInterval();
    const { user } = this.props;
    if (user && user.id) {
      this.props.setFullScoreObj(user.id);
    }
  };

  componentDidUpdate(prevProps) {
    const { snapInterval } = this.props;
    if (snapInterval !== prevProps.snapInterval) {
      this.startCapture();
      // this.startDatabase();
    }
  }

  // // LOCAL STORAGE MANAGER
  // appendLocalStorage = (snapshot, userId) => {
  //   // SET APPROPRIATE DATE AND FIELDS ONTO OBJECT
  //   const date = dateCreate(),
  //     hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
  //   date.setHours(hoursDiff);
  //   snapshot.timeStamp = date;
  //   snapshot.userId = userId;

  //   // CHECK FOR EXISTING LOCAL STORAGE USAGE
  //   if (localStorage.getItem("snapshots")) {
  //     const currSnapshot = JSON.parse(localStorage.getItem("snapshots"));
  //     currSnapshot.push(snapshot);
  //     localStorage.setItem("snapshots", JSON.stringify(currSnapshot));
  //     // this.props.setFullScoreObj(userId);

  //     // PUSHING TO DATABASE FUNCTIONALITY
  //     this.props.postLSScoreObj(userId);
  //     this.props.postNormalizedScore(userId);
  //   } else {
  //     localStorage.setItem("snapshots", JSON.stringify([snapshot]));
  //     // this.props.setFullScoreObj(userId);

  //     // PUSHING TO DATABASE FUNCTIONALITY
  //     this.props.postLSScoreObj(userId);
  //     this.props.postNormalizedScore(userId);
  //   }
  // };

  // TIME INTERVAL FOR CAPTURING SNAPSHOTS
  startCapture = () => {
    const { user } = this.props;
    if (user && user.id) {
      this.intervalSnap = setInterval(() => {
        this.capture(user.id);
        // this.props.setNormalizedScore(user.id);
      }, this.props.snapInterval);
    }
  };

  // CAPTURING SNAPSHOT AND APPENDING LOCAL STORAGE
  capture = async userId => {
    try {
      if (this.webcam.current) {
        await getFaceDescr(this.webcam.current.getScreenshot(), inputSize).then(
          async fullDesc => {
            if (fullDesc && fullDesc.length) {
              const desc = fullDesc[0],
                screenScore = desc.detection._score,
                expressions = desc.expressions,
                newScoreObj = sentimentAlgo(screenScore, expressions),
                date = dateCreate(),
                hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;

              // SETTING REMAINING ATTRIBUTES
              date.setHours(hoursDiff);
              newScoreObj.timeStamp = date;
              newScoreObj.userId = userId;

              this.props.postFullScoreObj(newScoreObj, userId);
              // APPENDING LOCAL STORAGE AND UPDATE GLOBAL STATE
              // this.appendLocalStorage(fullScoreObj, userId);
            } else console.error("Oh oh, no current webcam detection");
          }
        );
      }
    } catch (error) {
      console.error("WAHH --", error);
    }
  };

  // TIME INTERVAL FOR NORMALIZED SCORE AND DB INTERACTION
  // startDatabase = () => {
  //   const { user } = this.props;
  //   if (user && user.id) {
  //     this.intervalDB = setInterval(() => {
  //       this.pushToDatabase(user.id);
  //     }, this.props.dbInterval);
  //   }
  // };

  // pushToDatabase = userId => {
  //   try {
  //     const currSnapshot = JSON.parse(localStorage.getItem("snapshots"));
  //     if (currSnapshot && currSnapshot.length) {
  //       this.props.postNormalizedScore(userId);
  //       this.props.postLSScoreObj(userId);
  //     }
  //   } catch (error) {
  //     console.error("WAHH --", error);
  //   }
  // };

  componentWillUnmount() {
    clearInterval(this.intervalSnap);
    // clearInterval(this.intervalDB);
  }

  render() {
    const videoConstraints = {
      width: WIDTH,
      height: HEIGHT,
      facingMode: "user"
    };

    return (
      <div className="videoInputDiv">
        <div className="cameraDiv">
          <Webcam
            audio={false}
            width={WIDTH}
            height={HEIGHT}
            ref={this.webcam}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    snapInterval: state.score.snapInterval,
    normalizedScore: state.score.normalizedScore,
    sentimentDiff: state.score.sentimentDiff
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
    postFullScoreObj: (newScoreObj, userId) =>
      dispatch(postFullScoreObj(newScoreObj, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoInput);

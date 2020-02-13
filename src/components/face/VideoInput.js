import React, { Component } from "react";
import { connect } from "react-redux";
import Webcam from "react-webcam";
import { loadModels, getFaceDescr } from "../../utils/faceBase";
import { sentimentAlgo, dateCreate } from "../../utils/utilities";
import {
  getTimeInterval,
  setFullScoreObj,
  postFullScoreObj,
  noDetection
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
    if (user && user.id) this.props.setFullScoreObj(user.id);
  };

  componentDidUpdate(prevProps) {
    const { snapInterval } = this.props;
    if (snapInterval !== prevProps.snapInterval) {
      this.startCapture();
    }
  }

  // TIME INTERVAL FOR CAPTURING SNAPSHOTS
  startCapture = () => {
    const { user, snapInterval } = this.props;
    let startDate = 0;

    if (user && user.id) {
      this.intervalSnap = setInterval(async () => {
        if (this.webcam.current && !startDate) {
          await getFaceDescr(this.webcam.current.getScreenshot(), inputSize);
          startDate = dateCreate();
        }

        if (dateCreate() - startDate >= 2000) {
          this.capture(user.id);
        }
      }, snapInterval);
    }
  };

  // CAPTURING SNAPSHOT AND APPENDING LOCAL STORAGE
  capture = async userId => {
    try {
      if (this.webcam.current) {
        await getFaceDescr(this.webcam.current.getScreenshot(), inputSize).then(
          fullDesc => {
            if (fullDesc && fullDesc.length) {
              const desc = fullDesc[0],
                screenScore = desc.detection._score,
                expressions = desc.expressions,
                newScoreObj = sentimentAlgo(screenScore, expressions),
                clientDate = dateCreate(),
                date = dateCreate(),
                hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;

              // SETTING REMAINING ATTRIBUTES
              date.setHours(hoursDiff);
              newScoreObj.userId = userId;
              newScoreObj.timeStamp = date;
              newScoreObj.clientTimeStamp = clientDate;
              newScoreObj.count = 1;
              newScoreObj.screenTime = this.props.snapInterval / 1000;

              // POST INTO DB AND UPDATE GLOBAL STATE
              this.props.postFullScoreObj(this.props.fullScoreObj, newScoreObj);
            } else {
              // NOT RECEIVING ANY DETECTIONS
              this.props.noDetection();
              console.error("Oh oh, no current webcam detection");
            }
          }
        );
      }
    } catch (error) {
      console.error("WAHH --", error);
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalSnap);
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
    fullScoreObj: state.score.fullScoreObj
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTimeInterval: (snapInterval, dbInterval) =>
      dispatch(getTimeInterval(snapInterval, dbInterval)),
    setFullScoreObj: userId => dispatch(setFullScoreObj(userId)),
    postFullScoreObj: (fullScoreObj, newScoreObj) =>
      dispatch(postFullScoreObj(fullScoreObj, newScoreObj)),
    noDetection: () => dispatch(noDetection())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoInput);

import React, { Component } from "react";
import Webcam from "react-webcam";
import { loadModels, getFaceDescr, sentimentAlgo } from "../../utils/faceBase";

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      timeInterval: 5000,
      fullDesc: null,
      facingMode: null,
      detections: null,
      descriptors: null
    };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setInputDevice();
  };

  //======================CAMERA SETUP==============================
  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      const videoDevs = devices.filter(device => device.kind === "videoinput");

      if (videoDevs.length < 2) this.setState({ facingMode: "user" });
      else this.setState({ facingMode: { exact: "environment" } });

      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, this.state.timeInterval);
  };

  capture = () => {
    try {
      if (!!this.webcam.current) {
        getFaceDescr(this.webcam.current.getScreenshot(), inputSize).then(
          fullDesc => {
            if (!!fullDesc && fullDesc.length) {
              this.setState({
                detections: fullDesc.map(fd => fd.detection),
                descriptors: fullDesc.map(fd => fd.descriptor)
              });

              const desc = fullDesc[0],
                screenScore = desc.detection._score,
                expressions = desc.expressions,
                fullScoreObj = sentimentAlgo(screenScore, expressions);
              console.log("FINAL -", fullScoreObj);
            } else console.error("WAHH -- no current detection");
          }
        );
      }
    } catch (error) {
      console.error("WAHH --", error);
    }
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
    // if (!!detections && detections.length) {
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

    //===================EMOTION===========================
    return (
      <div className="cameraFullDiv">
        <div className={detected}></div>
        <div
          className="Camera"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: `yellow`
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
                    backgroundColor: `yellow`
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

export default VideoInput;
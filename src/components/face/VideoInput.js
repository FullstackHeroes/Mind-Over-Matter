import React, { Component } from "react";
import Webcam from "react-webcam";
import { loadModels, getFullFaceDescription } from "../../utils/face";

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
      descriptors: null,
      surprised: 0,
      happy: 0,
      angry: 0,
      sad: 0
    };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setInputDevice();
  };

  //======================CAMERA SETUP==============================
  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === "videoinput"
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: "user"
        });
      } else {
        await this.setState({
          facingMode: { exact: "environment" }
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, this.state.timeInterval);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  capture = async () => {
    try {
      if (!!this.webcam.current) {
        await getFullFaceDescription(
          this.webcam.current.getScreenshot(),
          inputSize
        ).then(fullDesc => {
          if (!!fullDesc) {
            this.setState({
              detections: fullDesc.map(fd => fd.detection),
              descriptors: fullDesc.map(fd => fd.descriptor),
              surprised: fullDesc[0].expressions.surprised + 0.05,
              happy: fullDesc[0].expressions.happy + 0.05,
              angry: fullDesc[0].expressions.angry + 0.05,
              sad: fullDesc[0].expressions.sad + 0.05
            });
            const desc = fullDesc[0];
            console.log("FULL DESC -", this.state, desc, Object.keys(desc));
          }
        });
      }
    } catch (error) {
      console.error("WAHH --", error);
    }
  };

  //======================RENDER============================
  render() {
    const { detections, facingMode } = this.state;
    let videoConstraints = null;
    let camera = "";
    let detected = "";

    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
      if (facingMode === "user") {
        camera = "Front";
      } else {
        camera = "Back";
      }
    }

    //===================GOT DETECTIONS========================
    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        detected = "detected";

        return (
          <div key={i}>
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
            ></div>
          </div>
        );
      });
    }

    //===================EMOTION===========================

    return (
      <div>
        <div className={detected}></div>
        <ul className="go">
          <li></li>
        </ul>
        <div
          className="Camera"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: `yellow`
          }}
        >
          <img
            className="cat"
            src="https://static3.depositphotos.com/1002188/167/i/450/depositphotos_1670284-stock-photo-smiley-face-on-ball.jpg"
            alt=""
          ></img>
          <div
            style={{
              width: WIDTH,
              height: HEIGHT,
              opacity: 0
            }}
          >
            <div style={{ position: "relative", width: WIDTH }}>
              {!!videoConstraints ? (
                <div>
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: `yellow`
                    }}
                  >
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

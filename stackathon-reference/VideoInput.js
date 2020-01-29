import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Webcam from 'react-webcam'
import { loadModels, getFullFaceDescription } from './face'

// Import face profile
// const JSON_PROFILE = require('../descriptors/bnk48.json')

const WIDTH = 420
const HEIGHT = 420
const inputSize = 160
const neutralCat = require('../img/meh.jpg')
const surprisedCat = require('../img/surprised.jpg')
const happyCat = require('../img/happy.jpg')
const angryCat = require('../img/angry.jpg')
const sadCat = require('../img/sad.jpg')
const home = require('../img/home.png')

class VideoInput extends Component {
  constructor(props) {
    super(props)
    this.webcam = React.createRef()
    this.state = {
      fullDesc: null,
      // detections: null,
      // descriptors: null,
      // faceMatcher: null,
      // match: null,
      facingMode: null,
      surprised: 0,
      happy: 0,
      angry: 0,
      sad: 0,
      // disgusted: 0,
    }
  }

  componentWillMount = async () => {
    await loadModels()
    // this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) })
    this.setInputDevice()
  }

  //===================CAMERA SETUP=================================
  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      )
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user',
        })
      } else {
        await this.setState({
          facingMode: { exact: 'environment' },
        })
      }
      this.startCapture()
    })
  }

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture()
    }, 150)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
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
            })
            this.setState({
              surprised: fullDesc[0].expressions.surprised + 0.05,
              happy: fullDesc[0].expressions.happy + 0.05,
              angry: fullDesc[0].expressions.angry + 0.05,
              sad: fullDesc[0].expressions.sad + 0.05,

              // disgusted: fullDesc[0].expressions.disgusted + 0.05,
            })
            console.log(fullDesc)
          }
        })

        // if (!!this.state.descriptors && !!this.state.faceMatcher) {
        //   let match = await this.state.descriptors.map(descriptor =>
        //     this.state.faceMatcher.findBestMatch(descriptor)
        //   )
        //   this.setState({ match })
        // }
      }
    } catch (error) {
      console.error('womp, womp', error)
    }
  }

  //======================RENDER==============================
  render() {
    const { detections, facingMode } = this.state
    let videoConstraints = null
    let camera = ''
    let detected = ''

    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode,
      }
      if (facingMode === 'user') {
        camera = 'Front'
      } else {
        camera = 'Back'
      }
    }

    //===================GOT DETECTIONS=================================
    let drawBox = null
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height
        let _W = detection.box.width
        let _X = detection.box._x
        let _Y = detection.box._y
        detected = 'detected'

        return (
          <div key={i}>
            GOT DETECTIONS!
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`,
              }}
            >
              {/* {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`,
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null} */}
            </div>
          </div>
        )
      })
    }

    //===================SURPRISED=================================
    if (this.state.surprised < 1.2 && this.state.surprised > 0.7) {
      return (
        <div>
          <div className={detected}></div>
          <ul className="go">
            <li>
              <Link to="/">
                <img className={'emoji'} src={home} alt=""></img>
              </Link>
            </li>
          </ul>
          <div
            className="Camera"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: `yellow`,
            }}
          >
            <img
              className="cat"
              src={surprisedCat}
              alt=""
              // "https://i.pinimg.com/originals/c4/0d/7a/c40d7a7060fb74926c257db982b6ddaf.jpg"
            ></img>
            <div
              style={{
                width: WIDTH,
                height: HEIGHT,
                opacity: 0,
              }}
            >
              <div style={{ position: 'relative', width: WIDTH }}>
                {!!videoConstraints ? (
                  <div>
                    <div
                      style={{
                        position: 'absolute',
                        backgroundColor: `yellow`,
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
      )
    }

    //===================ANGRY=================================
    else if (this.state.angry < 1.2 && this.state.angry > 0.4)
      return (
        <div>
          <div className={detected}></div>
          <ul className="go">
            <li>
              <Link to="/">
                <img className={'emoji'} src={home} alt=""></img>
              </Link>
            </li>
          </ul>
          <div
            className="Camera"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: `red`,
            }}
          >
            <img
              className="cat"
              src={angryCat}
              alt=""
              // "https://i.redd.it/rtt7bv8c02611.jpg"
            />
            <div
              style={{
                width: WIDTH,
                height: HEIGHT,
                opacity: 0,
              }}
            >
              <div style={{ position: 'relative', width: WIDTH }}>
                {!!videoConstraints ? (
                  <div>
                    <div
                      style={{
                        position: 'absolute',
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
      )

    //===================HAPPY=================================
    if (this.state.happy < 1.2 && this.state.happy > 0.4) {
      return (
        <div>
          <div className={detected}></div>
          <ul className="go">
            <li>
              <Link to="/">
                <img className={'emoji'} src={home} alt=""></img>
              </Link>
            </li>
          </ul>
          <div
            className="Camera"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: `cyan`,
            }}
          >
            <img
              className="cat"
              src={happyCat}
              alt=""
              // "http://wuvely.com/wp-content/uploads/2017/07/ba09d341bd80f67c0ce3ff36f3aef6a4.jpg"
            />
            <div
              style={{
                width: WIDTH,
                height: HEIGHT,
                opacity: 0,
              }}
            >
              <div style={{ position: 'relative', width: WIDTH }}>
                {!!videoConstraints ? (
                  <div>
                    <div
                      style={{
                        position: 'absolute',
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
      )
    }

    //===================SAD=================================
    if (this.state.sad < 1.2 && this.state.sad > 0.4) {
      return (
        <div>
          <div className={detected}></div>
          <ul className="go">
            <li>
              <Link to="/">
                <img className={'emoji'} src={home} alt=""></img>
              </Link>
            </li>
          </ul>
          <div
            className="Camera"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: `DarkSlateGrey`,
            }}
          >
            <img
              className="cat"
              src={sadCat}
              alt=""
              // "https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg"
            />
            <div
              style={{
                width: WIDTH,
                height: HEIGHT,
                opacity: 0,
              }}
            >
              <div style={{ position: 'relative', width: WIDTH }}>
                {!!videoConstraints ? (
                  <div>
                    <div
                      style={{
                        position: 'absolute',
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
      )
    }

    //===================Meh=================================
    return (
      <div>
        <div className={detected}></div>
        <ul className="go">
          <li>
            <Link to="/">
              <img className={'emoji'} src={home} alt=""></img>
            </Link>
          </li>
        </ul>
        <div
          className="Camera"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'Linen',
          }}
        >
          <img
            className="cat"
            src={neutralCat}
            alt=""
            // "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
          />
          <div
            style={{
              width: WIDTH,
              height: HEIGHT,
              opacity: 0,
            }}
          >
            <div style={{ position: 'relative', width: WIDTH }}>
              {!!videoConstraints ? (
                <div>
                  <div
                    style={{
                      position: 'absolute',
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
    )
  }
}

export default withRouter(VideoInput)

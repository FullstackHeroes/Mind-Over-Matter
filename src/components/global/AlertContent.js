import React, { Component } from "react";

export default class AlertContent extends Component {
  onClose = () => {
    this.props.onClose && this.props.onClose();
  };

  helpMessage = status => {
    const currentDate = new Date();
    console.log("STATUS: ", status);
    if (currentDate - this.props.lastAlert > 10000) {
      if (status <= 65) {
        return (
          <div className="alertContainer">
            <div align="center">
              <h5>Woah there Buddy!</h5>
              <h5>Step away from your desk and put those hands up!</h5>
              <h5>
                Seems to us like you have had quite the day... you deserve a
                walk
              </h5>
              <h5>Take 10-15 mins to yourself and walk it off</h5>
            </div>
            <div className="alertImgDiv">
              <img
                id="alertImg3"
                src={
                  "https://ctl.s6img.com/society6/img/7YUzbWKPlRNoDuosqB_FyQbfYag/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/8802652faa0d4b5a935d15a2a56436cc/~~/famous-band-walk-road-sign-design-prints.jpg"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                top: 0,
                right: 0
              }}
              onClick={this.onClose}>
              close
            </button>
          </div>
        );
      } else if (status <= 74) {
        return (
          <div className="alertContainer">
            <div align="center">
              <h4>Looking Steamy!</h4>
              <h4>Stretch those legs and go hang out with your buddy Joe!</h4>
            </div>
            <div className="alertImgDiv">
              <img
                src={
                  "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326443/a-cup-of-coffee-that-makes-people-tired.jpg?w=1155&h=1541"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                top: 0,
                right: 0
              }}
              onClick={this.onClose}>
              Got it
            </button>
          </div>
        );
      } else if (status <= 87) {
        return (
          <div className="alertContainer">
            <div align="center">
              <h6>Here is a cute picture, Hope it makes your day!</h6>
            </div>
            <div>
              <img
                width="150"
                height="auto"
                src={
                  "https://www.smallbizgenius.net/wp-content/uploads/2019/11/smallbizgenius_favicon.png"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                top: 0,
                right: 0
              }}
              onClick={this.onClose}>
              close
            </button>
          </div>
        );
      } else {
        return null;
      }
    }
  };

  render() {
    return (
      <div className="modalFrame">
        {this.helpMessage(this.props.currentSentiment)}
      </div>
    );
  }
}

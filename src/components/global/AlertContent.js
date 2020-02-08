import React, { Component } from "react";

export default class AlertContent extends Component {
  onClose = () => {
    this.props.onClose && this.props.onClose();
  };

  helpMessage = status => {
    const currentDate = new Date();
    if (currentDate - this.props.lastAlert > 10000) {
      if (status <= 70) {
        return (
          <div className="alertContainer">
            <div>
              <h6>
                Woah there Buddy! Step away from your desk and put those hands
                up! Take 10-15 mins to yourself and walk it off
              </h6>
            </div>
            <div className="alertImgDiv">
              <img
                className="alertImg3"
                src={
                  "https://ctl.s6img.com/society6/img/7YUzbWKPlRNoDuosqB_FyQbfYag/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/8802652faa0d4b5a935d15a2a56436cc/~~/famous-band-walk-road-sign-design-prints.jpg"
                }
              />
            </div>
            <button className="alertButton" onClick={this.onClose}>
              Got it
            </button>
          </div>
        );
      } else if (status <= 78) {
        return (
          <div className="alertContainer">
            <div>
              <h6>
                Looking Steamy! Stretch those legs and go hang out with your
                buddy Cuppa Joe!
              </h6>
            </div>
            <div className="alertImgDiv">
              <img
                className="alertImg3"
                src={
                  "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326443/a-cup-of-coffee-that-makes-people-tired.jpg?w=1155&h=1541"
                }
              />
            </div>
            <button className="alertButton" onClick={this.onClose}>
              Got it
            </button>
          </div>
        );
      } else if (status <= 90) {
        return (
          <div className="alertContainer">
            <div>
              <h6>Here is a cute picture, Hope it makes your day!</h6>
            </div>
            <div className="alertImgDiv">
              <img
                className="alertImg3"
                src={
                  "https://www.smallbizgenius.net/wp-content/uploads/2019/11/smallbizgenius_favicon.png"
                }
              />
            </div>
            <button className="alertButton" onClick={this.onClose}>
              Got it
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

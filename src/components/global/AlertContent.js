import React, { Component } from "react";

export default class AlertContent extends Component {
  onClose = () => {
    this.props.onClose && this.props.onClose();
  };

  helpMessage = status => {
    const currentDate = new Date();
    if (currentDate - this.props.lastAlert > 10000) {
      if (status <= 45) {
        return (
          <div>
            <div>
              <h5>Woah there Buddy!</h5>
              <h5>Step away from your desk and put those hands up!</h5>
              <h5>
                Seems to us like you have had quite the day... you deserve a
                walk
              </h5>
              <h5>Take 10-15 mins to yourself and walk it off</h5>
            </div>
            <div>
              <img
                src={
                  " https://sd.keepcalms.com/i/keep-calm-and-step-away-from-the-computer.png"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                bottom: 0
              }}
              onClick={this.onClose}>
              close
            </button>
          </div>
        );
      } else if (status <= 55) {
        return (
          <div>
            <div>
              <h4>Looking Steamy!</h4>
              <h4>Stretch those legs and go hang out with your buddy Joe!</h4>
            </div>
            <div>
              <img
                src={
                  "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326443/a-cup-of-coffee-that-makes-people-tired.jpg?w=1155&h=1541"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                bottom: 0
              }}
              onClick={this.onClose}>
              close
            </button>
          </div>
        );
      } else if (status <= 65) {
        return (
          <div>
            <div>
              <h4>Here is a cute picture of a cat!</h4>
              <h4>Hope it makes your day!</h4>
            </div>
            <div>
              <img
                src={
                  "https://www.mobilecause.com/wp-content/uploads/2016/03/shutterstock_84271234.jpg>"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                bottom: 0
              }}
              onClick={this.onClose}>
              close
            </button>
          </div>
        );
      } else if (status <= 80) {
        return (
          <div>
            <div>
              <h5>
                Word on the streets is that you think better when hydrated!
              </h5>
              <h5>I think its time you grabbed a drink of water</h5>
              <h5>We would give you ours but its stuck behind this screen</h5>
            </div>
            <div>
              <img
                src={
                  "https://www.sciencenews.org/wp-content/uploads/2018/11/112418_water_feat_free.jpg"
                }
              />
            </div>
            <button
              style={{
                position: "absolute",
                bottom: 0
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
    return <div>{this.helpMessage(this.props.currentSentiment)}</div>;
  }
}
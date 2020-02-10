import React, { Component } from "react";
import { dateCreate } from "../../utils/utilities";

class AlertContent extends Component {
  onClose = () => {
    this.props.onClose && this.props.onClose();
  };

  helpMessage = status => {
    const currentDate = dateCreate();
    console.log("help msg - ", status, currentDate - this.props.lastAlert);

    if (currentDate - this.props.lastAlert > 10000) {
      if (status <= 65) {
        return (
          <div className="alertBackdrop d-flex justify-content-center">
            <div className="alertContainer">
              <div className="modal-dialog">
                <h6>
                  Woah there Buddy! Step away from your desk and put those hands
                  up! Take 10-15 mins to yourself and walk it off
                </h6>
              </div>
              <div className="alertImgDiv">
                <img
                  className="alertImg3"
                  src={
                    "https://i.pinimg.com/736x/df/81/9d/df819dadcce0ce5a6929f25da03a8025--funny-stuff-funny-things.jpg"
                    // "https://ctl.s6img.com/society6/img/7YUzbWKPlRNoDuosqB_FyQbfYag/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/8802652faa0d4b5a935d15a2a56436cc/~~/famous-band-walk-road-sign-design-prints.jpg"
                  }
                />
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="align-self-center btn btn-secondary"
                  onClick={this.onClose}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        );
      } else if (status <= 70) {
        return (
          <div className="alertBackdrop d-flex justify-content-center">
            <div className="alertContainer">
              <div className="modal-dialog">
                <h6>
                  Looking Steamy! Stretch those legs and go hang out with your
                  buddy Cuppa Joe!
                </h6>
              </div>
              <div className="alertImgDiv">
                <img
                  className="alertImg3"
                  src={
                    "https://i.pinimg.com/236x/fe/e9/e0/fee9e0741c5199b830273f88a6c4f8f3--coffee-cafe-cup-of-coffee.jpg"
                    // "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326443/a-cup-of-coffee-that-makes-people-tired.jpg?w=1155&h=1541"
                  }
                />
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="align-self-center btn btn-secondary"
                  onClick={this.onClose}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        );
      } else if (status <= 78) {
        console.log("HELLO ALERT");
        return (
          <div className="alertBackdrop d-flex justify-content-center">
            <div className="alertContainer">
              <div className="modal-dialog">
                <h6>Here is a cute picture, Hope it makes your day!</h6>
              </div>
              <div className="alertImgDiv">
                <img
                  className="alertImg3"
                  src={
                    "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg"
                    // "https://www.smallbizgenius.net/wp-content/uploads/2019/11/smallbizgenius_favicon.png"
                  }
                />
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="align-self-center btn btn-secondary"
                  onClick={this.onClose}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        );
      }
      // else if (
      //   this.props.threeHourSnapCount >=
      //   (this.props.snapInterval / 1000) * 3600
      // ) {
      //   return <div>{this.props.snapInterval}</div>;
      // }
      else {
        return null;
      }
    } else return null;
  };

  render() {
    const { sentimentDiff } = this.props;
    return (
      <div className="alertFullDiv">
        {this.helpMessage(sentimentDiff * 100)}
      </div>
    );
  }
}

export default AlertContent;
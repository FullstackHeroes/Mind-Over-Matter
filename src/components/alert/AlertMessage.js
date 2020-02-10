import React from "react";

const AlertMessage = ({ status, onClose, last }) => {
  const tiers = [last * 0.9, last * 0.95, last];

  const alertOptions = {
    0: {
      message:
        "Woah there Buddy! Step away from your desk and put those hands up! Take 10-15 mins to yourself and walk it off",
      image:
        "https://i.pinimg.com/736x/df/81/9d/df819dadcce0ce5a6929f25da03a8025--funny-stuff-funny-things.jpg"
    },
    1: {
      message:
        "Looking Steamy! Stretch those legs and go hang out with your buddy Cuppa Joe!",
      image:
        "https://i.pinimg.com/236x/fe/e9/e0/fee9e0741c5199b830273f88a6c4f8f3--coffee-cafe-cup-of-coffee.jpg"
    },
    2: {
      message: "Here is a cute picture, Hope it makes your day!",
      image:
        "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg"
    }
  };

  for (let i = 0; i < tiers.length; i++) {
    console.log("inside alert msg -", status, i);
    if (status <= tiers[i]) {
      return (
        <div className="alertFullDiv">
          <div className="alertContainer">
            <div className="alertTextImgDiv">
              <h6>{alertOptions[i].message}</h6>
              <img className="alertImg" src={alertOptions[i].image} />
            </div>

            <div className="alertBtn">
              <button onClick={onClose}>Got it</button>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
};

export default AlertMessage;

// OLD PICTURES
// "https://ctl.s6img.com/society6/img/7YUzbWKPlRNoDuosqB_FyQbfYag/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/8802652faa0d4b5a935d15a2a56436cc/~~/famous-band-walk-road-sign-design-prints.jpg"
// "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326443/a-cup-of-coffee-that-makes-people-tired.jpg?w=1155&h=1541"
// "https://www.smallbizgenius.net/wp-content/uploads/2019/11/smallbizgenius_favicon.png"

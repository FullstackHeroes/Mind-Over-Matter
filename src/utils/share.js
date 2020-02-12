// ---------------------- VERSION 1 ---------------------- //
(function(exports) {
  exports.utilShare = function() {
    return {
      snapIntDefault: 2000,
      dbIntDefault: 20000,
      dateCreate: (dateCreate = () => {
        const date = new Date().toLocaleString("en-US", {
          timeZone: "America/New_York"
        });
        return new Date(date);
      }),
      emotions: [
        "happy",
        "surprised",
        "neutral",
        "disgusted",
        "fearful",
        "angry",
        "sad"
      ],
      sentimentSpectrum: {
        happy: {
          spectrumScore: 10,
          multiplier: 1
        },
        surprised: {
          spectrumScore: 7,
          multiplier: 1
        },
        neutral: {
          spectrumScore: 5,
          multiplier: 2
        },
        disgusted: {
          spectrumScore: 3,
          multiplier: 2
        },
        fearful: {
          spectrumScore: 3,
          multiplier: 2
        },
        angry: {
          spectrumScore: 1,
          multiplier: 4
        },
        sad: {
          spectrumScore: 1,
          multiplier: 3
        }
      },
      calcScreenTime: (calcScreenTime = (length, interval) =>
        (interval * length) / 1000)
    };
  };
})(typeof exports === "undefined" ? (this.utilities = {}) : exports);

// ---------------------- VERSION 2 ---------------------- //
// import {
//   dateCreate,
//   emotions,
//   sentimentSpectrum,
//   snapIntDefault,
//   dbIntDefault,
//   calcScreenTime
// } from "./utils/utilities";

// (function(exports) {
//   exports.utilShare = function() {
//     return {
//       snapIntDefault,
//       dbIntDefault,
//       dateCreate,
//       emotions,
//       sentimentSpectrum
//     };
//   };
// })(typeof exports === "undefined" ? (this.utilities = {}) : exports);

// ---------------------- VERSION 3 ---------------------- //

// const snapIntDefault = 1000;
// const dbIntDefault = 120000;

// const dateCreate = () => {
//   const date = new Date().toLocaleString("en-US", {
//     timeZone: "America/New_York"
//   });
//   return new Date(date);
// };

// const emotions = [
//   "happy",
//   "surprised",
//   "neutral",
//   "disgusted",
//   "fearful",
//   "angry",
//   "sad"
// ];

// const sentimentSpectrum = {
//   happy: {
//     spectrumScore: 10,
//     multiplier: 1
//   },
//   surprised: {
//     spectrumScore: 7,
//     multiplier: 1
//   },
//   neutral: {
//     spectrumScore: 5,
//     multiplier: 2
//   },
//   disgusted: {
//     spectrumScore: 3,
//     multiplier: 2
//   },
//   fearful: {
//     spectrumScore: 3,
//     multiplier: 2
//   },
//   angry: {
//     spectrumScore: 1,
//     multiplier: 4
//   },
//   sad: {
//     spectrumScore: 1,
//     multiplier: 3
//   }
// };

// const calcScreenTime = (length, interval) => (interval * length) / 1000

// (function(exports) {
//   exports.utilShare = function() {
//     return {
//       snapIntDefault,
//       dbIntDefault,
//       dateCreate,
//       emotions,
//       sentimentSpectrum,
//       calcScreenTime
//     };
//   };
// })(typeof exports === "undefined" ? (this.utilities = {}) : exports);

// export {
//   snapIntDefault,
//   dbIntDefault,
//   dateCreate,
//   emotions,
//   sentimentSpectrum,
//   calcScreenTime
// };

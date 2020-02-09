import {
  dateCreate,
  emotions,
  sentimentSpectrum,
  snapIntDefault,
  dbIntDefault
} from "./utils/utilities";

(function(exports) {
  exports.utilShare = function() {
    dateCreate, emotions, sentimentSpectrum, snapIntDefault, dbIntDefault;
  };
})(typeof exports === "undefined" ? (this.utilities = {}) : exports);

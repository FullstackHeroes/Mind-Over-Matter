import axios from "axios";
import store from "../store";

// VARIABLE DRIVERS
const rounding = 10 ** 5; // DECIMAL ROUNDING
const screenWeight = 0.5;
const countWeight = 1 - screenWeight;
export const normalizedLen = 3000; // LENGTH FOR NORMALIZED CALC
const wtdAvgCount = 50; // WEIGHTED AVERAGE COUNT LIMIT

// DATE CREATION FUNCTION
export const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return new Date(date);
};

// SCORING FROM 1-10 (BAD - GOOD) AND MULTIPLIER WILL BE DONE PRO-RATA
let sentimentSpectrum = {
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
    multiplier: 1
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
    multiplier: 1
  },
  sad: {
    spectrumScore: 1,
    multiplier: 3
  }
};

export const sentimentAlgo = (screenScore, expressions) => {
  let totalMultScore = 0,
    totalExpressionScore = 0;
  const fullScoreObj = { trueScore: 0, screenScore };

  // CALCULATING THE TOTAL MULTIPLER SCORE TO BE ABLE TO CALC WEIGHTED AVERAGE
  for (let sent in sentimentSpectrum) {
    totalMultScore += sentimentSpectrum[sent].multiplier;
  }

  // CALCULATING TOTAL GIVEN SCORE FOR PRO-RATA CALC
  for (let sent in expressions) {
    const rawFaceScore = expressions[sent];
    if (!isNaN(rawFaceScore)) {
      const spectrumMult = sentimentSpectrum[sent].multiplier;
      totalExpressionScore += rawFaceScore * (spectrumMult / totalMultScore);
    }
  }

  for (let sent in expressions) {
    const rawFaceScore = expressions[sent],
      spectrumInput = sentimentSpectrum[sent];

    // IGNORING ASSORTEDARRAY KEY FROM INITIAL EXPRESSIONS INPUT
    if (!isNaN(rawFaceScore)) {
      // ADDING INDIVIDUAL SENTIMENT SCORE INTO FINAL OBJECT (%)
      const multiplierEffect = spectrumInput.multiplier / totalMultScore,
        rawScorePercent =
          (rawFaceScore * multiplierEffect) / totalExpressionScore;
      fullScoreObj[sent] = rawScorePercent;

      // IMPACTING TRUE SCORE AFTER WEIGHTING EACH SENTIMENT SCORE
      fullScoreObj.trueScore += rawScorePercent * spectrumInput.spectrumScore;
    }
  }

  return fullScoreObj;
};

export const condenseScoreObj = (targetScoreObj, userId) => {
  if (targetScoreObj && targetScoreObj.length) {
    const condensedLSObj = {
        userId,
        trueScore: 0,
        screenScore: 0,
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
        timeStamp: dateCreate(),
        count: targetScoreObj.length,
        screenTime: 0
      },
      totalScreenScore = targetScoreObj.reduce((acm, val) => {
        return (acm += val.screenScore);
      }, 0),
      { snapInterval } = store.getState().score;

    // WEIGHTED AVERAGE CALCS FOR EACH SENTIMENT SCORE
    targetScoreObj.forEach(snap => {
      condensedLSObj.trueScore +=
        Math.round(
          snap.trueScore * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.neutral +=
        Math.round(
          snap.neutral * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.happy +=
        Math.round(
          snap.happy * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.sad +=
        Math.round(
          snap.sad * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.angry +=
        Math.round(
          snap.angry * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.fearful +=
        Math.round(
          snap.fearful * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.disgusted +=
        Math.round(
          snap.disgusted * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
      condensedLSObj.surprised +=
        Math.round(
          snap.surprised * (snap.screenScore / totalScreenScore) * rounding
        ) / rounding;
    });

    // AVERAGE SCREENSCORE CALC && TIME
    condensedLSObj.screenScore = totalScreenScore / targetScoreObj.length;
    condensedLSObj.screenTime = calcScreenTime(
      condensedLSObj.count,
      snapInterval
    );

    return condensedLSObj;
  } else return {};
};

export const calcNormalizeUtility = async userId => {
  // RETRIEVE BOTH LS AND DB DATAPOINTS AND CONDENSING LS BASE
  const LSScoreObj = JSON.parse(localStorage.getItem("snapshots")),
    { data: dbScoreObj } = await axios.get(`/api/hours/${userId}`),
    condensedLSObj = condenseScoreObj(LSScoreObj, userId);

  // APPEND LS DATA TO DB SCORE OBJ
  if (Object.keys(condensedLSObj).length) dbScoreObj.push(condensedLSObj);

  // GETTING BASIS FOR WEIGHTED AVERAGE CALC
  const shortenFullScore = dbScoreObj.slice(-normalizedLen);
  let totalScreenScore = 0,
    totalCount = 0;
  for (let val of shortenFullScore) {
    totalScreenScore += val.screenScore;
    totalCount += val.count;
  }

  const calcNormalScore = shortenFullScore.reduce((acm, val) => {
    const screenWtdAvg = (val.screenScore / totalScreenScore) * screenWeight,
      countWtdAvg = (val.count / totalCount) * countWeight,
      blendedWtdAvg = screenWtdAvg + countWtdAvg;
    return (acm += val.trueScore * blendedWtdAvg);
  }, 0);

  // CALCULATING AVERAGED (WEIGHTED) NORMALIZE SCORE
  return Math.round(calcNormalScore * rounding) / rounding;
};

//  CALCULATE SCREEN TIME FROM SNAPSHOT ARRAY AND CAPTURE INTERVAL
export const calcScreenTime = (length, interval) => (interval * length) / 1000;

//CALCULATE CURRENT MENTAL STATE USING AXIOS REQUESTS AND STORAGE DATA
export const calcWeightedTrueScore = async userId => {
  //RETRIEVE LS DATA AND DB SCORE OBJECTS AND CONDENSE LS DATA INTO SINGLE OBJ
  const userLocalData = JSON.parse(localStorage.getItem("snapshots"));
  const condensedLSData =
    userLocalData && userLocalData.length
      ? condenseScoreObj(userLocalData, userId)
      : [];
  const { data: userDbData } = await axios.get(`api/hours/${userId}`);

  // APPEND LS DATA TO DB SCORE OBJ
  if (condensedLSData.length) userDbData.push(condensedLSData);

  //ORDER aggUserDataObjArr FROM NEW TO OLD
  const orderArr = userDbData.reverse();

  //BASE DATA FOR WEIGHTED AVG CALC
  let totalScreenScore = 0,
    totalCount = 0,
    i = 0;

  while (i < orderArr.length && totalCount < wtdAvgCount) {
    const obj = orderArr[i];
    totalCount += obj.count;
    totalScreenScore += obj.screenScore;
    i++;
  }

  //SHORTEN OBJ ARR INTO RELEVANT SIZE (wtdAvgCount)
  const shortOrderArr = orderArr.slice(0, i);

  //BEGIN WEIGHTED CALCULATIONS
  const calcNormalScore = shortOrderArr.reduce((acm, data) => {
    const screenWtdAvg = (data.screenScore / totalScreenScore) * screenWeight,
      countWtdAvg = (data.count / totalCount) * countWeight,
      blendedWtdAvg = screenWtdAvg + countWtdAvg;
    return (acm += data.trueScore * blendedWtdAvg);
  }, 0);

  return Math.floor(calcNormalScore * rounding) / rounding;
};

//AVERAGE 15 MINS OF SNAPSHOTS
export const averageLocalStorageSnaps = snaps => {};

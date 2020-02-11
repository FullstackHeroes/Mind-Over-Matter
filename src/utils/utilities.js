import store from "../store";

// VARIABLE DRIVERS
const rounding = 10 ** 5; // DECIMAL ROUNDING
const screenWeight = 0.5; // ADDITIONAL DRIVERS WITHIN WEIGHTED CALCS
const countWeight = 1 - screenWeight; // ADDITIONAL DRIVERS WITHIN WEIGHTED CALCS
export const normalizedLen = 3000; // LENGTH FOR NORMALIZED CALC
const wtdAvgCount = 50; // WEIGHTED AVERAGE COUNT LIMIT
export const snapIntDefault = 2000;
export const dbIntDefault = 2000;
export const d3Height = 400;
export const d3Width = 400;

// DATE CREATION FUNCTION
export const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return new Date(date);
};

export const emotions = [
  "happy",
  "surprised",
  "neutral",
  "disgusted",
  "fearful",
  "angry",
  "sad"
];

// SCORING FROM 1-10 (BAD - GOOD) AND MULTIPLIER WILL BE DONE PRO-RATA
export const sentimentSpectrum = {
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
      fullScoreObj[sent] = Math.floor(rawScorePercent * rounding) / rounding;

      // IMPACTING TRUE SCORE AFTER WEIGHTING EACH SENTIMENT SCORE
      fullScoreObj.trueScore += rawScorePercent * spectrumInput.spectrumScore;
    }
  }

  return fullScoreObj;
};

export const calcNormalizeUtility = fullScoreObj => {
  // GETTING BASIS FOR WEIGHTED AVERAGE CALC
  const shortenFullScore = fullScoreObj.slice(-normalizedLen);
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

// CALCULATE CURRENT MENTAL STATE USING AXIOS REQUESTS AND STORAGE DATA
export const calcWeightedTrueScore = fullScoreObj => {
  // ORDER FROM NEW TO OLD
  const orderArr = fullScoreObj.reverse();

  // BASE DATA FOR WEIGHTED AVG CALC
  let totalScreenScore = 0,
    totalCount = 0,
    i = 0;

  while (i < orderArr.length && totalCount < wtdAvgCount) {
    const obj = orderArr[i];
    totalCount += obj.count;
    totalScreenScore += obj.screenScore;
    i++;
  }

  // SHORTEN OBJ ARR INTO RELEVANT SIZE (wtdAvgCount)
  const shortOrderArr = orderArr.slice(0, i);

  // BEGIN WEIGHTED CALCULATIONS
  const calcNormalScore = shortOrderArr.reduce((acm, data) => {
    const screenWtdAvg = (data.screenScore / totalScreenScore) * screenWeight,
      countWtdAvg = (data.count / totalCount) * countWeight,
      blendedWtdAvg = screenWtdAvg + countWtdAvg;
    return (acm += data.trueScore * blendedWtdAvg);
  }, 0);

  return Math.floor(calcNormalScore * rounding) / rounding;
};

// CALCULATING SENTIMENT DIFF WITH GLOBAL ROUNDING CONSISTENTCY
export const calcSentimentDiff = (running, normal) => {
  return Math.floor((running / normal) * rounding) / rounding;
};

// CALCULATE SCREEN TIME FROM SNAPSHOT ARRAY AND CAPTURE INTERVAL
export const calcScreenTime = (length, interval) => (interval * length) / 1000;

export const fullScreenTimeCalcs = userWtdObj => {
  // SETTING UP THE TIME INGREDIENTS
  const currentDate = dateCreate(),
    hoursDiff = currentDate.getHours() - currentDate.getTimezoneOffset() / 60;

  currentDate.setHours(hoursDiff);

  const oneHourMilli = 3600000,
    twoFourHourMilli = oneHourMilli * 24,
    todayStart = new Date(
      new Date(
        new Date(new Date(currentDate).setHours(0)).setMinutes(0)
      ).setSeconds(0)
    ),
    yesterStart = new Date(todayStart - twoFourHourMilli),
    weekStart = new Date(todayStart - twoFourHourMilli * 7);

  // SETTING UP ALL TIME VARIABLES TO SEND BACK
  let threeHourSnapCount = 0,
    screenMinsToday = 0,
    screenMinsYesterday = 0,
    screenHoursWeek = 0;

  // LOOPING THROUGH OBJECT TO PARSE THROUGH WHAT TO PUT BACK
  for (const ele of userWtdObj.slice((-twoFourHourMilli * 31) / 1000)) {
    // VALUE TIME REFERENCE POINTS
    const valDate = new Date(ele.timeStamp),
      minDiff = (currentDate - valDate) / 1000;

    // THREE HOUR SNAP COUNT
    if (minDiff >= (oneHourMilli * 3) / 1000) threeHourSnapCount += ele.count;

    // TODAY TIMING
    if (valDate >= todayStart) screenMinsToday += ele.screenTime;

    // YESTERDAY TIMING
    if (valDate >= yesterStart && valDate < todayStart)
      screenMinsYesterday += ele.screenTime;

    // PAST 7 DAYS TIMING
    if (valDate >= weekStart && valDate < todayStart)
      screenHoursWeek += Math.round((ele.screenTime / 3600) * 100) / 100;
  }

  return {
    threeHourSnapCount,
    screenMinsToday,
    screenMinsYesterday,
    screenHoursWeek
  };
};

// ---------------------------------- NOT USED ! ---------------------------------- //

// CONDENSING FUNCTION WHEN LEVERAGING LS (NOT USED CURRENTLY)
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

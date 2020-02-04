import axios from "axios";
import store from "../store";

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
    multiplier: 1
  },
  fearful: {
    spectrumScore: 3,
    multiplier: 1
  },
  angry: {
    spectrumScore: 1,
    multiplier: 1
  },
  sad: {
    spectrumScore: 1,
    multiplier: 1
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
  if (targetScoreObj.length) {
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
        timeStamp: new Date(),
        count: targetScoreObj.length,
        screenTime: 0
      },
      totalScreenScore = targetScoreObj.reduce((acm, val) => {
        return (acm += val.screenScore);
      }, 0),
      decimal = 5,
      { snapInterval } = store.getState().score;

    // WEIGHTED AVERAGE CALCS FOR EACH SENTIMENT SCORE
    targetScoreObj.forEach(snap => {
      condensedLSObj.trueScore += Number(
        (snap.trueScore * (snap.screenScore / totalScreenScore)).toFixed(
          decimal
        )
      );
      condensedLSObj.neutral += Number(
        (snap.neutral * (snap.screenScore / totalScreenScore)).toFixed(decimal)
      );
      condensedLSObj.happy += Number(
        (snap.happy * (snap.screenScore / totalScreenScore)).toFixed(decimal)
      );
      condensedLSObj.sad += Number(
        (snap.sad * (snap.screenScore / totalScreenScore)).toFixed(decimal)
      );
      condensedLSObj.angry += Number(
        (snap.angry * (snap.screenScore / totalScreenScore)).toFixed(decimal)
      );
      condensedLSObj.fearful += Number(
        (snap.fearful * (snap.screenScore / totalScreenScore)).toFixed(decimal)
      );
      condensedLSObj.disgusted += Number(
        (snap.disgusted * (snap.screenScore / totalScreenScore)).toFixed(
          decimal
        )
      );
      condensedLSObj.surprised += Number(
        (snap.surprised * (snap.screenScore / totalScreenScore)).toFixed(
          decimal
        )
      );
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

// VARIABLE DETERMINING LENGHT OF MATERIALS FOR NORMALIZED CALC
export const normalizedLen = 3000;

export const calcNormalizeUtility = async userId => {
  // RETRIEVE BOTH LS AND DB DATAPOINTS AND CONDENSING LS BASE
  const LSScoreObj = JSON.parse(localStorage.getItem("snapshots")),
    { data: dbScoreObj } = await axios.get(`/api/hours/${userId}`),
    condensedLSObj = condenseScoreObj(LSScoreObj, userId);

  // APPEND LS DATA TO DB SCORE OBJ
  dbScoreObj.push(condensedLSObj);

  // GETTING BASIS FOR WEIGHTED AVERAGE CALC
  const shortenFullScore = dbScoreObj.slice(-normalizedLen);
  let totalScreenScore = 0,
    totalCount = 0;
  for (let val of shortenFullScore) {
    totalScreenScore += val.screenScore;
    totalCount += val.count;
  }

  const screenWeight = 0.5,
    countWeight = 1 - screenWeight,
    calcNormalScore = shortenFullScore.reduce((acm, val) => {
      const screenWtdAvg = (val.screenScore / totalScreenScore) * screenWeight,
        countWtdAvg = (val.count / totalCount) * countWeight,
        blendedWtdAvg = screenWtdAvg + countWtdAvg;
      return (acm += val.trueScore * blendedWtdAvg);
    }, 0);

  // CALCULATING AVERAGED (WEIGHTED) NORMALIZE SCORE
  return calcNormalScore;
};

//CALCULATE CURRENT MENTAL STATE FROM normScore AND trueScore
export const checkMental = (normScore, trueScore) => {
  let timesDeviated = 0;
  timesDeviated += adjustScore(normScore, trueScore);
  switch (timesDeviated) {
    case 25: //IF THE trueScore DEVIATES FROM THE normScore 25 TIMES (negatively)
      return 1; //EACH RESPONSE OF 1, 2 AND 0 HAVE AN ASSIGNED ALERT TO THEM
    case 50: //IF THE trueScore DEVIATES FROM THE normScore 50 TIMES (negatively)
      timesDeviated = 0;
      return 2;
    default:
      return 0;
  }
};

//HELPER FUNCTION FOR checkMental
function adjustScore(normScore, trueScore) {
  let difference = normScore - trueScore;
  if (difference < trueScore - 2) {
    return 1;
  } else if (diffence > trueScore + 2) {
    return -1;
  }
}

//  CALCULATE SCREEN TIME FROM SNAPSHOT ARRAY AND CAPTURE INTERVAL
export const calcScreenTime = (length, interval) => {
  return (interval * length) / 1000;
};

import * as faceapi from "face-api.js";

export const loadModels = async () => {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  await faceapi.loadFaceExpressionModel(MODEL_URL);
};

export const getFaceDescr = async (blob, inputSize = 512) => {
  // TINY FACE DETECTOR OPTION
  const scoreThreshold = 0.5;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  });
  const useTinyModel = true;

  // FETCH IMAGE FROM API
  const img = await faceapi.fetchImage(blob);

  // GENERATE FULL DESCRIPTION, LANDMARK, DESCRIPTOR FROM ALL DETECTED FACES
  const fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors()
    .withFaceExpressions();

  return fullDesc;
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
  let totalMultScore = 0;
  const fullScoreObj = { trueScore: 0 };

  // CALCULATING THE TOTAL MULTIPLER SCORE TO BE ABLE TO CALC WEIGHTED AVERAGE
  for (let sent in sentimentSpectrum) {
    totalMultScore += sentimentSpectrum[sent].multiplier;
  }

  for (let sent in expressions) {
    let rawFaceScore = expressions[sent],
      spectrumInput = sentimentSpectrum[sent];

    // IGNORING ASSORTEDARRAY KEY FROM INITIAL EXPRESSIONS INPUT
    if (!isNaN(rawFaceScore)) {
      // ADDING INDIVIDUAL SENTIMENT SCORE INTO FINAL OBJECT, NO MULTIPLIER IMPACT
      rawFaceScore *= spectrumInput.spectrumScore;
      fullScoreObj[sent] = rawFaceScore;

      // IMPACTING TRUE SCORE AFTER WEIGHTING EACH SENTIMENT SCORE
      rawFaceScore *= spectrumInput.multiplier / totalMultScore;
      fullScoreObj.trueScore += rawFaceScore * screenScore;
    }
  }

  return fullScoreObj;
};

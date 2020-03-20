import * as faceapi from "face-api.js";

export const loadModels = async () => {
  try {
    const MODEL_URL = "/faceModels";

    await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
  } catch (error) {
    console.error("Model Loading -", error);
  }
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

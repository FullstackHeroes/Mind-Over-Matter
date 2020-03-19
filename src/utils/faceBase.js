import * as faceapi from "face-api.js";
import * as path from "path";

export const loadModels = async () => {
  console.log(
    process.env.NODE_ENV,
    process.env.PUBLIC_URL,
    process.env,
    process,
    "PATH",
    path,
    __dirname,
    "LAST",
    path.join(__dirname, "../faceModels")
  );
  // const MODEL_URL = process.env.PUBLIC_URL + "/faceModels";
  // const MODEL_URL = "/faceModels";
  // const MODEL_URL = "/faceModels";
  let MODEL_URL;
  if (process.env.NODE_ENV === "development") MODEL_URL = "/faceModels";
  else MODEL_URL = __dirname + "faceModels";

  console.log(MODEL_URL);

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

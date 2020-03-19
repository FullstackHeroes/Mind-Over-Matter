import * as faceapi from "face-api.js";
import * as path from "path";

export const loadModels = async () => {
  try {
    console.log(
      process.env.NODE_ENV,
      process.env.PUBLIC_URL + "/faceModels",
      process,
      "PATH",
      path,
      __dirname,
      "LAST",
      path.join(__dirname, "faceModels")
    );

    // const MODEL_URL = process.env.PUBLIC_URL + "/faceModels";
    // const MODEL_URL = "/faceModels";
    // const MODEL_URL = "/faceModels";

    let MODEL_URL;
    if (process.env.NODE_ENV === "development") MODEL_URL = "/faceModels";
    // else MODEL_URL = path.join(__dirname, "../public/faceModels");
    else MODEL_URL = path.join(__dirname, "./faceModels");

    console.log(MODEL_URL);

    await faceapi.nets.ssdMobilenetv1.loadFromDisk(
      path.join(__dirname, "faceModels")
    );
    // await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    // await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    // await faceapi.loadFaceRecognitionModel(MODEL_URL);
    // await faceapi.loadFaceExpressionModel(MODEL_URL);
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

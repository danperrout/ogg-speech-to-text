require("dotenv").config();

const _ = require("lodash");
const speech = require("@google-cloud/speech");
const fs = require("fs");
const { resolve } = require("path");

function speechExtractor(filePath) {
  // Creates a client
  const speechClient = new speech.SpeechClient();

  // The path to the audio file to transcribe

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(filePath);
  const audioBytes = file.toString("base64");
  const audio = {
    content: audioBytes,
  };

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const config = {
    encoding: "OGG_OPUS",
    sampleRateHertz: 16000,
    languageCode: "pt-BR",
    //audio_channel_count:2
  };

  const request = {
    audio,
    config,
  };
  // Detects speech in the audio file
  return speechClient
    .recognize(request)
    .then((data) => {
      const results = _.get(data[0], "results", []);
      const transcription = results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
      //console.log(`Transcription: ${transcription}`);
      return transcription;
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
}

async function getSpeechExtractor(filePath) {
  console.log("extracting -> " + filePath);
  return (result = await speechExtractor(filePath));
}

module.exports = {
  getSpeechExtractor,
};

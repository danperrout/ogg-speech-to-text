const tools = require("./orgis.js");
const fs = require("fs");
require("dotenv").config();

const testFolder = process.env.SOURCE_FOLDER;
var logStream = fs.createWriteStream(process.env.LOG_FILE, { flags: "a" });

fs.readdir(testFolder, (err, files) => {
  let i = 0;
  if (err) throw err;
  files.forEach((file) => {
    i++;
    process.stdout.write(`\rSearching for .ogg files: ${i} ${file}`);
    if (file.includes(".ogg")) {
      console.log(" -> " + file);

      let filePath = testFolder + file;
      tools
        .getSpeechExtractor(filePath)
        .then((result) => {
          let message = `
=====================================
File: ${file}
Datetime: ${new Date().toLocaleString(process.env.LANGUAGE)}
-------------------------------------
${result}
=====================================
`;
          console.log(message);
          logStream.write(message);
        })
        .then(() => {
          var oldPath = filePath;
          var newPath = process.env.DESTINATION_FOLDER + file;

          fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log("File moved to -> " + newPath);
          });
        });
    }
  });
});

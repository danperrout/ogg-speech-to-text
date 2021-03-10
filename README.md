# ogg-speech-to-text

Download any ogg file (e.g. Whatsapp audio) and convert speech to text with this simple script

# Installation

Clone or download this repository:
`git clone https://github.com/danperrout/ogg-speech-to-text.git`

Cd into the folder:
`cd ogg-speech-to-text`

Install the dependecies:
`npm i`

Download your Google Credentials to use the "@google-cloud/speech" API.

Rename the `env.sample` file to `.env`

Set the variables inside the new file:

```
GOOGLE_APPLICATION_CREDENTIALS=<YourGoogleApicredential.json>
SOURCE_FOLDER=/Download/Path/of/ogg/files
DESTINATION_FOLDER=./extracted_audios/
LOG_FILE=log.txt
LANGUAGE=pt-BR
```

# Usage

Download the ogg files to the folder set on the SOURCE_FOLDER variable.

Run, in the terminal:
`node index.js`

Check the log file (LOG_FILE variable)

# Mission to Mars

## Usage

The static folder contains a build for a browser UI. Open `static/browser/index.html` and open an input file (sample input is the `fixtures` folder).

## Test

Run `npm i && npm test`.

## Build

The project uses [browserify](http://browserify.org/) to handle dependecies - for example the browser-example.js is built with `browserify src/ui/browser-example.js -o static/browser/browser-example.js`.

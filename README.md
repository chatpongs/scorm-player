#Scorm Player

This is a SCORM player, it's aim is to parse and display SCORM packaged content.

It's a work in progress, and doesn't support the complete SCORM content yet.

##Setup

Simply place the scorm packages in the `scormPackages` directory.

Use `npm install` to install all the dependencies.

And run `index.js` thorudh node. `node index.js`.

Note that this requires a node version that support ES6 (>= 6).

The content in the scormPackages will be parsed and can be accessed through the
`index.html` files.
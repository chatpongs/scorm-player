/**
 * Created by thihara on 11/1/16.
 */
let fs = require('fs');

let express = require('express');
let app = express();

app.use(express.static('/Users/thihara/workspace/scorm/scormContent',{fallthrough:false}));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
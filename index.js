/**
 * Created by thihara on 11/1/16.
 */
let fs = require('fs'),
    async = require('async'),
    unzip = require('unzip'),
    util = require('util'),
    xmldoc = require('xmldoc'),
    ScormNavTreeBuilder = require('./ScormNavTreeBuilder'),
    ScormModel =  require('./Model'),
    navTreeBuilder = new ScormNavTreeBuilder(),
    ScormContent = ScormModel.ScormContent,
    ScormContentParser = require('./ScormContentParser').ScormContentParser,
    scormParser = new ScormContentParser();

let express = require('express');
let app = express();

let navTreeMap = new Map();

let directory = "./scormPackages";
let files = fs.readdirSync(directory).filter(file => file.endsWith(".zip"));

async.each(files, (file, callback) =>{
    let extractedDirName = file.replace('.zip','');
    let unzipPipe = unzip.Extract({path:`./scormContent/${extractedDirName}`});

    unzipPipe.on("close", () =>{
        let file = `./scormContent/${extractedDirName}/imsmanifest.xml`;

        fs.readFile(file, function (err, data) {
            let scormContent = scormParser.parse(data);

            var navTree = navTreeBuilder.buildNavigationModel(scormContent, extractedDirName);
            navTreeMap.set(extractedDirName, navTree);

            //app.use(`/${extractedDirName}`, express.static(`./scormContent/${extractedDirName}`));
            callback();
        });
    });

    fs.createReadStream(`${directory}/${file}`).pipe(unzipPipe);
}, err => {
    if(err){
        console.log(err);
    }

    app.use(express.static(__dirname + "/static"));
    app.use(express.static(__dirname + "/scormContent",{dotFiles:'allow'}));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/navTree', (req, res) => {
        res.send(navTreeMap.get(req.query.contentID));
    });

    app.get('/content', (req, res) => {
        var keys = [];
        navTreeMap.forEach((value, key) =>{
            keys.push(key);
        });
        res.send(keys);
    });

    app.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
});
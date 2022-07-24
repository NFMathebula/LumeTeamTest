const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs')
const csv = require('csv-parser')
const randomWords = require('random-words')
const app = express();
const parse = require('csv-parse').parse
const os = require('os')
const multer = require('multer')
const upload = multer({ dest: os.tmpdir() })

/*var http = require('http');*/
var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

app.listen(port, () => {
    console.log("Application started and Listening on port " + port);
});
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/CSVUpload.html");
});

//app.post("/", (req, res) => {
//    res.send("Thank you for subscribing");
//});

app.post('/CSVUpload', upload.single('file'), (req, res) => {
    const file = req.file

    const data = fs.readFileSync(file.path)
    parse(data, (err, records) => {
        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, message: 'An error occurred' })
        }

        return res.json({ data: records })
    })
});


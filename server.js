const express = require("express");
const bodyParser = require("body-parser");
const app = express();
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
    res.sendFile(__dirname + "/index.html");
});

//app.post("/", (req, res) => {
//    res.send("Thank you for subscribing");
//});

app.post("/", (req, res) => {
    var Person1 = req.body.Person1;
    var Person2 = req.body.Person2;

    var str = Person1 + "Matches" + Person2
    str = str.replace(" ", "");
    var strSecond = Person2;
    //for (var i = 0; i < str.length; i++) {
    //    var counter = 1

    //    console.log(str + "\n" + str.split("J").length - 1);

    //}

    var a = str;
    var b = {};
    var numbers = [];
    for (let i = 0; i < a.length; i++) {
        if ((a.match(new RegExp(a[i], "g"))).length > 0) {
            b[a[i]] = (a.match(new RegExp(a[i], "g"))).length;
        }
    }
    /*{"J":2,"a":2,"c":2,"k":1,"M":1,"t":1,"h":1,"e":1,"s":1,"i":1,"l":2}*/

    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            /*console.log(key + " -> " + b[key]);*/
            numbers += b[key]
        }
    }

    const half = Math.ceil(numbers.length / 2);

    const firstHalf = numbers.slice(0, half)
    const secondHalf = numbers.slice(half)
    var secondHalfSortOrder = [];
    var FirstTotal = 0;
    Object.keys(secondHalf).reverse()
        .forEach(function (index) {
            /*console.log(secondHalf[index]);*/
            secondHalfSortOrder += secondHalf[index]
        });

    var c = [];
    for (var i = 0; i < Math.max(firstHalf.length, secondHalfSortOrder.length); i++) {
        c.push(parseInt((firstHalf[i] || 0)) + parseInt((secondHalfSortOrder[i] || 0)));
    }

    if (c.length > 2) {
        const halfC = Math.ceil(c.length / 2);

        const firstHalfC = c.slice(0, halfC)
        const secondHalfC = c.slice(halfC)
        var secondHalfSortOrderC = [];
        var FirstTotalC = 0;
        /*console.log(firstHalfC + " " + secondHalfC);*/
        Object.keys(secondHalfC).reverse()
            .forEach(function (index) {
                /*console.log(secondHalf[index]);*/
                secondHalfSortOrderC += secondHalfC[index]
            });
        var c1 = [];
        for (var i = 0; i < Math.max(firstHalfC.length, secondHalfSortOrderC.length); i++) {
            c1.push(parseInt((firstHalfC[i] || 0)) + parseInt((secondHalfSortOrderC[i] || 0)));
        }
        /* console.log("C1 "+ c1);*/
    }

    if (c1.length > 2) {
        const halfC2 = Math.ceil(c1.length / 2);

        const firstHalfC2 = c1.slice(0, halfC2)
        const secondHalfC2 = c1.slice(halfC2)
        var secondHalfSortOrderC2 = [];
        var FirstTotalC2 = 0;
        /* console.log(firstHalfC2 + " " + secondHalfC2);*/
        Object.keys(secondHalfC2).reverse()
            .forEach(function (index) {
                /*console.log(secondHalf[index]);*/
                secondHalfSortOrderC2 += secondHalfC2[index]
            });
        var c2 = [];
        for (var i = 0; i < Math.max(firstHalfC2.length, secondHalfSortOrderC2.length); i++) {
            c2.push(parseInt((firstHalfC2[i] || 0)) + parseInt((secondHalfSortOrderC2[i] || 0)));
        }
    }

    var Total = "";
    for (var key in c2) {
        if (Total == "") {
            Total = c2[key];
            Total = Total.toString().slice(0, 1)
            /*console.log(string.slice(0, 1));*/
        } else
            Total = parseInt(Total.toString().slice(0, 1)) + parseInt(c2[key]);
    }

    if (Total.toString().length <= 1) {
        if (parseInt(Total.toString()) >= 8) {
            res.send(Person1 + " matches " + Person2 + " " + Total.toString() + "0%, good match");
        }
        else {
             res.send(Person1 + " matches " + Person2 + " " + Total.toString() + "0%");
        }
        
    } else
        if (parseInt(Total.toString()) >= 80) {
            res.send(Person1 + " matches " + Person2 + " " + Total.toString() + "%, good match");
        }
        else {
            res.send(Person1 + " matches " + Person2 + " " + Total.toString() + "%");
        }
    
   /* console.log(Total);*/
    /*console.log(secondHalfSortOrderC);*/
    /*console.log(firstHalf + " " + secondHalfSortOrder);*/
    /*res.send(numbers)*/
    /*console.log(b);*/

    /*res.send(Person1 + " Matches " + Person2);*/
});
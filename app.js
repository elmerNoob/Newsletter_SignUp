const express = require('express')
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let email = req.body.email;

    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    let jsonData = JSON.stringify(data);

    let options = {
        url: "https://us1.api.mailchimp.com/3.0/lists/ec45d5c8ef?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>",
        method: "POST",
        headers: {
            "Authorization": "epalElmer 1506b46f42d4940229b9404a248076f6-us1"
        },
        body: jsonData
    };

    request(options, function(error, response, body) {

        let status = response.statusCode;
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else if (status == 200) {
            res.sendFile(__dirname + "/succes.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("The server is runnimg at port " + 3000 + "!");
});

// 1506b46f42d4940229b9404a248076f6-us1
// ec45d5c8ef
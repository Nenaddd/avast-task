const fs = require("fs");
const express = require("express");
const cors = require("cors");
const helpers = require("./helpers");
const app = express();
const port = 8000;

// dev only
app.use(cors());

// fs.readFile("/etc/hosts", "utf8", function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });


app.get("/api/v1/events", (req, res) => {
    fs.readFile("./task.recording.json", "utf8", function (err, data) {
      const jsonData = helpers.processFile(err, data);
      res.send(jsonData);
    });
});

app.listen(port, () => console.log(`The server is up and running on port ${port}!`));

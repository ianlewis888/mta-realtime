const protobuf = require("protobufjs"),
  axios = require("axios"),
  express = require('express'),
  path = require('path'),
  writeArrivalsToDB = require('./functions/write_to_db');
  app = express(),
  port = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, 'client/build')));

/*
 *  Load MTA protocol buffer feed message
 */

var FeedMessage;
protobuf.load(__dirname + "/proto_files/nyct-subway.proto", (err, root) => {
  if (err)
    throw err;
  FeedMessage = root.lookupType("FeedMessage");
});

/*
 *  Create endpoints to trigger updates and serve app
 */

app.get("/api/arrivals", (req, res) => {
  res.append("Access-Control-Allow-Origin", "http://localhost:3000");
  res.append("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
  writeArrivalsToDB(FeedMessage, res)
    .then(() => {
      let timestamp = new Date(Date.now());
      console.log(`Updated DB: ${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`)
    })
    .catch(err => {
      res.json({ updateStatus: "error", error: err });
    });
});

app.get("*", (req, res) => {
  console.log("served app");
  res.sendFile(path.join(__dirname,'client/build/index.html'));
});

app.listen(port, () => { console.log(`Listening on port ${port}`); });

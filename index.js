const protobuf = require("protobufjs"),
  axios = require("axios"),
  express = require ('express'),
  writeArrivalsToDB = require('./functions/write_to_db');
  app = express(),
  port = process.env.PORT || 5000;


app.use(express.static(`${__dirname}/client/build`));

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
  console.log(req);
  writeArrivalsToDB(FeedMessage, res)
    .catch(err => {
      res.json({ updateStatus: "error", error: err });
    });
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.listen(port, () => { console.log(`Listening on port ${port}`); });

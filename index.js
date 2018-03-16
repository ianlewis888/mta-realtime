const protobuf = require("protobufjs"),
  axios = require("axios"),
  fs = require('fs'),
  firebase = require('firebase'),
  express = require ('express'),
  mtaCreds = require('./credentials/mta.json'),
  fetchFeedFromURL = require('./fetchFeed'),
  firebaseConfig = require('./credentials/firebase_config.json'),
  feedUrls = require('./station_mapping/feed_urls.json');

const firebaseCreds = {
  "username": process.env.FIREBASE_LOGIN_EMAIL,
  "password": process.env.FIREBASE_LOGIN_PASSWORD
};

firebase.initializeApp(firebaseConfig);

const app = express(),
  port = process.env.PORT || 5000,
  db = firebase.database();



// Fetch feed data from each endpoint and consolidate into single object
async function processFeedData(FeedMessage) {
  try {
    const a = await fetchFeedFromURL(feedUrls[0].url, FeedMessage, {});
    const b = await fetchFeedFromURL(feedUrls[1].url, FeedMessage, a);
    const c = await fetchFeedFromURL(feedUrls[2].url, FeedMessage, b);
    const d = await fetchFeedFromURL(feedUrls[3].url, FeedMessage, c);
    const e = await fetchFeedFromURL(feedUrls[4].url, FeedMessage, d);
    const f = await fetchFeedFromURL(feedUrls[5].url, FeedMessage, e);
    const g = await fetchFeedFromURL(feedUrls[6].url, FeedMessage, f);
    const h = await fetchFeedFromURL(feedUrls[7].url, FeedMessage, g);
    const i = await fetchFeedFromURL(feedUrls[8].url, FeedMessage, h);
    return i;
  } catch (e) {
    console.log(e);
  }
}

function writeArrivalsToDB(FeedMessage, res) {

  return firebase.auth()
    .signInWithEmailAndPassword(firebaseCreds.username, firebaseCreds.password)
    .then(() => {
      processFeedData(FeedMessage)
        .then(sortData)
        .then(data => {
          db.ref("arrivals").set(data);
        })
        .then(() => {
          res.json({ updateStatus: "success" });
        })
        .catch(function(error, res) {
          res.json({ updateStatus: "error", error: error });
        });
    })
    .catch(function(error, res) {
      res.json({ updateStatus: "error", error: error });
    });
}

// Sort arrivals so soonest trains appear first
function sortData(data) {
  for (var complexId in data) {
    data[complexId].arrivals.sort((a, b) => {
      return a.arrivalTime - b.arrivalTime;
    });
    // console.log(data[complexId]);
  }
  return data;
}

var FeedMessage;

// Load Protobuf File
protobuf.load(__dirname + "/proto_files/nyct-subway.proto", (err, root) => {
  if (err)
    throw err;

  // Obtain FeedMessage Message Type
  FeedMessage = root.lookupType("FeedMessage");
});

// Create endpoint to initiate arrivals data update
app.get("/api/arrivals", (req, res) => {
    writeArrivalsToDB(FeedMessage, res)
      .catch(err => {
        res.json({ updateStatus: "error", error: err });
      });
});

// Initiate Server
app.listen(port, () => { console.log(`Listening on port ${port}`); });
console.log(process.env.NODE_ENV);

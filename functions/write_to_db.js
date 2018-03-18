const firebase = require("firebase"),
  fetchFeedFromURL = require('./fetch_feed'),
  feedUrls = require('../data/feed_urls.json'),
  express = require('express');

const firebaseConfig = {
  "apiKey": process.env.FIREBASE_CONFIG_API_KEY,
  "authDomain": process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
  "databaseURL": process.env.FIREBASE_CONFIG_DATABASE_URL,
  "projectId": process.env.FIREBASE_CONFIG_PROJECT_ID,
  "storageBucket": process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
  "messagingSenderId": process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID
};

const firebaseCreds = {
  "username": process.env.FIREBASE_LOGIN_EMAIL,
  "password": process.env.FIREBASE_LOGIN_PASSWORD
};

firebase.initializeApp(firebaseConfig);
db = firebase.database();

/*
 *  Fetch feed data from each endpoint and consolidate into single object
 */

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

/*
 *  Sort arrivals so soonest trains appear first
 */

function sortData(data) {
  for (var complexId in data) {
    data[complexId].arrivals.sort((a, b) => {
      return a.arrivalTime - b.arrivalTime;
    });
    // console.log(data[complexId]);
  }
  return data;
}

/*
 *  Write feed data to Firebase
 */

function writeArrivalsToDB(FeedMessage, res) {

  return firebase.auth()
    .signInWithEmailAndPassword(firebaseCreds.username, firebaseCreds.password)
    .then(() => {
      processFeedData(FeedMessage)
        .then(sortData)
        .then(data => {
          db.ref("arrivals").set(data);
          db.ref("last-update").set(Date.now());
        })
        .then(() => {
          res.json({ updateStatus: "success" });
        })
        .catch(function(error) {
          res.json({ updateStatus: "error", error: error });
        });
    })
    .catch(function(error) {
      res.json({ updateStatus: "error", error: error });
    });
}



module.exports = writeArrivalsToDB;

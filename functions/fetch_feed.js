var stationData = require('../data/station_data.json');
var tripData = require('../data/trip_data.json');
var tripDefaults = require('../data/trip_defaults.json');
var axios = require("axios");

function fetchFeed(URL, FeedMessage, tripUpdates) {
  return axios({
    method:'get',
    url: URL,
    responseType: 'arraybuffer'
  }).then(res => {
    var message = FeedMessage.decode(res.data);
    var decoded =  FeedMessage.toObject(message, {
      longs: String,
      enums: String,
      bytes: String
    });
    return decoded;

  }).then(data => {
    // Set Current Time
    var timestamp = Math.round(Date.now() / 1000);

    // Loop Through Trip Entities
    data.entity.forEach(d => {

      // Display Arrival Information for Each Trip Update
      if (d.tripUpdate && d.tripUpdate.stopTimeUpdate) {
        var routeId = d.tripUpdate.trip.routeId;
        var tripId = d.tripUpdate.trip.tripId;

        // Loop Through Stop Time Updates & Store Arrivals in tripUpdates Object
        d.tripUpdate.stopTimeUpdate.forEach(s => {
          if (s.stopId && s.arrival) {

            // Filter Out Past Arrival Times
            var arrivalTime = Math.round((s.arrival.time - timestamp) / 60);
            if (arrivalTime < -1) { /*console.log("removed negative number ("+arrivalTime+")");*/ return; }
            else { arrivalTime = s.arrival.time; }

            var stopId = s.stopId.slice(0, -1);
            var direction = s.stopId.slice(-1);
            var stationName;
            var complexId;
            if (stationData[stopId]) {
              complexId = stationData[stopId].complexId;
              stationName = stationData[stopId].stationName;
            } else {
              return;
            }
            var stationConfig = {
              stationName: stationName,
              arrivals: [],
              complexId: complexId,
              stopIds: [stopId],
              routeIds: [routeId]
            };
            tripUpdates[complexId] = tripUpdates[complexId] || stationConfig;
            if (tripUpdates[complexId].stopIds.indexOf(stopId)===-1) {
              tripUpdates[complexId].stopIds.push(stopId);
            }
            if (tripUpdates[complexId].routeIds.indexOf(routeId)===-1) {
              tripUpdates[complexId].routeIds.push(routeId);
            }

            var headsign;
            var defaultTrip = true;
            if (tripData[tripId]) {
              headsign = tripData[tripId].headsign;
              defaultTrip = false;
            } else if (tripDefaults[routeId]) {
              headsign = tripDefaults[routeId][direction];
            } else {
              console.error(`\n\nInvalid Route ID: ${routeId}\n\nTrip Data:\n\t${JSON.stringify(s)}\n\n`);
              return;
            }

            tripUpdates[complexId].arrivals.push({
              routeId: routeId,
              arrivalTime: arrivalTime,
              direction: direction,
              headsign: headsign.toLowerCase(),
              defaultTrip: defaultTrip
            });
          }
        });
      }
    });
    return tripUpdates;
  });
}

module.exports = fetchFeed;

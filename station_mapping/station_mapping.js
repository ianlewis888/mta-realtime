var fs = require('fs');
var csv = require('fast-csv');

var stationStream = fs.createReadStream(__dirname + "/Stations.csv");
var tripStream = fs.createReadStream(__dirname + "/trips.csv");

/*
 * Read stations into JSON
 */

var stationData = {};
var stationCsv = csv().on("data", function(data) {
  if (data[2] !== "GTFS Stop ID") {

    var stopId = data[2];
    var stationName = data[5];
    var complexId = data[1];

    stationData[stopId] = {
      complexId: complexId,
      stationName: stationName
    };
  }
}).on("end", function() {
  var json = JSON.stringify(stationData);
  fs.writeFile(__dirname + "/station_data.json", json);
});

/*
 * Read trips into JSON
 */

var tripData = {};
var tripCsv = csv().on("data", function(data) {
  if (data[2] !== "trip_id") {

    var tripId = data[2].split("_").slice(1).join("_").slice(0, 11);
    var routeId = data[0];
    var headsign = data[3];

    tripData[tripId] = {
      tripId: tripId,
      routeId: routeId,
      headsign: headsign
    };
    // console.log(tripData);
  }
}).on("end", function() {
  var json = JSON.stringify(tripData);
  fs.writeFile(__dirname + "/trip_data.json", json);
});

tripStream.pipe(tripCsv);

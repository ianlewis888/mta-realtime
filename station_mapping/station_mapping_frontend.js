var fs = require('fs');
var csv = require('fast-csv');

var stream = fs.createReadStream(__dirname+"/Stations.csv");
var stationData = {};
var csvStream = csv()
    .on("data", function(data) {
      if (data[2] !== "GTFS Stop ID") {

        var stationName = data[5];
        var complexId = data[1];
        var routes = data[7].split(" ");
        var defaultStation = {
          complexId: complexId,
          stationName: stationName,
          routes: []
        };

        stationData[complexId] = stationData[complexId] || defaultStation;
        routes.forEach(r => {
          stationData[complexId].routes.push(r)
        });
      }
    })
    .on("end", function() {
      var json = JSON.stringify(stationData);
      fs.writeFile(__dirname+"/station_data_frontend.json", json);
    });
stream.pipe(csvStream);

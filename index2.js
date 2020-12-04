const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((response) => {
  response.forEach(printPassTimes)
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })

const printPassTimes = function (obj) {
  let dateObj = new Date(0);
  let PSTtimeInMS = (obj.risetime) * 1000; - (dateObj.getTimezoneOffset() * 60000);
  dateObj.setUTCMilliseconds(PSTtimeInMS);
  console.log(`Next pass at ${dateObj.toUTCString()}-0500 (Eastern Time) for ${obj.duration} seconds !`);
};
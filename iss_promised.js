const request = require('request-promise-native')

const fetchMyIP = function () {
  return request('https://api.ipify.org/?format=json')
};

const fetchCoordsByIP = function (data) {
  const { ip } = JSON.parse(data)
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = function (data) {
  const { latitude, longitude } = JSON.parse(data);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
          .then(fetchCoordsByIP)
          .then(fetchISSFlyOverTimes)
          .then((times) => {
            let { response } = JSON.parse(times)
            return response;
          })
}

module.exports = { nextISSTimesForMyLocation };
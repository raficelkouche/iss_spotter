const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (err,res,body) => {
    if (err) return callback(err, null);

    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    
    const IP = JSON.parse(body).ip;
    callback(null, IP);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (err,res,body) => {
    if (err) {
      return callback(err, null);
    }
    
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when trying to fetch coordinates`;
      callback(Error(msg), null);
      return;
    }
    
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (err,res,body) => {
    if (err) {
      return callback(err, null);
    }
    if (res.statusCode !== 200) {
      const reason = JSON.parse(body).reason;
      const msg = `Status code ${res.statusCode}: ${reason}`;
      return callback(Error(msg), null);
      
    }
    const times = JSON.parse(body).response;
    callback(null,times);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIP(ip, (err,coords) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(coords, (err,times) => {
        if (err) {
          return callback(err, null);
        }

        callback(null, times);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };
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
module.exports = {fetchMyIP};
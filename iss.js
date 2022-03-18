const request = require('request');



const fetchMyIP = function(callback) {

  let url = 'https://api.ipify.org?format=json';

  request(url, (error, response,body) => {
    if (error) {
      console.log("This is an error", error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      console.log('This is a status code error', Error(msg). null);
      return;
    }
    const ip = JSON.parse(body).ip;
    console.log(ip);

  });

};

const fetchCoordsByIP = function(ip, callback) {
    
  let url = `https://freegeoip.app/json/${ip}`;
   
  request(url, (error, response,body) => {

    if (error) {
      console.log(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} When fetching coordinates for IP. Response: ${body}`;
      console.log(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    let objectloc = {};
    if (data.latitude && data.longitude) {
      objectloc.latitude = String(data.latitude);
      objectloc.longitude = String(data.longitude);
    }
    console.log(objectloc);
    
  });
};

const fetchISSFlyOverTimes = function(location,callback) {

  let url = `https://iss-pass.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`;

  request(url, (error, response,body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
        return;
      }

    const data = JSON.parse(body);
    return callback(null, data.response);
  });

};

const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchCoordsByIP(ip, (error, loc) => {
        if (error) {
          return callback(error, null);
        }
  
        fetchISSFlyOverTimes(loc, (error, nextPasses) => {
          if (error) {
            return callback(error, null);
          }
  
          callback(null, nextPasses);
        });
      });
    });
  };
  

nextISSTimesForMyLocation()



// console.log(fetchMyIP());
// console.log(fetchCoordsByIP('119.73.124.208'))
// fetchISSFlyOverTimes({ latitude: '30', longitude: '70' });


module.exports = { nextISSTimesForMyLocation};
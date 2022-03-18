const request = require('request-promise-native');

const fetchMyIP = function() {
    return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = function (body) {
    const data = JSON.parse(body);
    return request (`https://freegeoip.app/json/${body}`)

}
const fetchISSFlyOverTimes = function (body) {
    const { latitude, longitude } = JSON.parse(body);
    const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
    return request(url);
}
const nextISSTimesForMyLocation = function () {

    return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
        const {response} = JSON.parse(data);
        return response
    })
}




module.exports = {nextISSTimesForMyLocation}
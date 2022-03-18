const { nextISSTimesForMyLocation } = require('./iss');

// const { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('119.73.1.208')

// fetchISSFlyOverTimes({ latitude: '30', longitude: '70' }, (error,data) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return error;
//   }
//   console.log('It worked! Returned flyover times:', data);
// });

const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  

nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
        return console.log('It didnt work!', error);
    }

    printPassTimes(passTimes);
});


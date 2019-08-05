const http = require('http');


function sendParallel(options){
  for (let option of options){
    http.get(option, (res) => {
      res.on('data', (data) => {
        console.log(data.toString());
      });
    }).on("error", (error) => {
      console.log("Error: " + error.message);
    });    
  }
}

function sendSeries(options, counter = 0) {
  if (counter >= options.length) return;
  http.get(options[counter], (res) => {
    res.on('data', (data) => {
      console.log(data.toString());
    });
    counter++;
    res.on('end', () => sendSeries(options, counter));
  }).on("error", (error) => {
    console.log("Error: " + error.message);
  });    
}

//example

const option1 = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  body: JSON.stringify({
    foo: "bar"
  }),
}

const option2 = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  headers: {
    //any headers
  }
}

sendSeries([option1, option2]);
//sendParallel([option1, option2]);
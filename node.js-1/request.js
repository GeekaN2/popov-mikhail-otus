const http = require('http');

function sendRequests(options){
  for (let option of options){
    http.get(option, (res) => {
      res.on('data', (data) => {
        console.log(data.toString());
      })
    }).on("error", (error) => {
      console.log("Error: " + error.message);
    });    
  }
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

sendRequests([option1, option2]);
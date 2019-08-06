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

function generateOptions(quantity){ //use for tests
  let options = [];
  for (let i = 0; i < quantity; i++){
    options.push({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'POST',
    })
  }
  return options;
}

function main(){
  let args = process.argv,
  type = args[2],
  quantity = parseInt(args[3]);
  if (type != 'parallel' && type != 'series'){
    console.log(`3rd argument must be 'parallel' or 'series'`);
    return;
  }
  if (isNaN(quantity)){
    console.log('4th argument must be a number');
    return;
  }
  if (type == 'parallel')
    sendParallel(generateOptions(quantity));
  if (type == 'series')
    sendSeries(generateOptions(quantity))

  return 'Accepted';
}


main();
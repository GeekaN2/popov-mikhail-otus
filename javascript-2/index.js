async function promiseReduce(asyncFunctions, reduce, initialValue) {
    var memo = initialValue;
    for (let currentFunction of asyncFunctions){
        await currentFunction().then(value => memo = reduce(memo, value));
    }
    return Promise.resolve(memo);
}

// usage example

var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(2)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(3), 1000)
})

promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce')
        return memo * value
    }, 1)
    .then(console.log) 

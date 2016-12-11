var memoryRun = require('./memoryRun');

function logMemory(){
    console.log(process.memoryUsage().heapUsed);
}

gc();
console.log('Should be quite low');
logMemory();

memoryRun();

console.log('Should be quite high');
logMemory();

setTimeout(function(){
    logMemory();
}, 1000);

setTimeout(function(){
    logMemory();
}, 5000);

setTimeout(function(){
    gc();
    console.log('Should drop substantially');
    logMemory();
}, 6000);
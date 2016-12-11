var proxel = require('../');

module.exports = function run(){
    var start = Date.now();

    while(Date.now() - start < 1000){
        for(var i = 0; i < 100; i ++){
            var data = proxel({
                foo: 5
            });

            proxel.on(data, 'foo', function(current, last){
                console.log(current);
            });
        }
    }
};
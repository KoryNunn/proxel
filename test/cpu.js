var proxel = require('../');

/*
    The 'check' is just in case V8 gets too smart for it's
    own good and realises that we aren't doing any work. It
    doesn't currently, and isn't likely, but ya never know.
*/

console.log('Higher is better');

function run(runs){
    if(!runs){
        return;
    }

    runs--;

    var start = Date.now(),
        loops = 0,
        total = 0;

    while(Date.now() - start < 1000){
        var data = proxel({
            foo: 5
        });

        proxel.on(data, 'foo', function(current, last){
            total += 0.5;
        });

        data.foo++;
        loops++;
    }

    console.log('Loops: ' + loops, '/s Check: ' + total);

    run(runs);
};

run(5);
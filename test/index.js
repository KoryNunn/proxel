var proxel = require('../'),
    test = require('tape');


test('pre wrap events', function(t){
    t.plan(4);

    var data = proxel({
        foo: 5
    });

    t.equal(data.foo, 5);

    proxel.on(data, 'foo', function(current, last){
        t.equal(current, 10);
        t.equal(last, 5);
    });

    data.foo = 10;
    data.bar = 10;

    t.equal(data.foo, 10);

});

test('post wrap', function(t){
    t.plan(2);

    var data = {
        foo: 5
    };

    proxel.on(data, 'foo', function(current, last){
        t.equal(current, 10);
        t.equal(last, 5);
    });

    proxel(data).foo = 10;
    proxel(data).bar = 10;
});

test('nested', function(t){
    t.plan(2);

    var data = proxel({
        foo: {
            bar: 1
        }
    });

    proxel.on(data.foo, 'bar', function(current, last){
        t.equal(current, 2);
        t.equal(last, 1);
    });

    data.foo.bar = 2;
});

test('regex', function(t){
    t.plan(3);

    var data = proxel({});

    proxel.on(data, /fo/, function(current, last){
        t.pass();
    });

    data.foo = 10;
    data.fob = 10;
    data.bar = 10;
    data.bfo = 10;
});

test('any regex', function(t){
    t.plan(4);

    var data = proxel({});

    proxel.on(data, /./, function(current, last){
        t.pass();
    });

    data.foo = 10;
    data.fob = 10;
    data.bar = 10;
    data.bfo = 10;
});
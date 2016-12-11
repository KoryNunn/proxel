var isInstance = require('is-instance');

var proxyMap = new WeakMap();
var proxySet = new WeakSet();
var proxyContext = new WeakMap();

function get(target, name){
    return wrap(target[name]);
}

function set(target, name, value){
    var proxy = wrap(target),
        context = proxyContext.get(proxy);

    var previous = context.data[name];
    context.data[name] = value;
    context.events.forEach(function(eventInfo){
        var eventName = eventInfo[0];

        if(eventName instanceof RegExp){
            if(name.match(eventName)){
                eventInfo[1](value, previous);
            }
        }else if(String(eventName) === name){
            eventInfo[1](value, previous);
        }
    });
}

function wrap(data) {
    if(!isInstance(data)){
        return data;
    }

    // Already wrapped
    if(proxyMap.has(data)){
        return proxyMap.get(data);
    }

    // Is a wrapper.
    if(proxySet.has(data)){
        return data;
    }

    var context = {
            data: data
        };

    var proxy = new Proxy(data, {
            get: get.bind(context),
            set: set.bind(context)
        });

    context.proxy = proxy;

    proxyMap.set(data, proxy);
    proxyContext.set(proxy, context);
    proxySet.add(proxy);

    return proxy;
}

wrap.on = function(target, eventName, callback){
    var proxy = wrap(target),
        context = proxyContext.get(proxy);

    if(!context.events){
        context.events = [];
    }

    context.events.push([eventName, callback]);
};

module.exports = wrap;
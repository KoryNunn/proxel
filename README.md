# Proxel

Proxy model - Experimental Proxy-based evented data-store.

# Example

```javascript
var data = proxel({
    foo: 5
});

console.log(data); // 5

// Watch for changes to data.foo
proxel.on(data, 'foo', function(current, last){
    console.log('Foo Handler: Was' + last + ' now ' + current);
});

// Watch for changes to data./^ba/
proxel.on(data, /^ba/, function(current, last){
    console.log('/bo/ Handler: Was' + last + ' now ' + current);
});

data.foo = 10; // logs "Was 5 now 10"
data.bar = 'bar'; // logs "Foo Handler: Was undefined now bar"
data.baz = 'baz'; // logs "/bo/ Handler: Was undefined now baz"

```


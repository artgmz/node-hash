# Node-Hash

## Description:
Uses promises to provide a concise way to hash a value, compare hashes, and use hashing to generate a 16-character token/key.

Can also be used with ExpressJS.

## Dependencies:
* NodeJS 0.10.x
* bCrypt 0.7.x
* Q 1.0.x

## Notes:
* The "getToken()" function is synchronous and therefore blocking. This was done this way to allow you to directly assign the returned key/token to a variable. Function is reasonably fast so shouldn't present an issue.
* You can modify key/token return length in "getToken()" by changing substring value.
* Errors are output to the console and then returned when a promise is rejected. You should handle these in your app.

## Sample Usage:
```
var hash = require("./node-hash.js");

// Hashing a value.
hash.hash("123456").then(function (hashedVal) {
    // Do something with hashed value.
}, function (err) {
    // Do something with error.
});

// Comparing value to hashed value.
hash.compare("123456", hashedVal).then(function (match) {
    if (!match) {
        // No match. Do something.
    } else {
        // Match. Do something else.
    }
}, function (err) {
    // Do something with error.
}).done();

// Generating a key/token.
var token = hash.getToken();
```
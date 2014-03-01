// Hashing and token service.
"use strict";

// Third-party modules.
var bcrypt = require("bcrypt"), // Hashing library.
    q = require("q");           // Promises library.

module.exports = {
    // Hash the given value with an auto-generated salt.
    // VAL: Value to be hashed.
    hash: function (val) {
        var deferred = q.defer();

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.log("Error generating a salt: " + err);
                deferred.reject(err);
            } else {
                bcrypt.hash(val, salt, function (err, hash) {
                    if (err) {
                        console.log("Error hashing a value: " + err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(hash);
                    }
                });
            }
        });

        return deferred.promise;
    },

    // Compare to values, returning true/false as appropriate.
    // COMPAROR: Value to be compared.
    // COMPAREE: Value to be compared against.
    compare: function (comparor, comparee) {
        var deferred = q.defer();

        bcrypt.compare(comparor, comparee, function (err, match) {
            if (err) {
                console.log("Error comparing hashes: " + err);
                deferred.reject(err);
            } else if (!match) {
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }
        });

        return deferred.promise;
    },

    // Synchronously return a random sixteen character token.
    getToken: function () { return bcrypt.genSaltSync(10).substr(13); }
};
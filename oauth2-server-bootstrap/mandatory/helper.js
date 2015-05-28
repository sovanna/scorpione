/*jslint node: true */
'use strict';

var redis = require('redis'),
    util = require('util'),
    bcrypt = require('bcrypt'),
    log = require('npmlog'),
    _env = require('./config').env(),
    _rclient;

/* -- CONNECTIONs ----------------------------------------------------------- */

exports.connection = function () {
    return {
        redis: function () {
            var r;

            if (_rclient) {
                return _rclient;
            }

            r = _env.connect.redis;
            _rclient = redis.createClient(r.port, r.host);

            return _rclient;
        }
    };
};

/* -- PASSWORD -------------------------------------------------------------- */

exports.password = function () {
    return {
        gen: function (original, callback) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return callback(err);
                }

                bcrypt.hash(original, salt, function (err, hash) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, hash);
                });
            });
        },

        verify: function (original, hash, callback) {
            bcrypt.compare(original, hash, function (err, res) {
                if (err) {
                    return callback(err);
                }

                return callback(null, res);
            });
        }
    };
};

/* -- LOG ------------------------------------------------------------------- */

exports.log = function () {
    var a = arguments,
        s = [];

    for (var i in a) {
        s.push(util.inspect(a[i], {
            depth: null,
            colors: true
        }));
    }

    console.log(s.join(' '));
};

/* -- TOOLs ----------------------------------------------------------------- */

exports.tools = function () {
    var date_iso_8601 = function (d, separator) {
        var dm,
            dd;

        if (!d) {
            log.error('tools.date_iso_8601', 'd is null or undefined');
            return;
        }

        if (var_type(d) !== '[object Date]') {
            log.error('tools.date_iso_8601', 'd is not a Date Object');
            return;
        }

        dm = d.getMonth() + 1;
        dd = d.getDate();

        separator = separator ? separator : '-';

        dm = dm < 10 ? '0' + dm : dm;
        dd = dd < 10 ? '0' + dd : dd;

        return d.getFullYear() + separator + dm + separator + dd;
    };

    var var_type = function (myVar) {
        return Object.prototype.toString.call(myVar);
    };

    var string_without_accent = function (myString) {
        var accent = [
                /[\300-\306]/g, /[\340-\346]/g, // A, a
                /[\310-\313]/g, /[\350-\353]/g, // E, e
                /[\314-\317]/g, /[\354-\357]/g, // I, i
                /[\322-\330]/g, /[\362-\370]/g, // O, o
                /[\331-\334]/g, /[\371-\374]/g, // U, u
                /[\321]/g, /[\361]/g, // N, n
                /[\307]/g, /[\347]/g, // C, c
            ],
            noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

        for (var i = 0; i < accent.length; i++) {
            myString = myString.replace(accent[i], noaccent[i]);
        }

        return myString;
    };

    var slugify = function (string) {
        return (var_type(string) === '[object String]') ? string.trim().toLowerCase() : null;
    };

    var random_code = function (nb_number) {
        var c = '';

        nb_number = nb_number ? nb_number : 5;

        for (var i = nb_number - 1; i >= 0; i--) {
            c += Math.floor((Math.random() * 9) + 1);
        }

        return c;
    };

    return {
        date_iso_8601: date_iso_8601,
        var_type: var_type,
        string_without_accent: string_without_accent,
        slugify: slugify,
        random_code: random_code
    };
};
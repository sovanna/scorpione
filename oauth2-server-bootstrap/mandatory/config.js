/*jslint node: true */
'use strict';

var _ = require('underscore'),
    uuid = require('node-uuid');

/* -- ENV ------------------------------------------------------------------- */

exports.env = function () {
    var _environment = {
            pathToPublic: __dirname + '/../static',
            app_name: 'myapp',
            limitSize: '8mb',
            ttl: 60 * 1 * 60 * 24 * 7,
            urlencodedOpts: function () {
                var self = this;

                return {
                    extended: true,
                    limit: self.limitSize
                };
            },
            bodyParserOpts: function () {
                var self = this;

                return {
                    limit: self.limitSize
                };
            },
            morganOpts: function () {
                return ':date[clf] | :method :url :status :res[content-length] - :response-time ms';
            },
            sessionOpts: function () {
                return {
                    secret: 'Kiam selagne sreiye mouye! ante deng priap meitgh!',
                    resave: true,
                    saveUninitialized: true,
                    genid: function () {
                        return uuid.v4();
                    }
                };
            },
            staticOpts: function () {
                var self = this;

                return {
                    path: self.pathToPublic,
                    opts: {
                        maxAge: 31557600
                    }
                };
            },
        },
        _env_conf = null;

    if ((process.env.NODE_ENV || 'development') === 'development') {
        _env_conf = {
            debug: true,
            URL_SERVER_AUTHORIZATION: 'http://localhost:8085',
            store_root: _environment.app_name + ':dev',
            connect: {
                redis: {
                    host: '127.0.0.1',
                    port: 6377
                },
                rethinkdb: {
                    host: 'localhost',
                    port: 28015,
                    db: 'myapp'
                }
            }
        };
    } else {
        _env_conf = {
            debug: false,
            URL_SERVER_AUTHORIZATION: 'http://api.myapp.fr',
            store_root: _environment.app_name + ':prod',
            connect: {
                redis: {
                    host: '127.0.0.1',
                    port: 6379
                },
                rethinkdb: {
                    host: 'localhost',
                    port: 28015,
                    db: 'myapp'
                }
            }
        };
    }

    return _.extend(_environment, _env_conf);
};

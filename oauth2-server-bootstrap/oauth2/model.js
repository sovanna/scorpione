/*jslint node: true */
'use strict';

var util = require('util'),
    _helper = require('../mandatory/helper'),
    _rclient = _helper.connection().redis(),
    _env = require('../mandatory/config').env(),
    _keys = {
        token: _env.app_name + ':oauth:tokens:%s',
        client: _env.app_name + ':oauth:clients:%s',
        refreshToken: _env.app_name + ':oauth:refresh_tokens:%s',
        grantTypes: _env.app_name + ':oauth:clients:%s:grant_types',
        user: _env.app_name + ':oauth:users:%s'
    };

exports.getAccessToken = function (bearerToken, callback) {
    _rclient.hgetall(util.format(_keys.token, bearerToken), function (err, token) {
        if (err) {
            return callback(err);
        }

        if (!token) {
            return callback();
        }

        callback(null, {
            accessToken: token.accessToken,
            clientId: token.clientId,
            expires: token.expires ? new Date(token.expires) : null,
            userId: token.userId
        });
    });
};

exports.getClient = function (clientId, clientSecret, callback) {
    _rclient.hgetall(util.format(_keys.client, clientId), function (err, client) {
        if (err) {
            return callback(err);
        }

        if (!client || (client.clientSecret !== clientSecret)) {
            return callback();
        }

        callback(null, {
            clientId: client.clientId,
            clientSecret: client.clientSecret
        });
    });
};

exports.getRefreshToken = function (bearerToken, callback) {
    _rclient.hgetall(util.format(_keys.refreshToken, bearerToken), function (err, token) {
        if (err) {
            return callback(err);
        }

        if (!token) {
            return callback();
        }

        callback(null, {
            refreshToken: token.accessToken,
            clientId: token.clientId,
            expires: token.expires ? new Date(token.expires) : null,
            userId: token.userId
        });
    });
};

exports.grantTypeAllowed = function (clientId, grantType, callback) {
    _rclient.sismember(util.format(_keys.grantTypes, clientId), grantType, callback);
};

exports.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
    var k = util.format(_keys.token, accessToken);

    _rclient.hmset(k, {
        accessToken: accessToken,
        clientId: clientId,
        expires: expires ? expires.toISOString() : null,
        userId: user.id
    }, callback);

    _rclient.expire(k, expires ? (expires.getSeconds() + (60 * 60 * 12)) : -1);
};

exports.saveRefreshToken = function (refreshToken, clientId, expires, user, callback) {
    var k = util.format(_keys.refreshToken, refreshToken);

    _rclient.hmset(k, {
        refreshToken: refreshToken,
        clientId: clientId,
        expires: expires ? expires.toISOString() : null,
        userId: user.id
    }, callback);

    _rclient.expire(k, expires ? expires.getSeconds() + (60 * 60 * 12) : -1);
};

exports.getUser = function (username, password, callback) {
    _rclient.hgetall(util.format(_keys.user, username), function (err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback();
        }

        _helper.password().verify(password, user.password, function (err, same) {
            if (err || !same) {
                return callback();
            }

            callback(null, {
                id: username
            });
        });
    });
};
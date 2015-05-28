/*jslint node: true */
'use strict';

var oauthserver = require('oauth2-server'),
    _env = require('../mandatory/config').env(),
    _model = require('./model');

/* -- OAuth 2.0 CONFIG ------------------------------------------------------ */

exports.oauth = oauthserver({
    model: _model,
    grants: ['password', 'refresh_token'],
    debug: _env.debug,
    accessTokenLifetime: _env.ttl
});
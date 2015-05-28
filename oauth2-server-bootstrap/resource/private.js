/*jslint node: true */
'use strict';

var router = require('express').Router(),
	_oauth = require('../oauth2/config').oauth,
	_http = require('../mandatory/http');

/* -- PRIVATE --------------------------------------------------------------- */

var _private = {
	v1: function (req, res) {
		return _http.code(200, 'ok', res);
	}
};

/* -- ROUTEs ---------------------------------------------------------------- */

router.all('/v1/*', _oauth.authorise(), _private.v1);

router.use('/v1', function (req, res) {
    res.redirect('/private/v1/');
});

/* -- EXPORT ---------------------------------------------------------------- */

module.exports = router;
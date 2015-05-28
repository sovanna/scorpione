/*jslint node: true */
'use strict';

var router = require('express').Router(),
	_http = require('../mandatory/http');

/* -- PRIVATE --------------------------------------------------------------- */

var _private = {
	v1: function (req, res) {
		return _http.code(200, 'ok', res);
	}
};

/* -- ROUTEs ---------------------------------------------------------------- */

router.all('/v1/*', _private.v1);

router.use('/v1', function (req, res) {
    res.redirect('/public/v1/');
});

/* -- EXPORT ---------------------------------------------------------------- */

module.exports = router;
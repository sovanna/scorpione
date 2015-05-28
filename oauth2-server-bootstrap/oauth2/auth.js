/*jslint node: true */
'use strict';

var router = require('express').Router(),
	oauth = require('./config').oauth;

/* -- ROUTEs ---------------------------------------------------------------- */

router.all('/token', oauth.grant());

/* -- EXPORT ---------------------------------------------------------------- */

module.exports = router;
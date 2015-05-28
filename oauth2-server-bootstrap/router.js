/*jslint node: true */
'use strict';

var _ = require('underscore'),
    express = require('express'),
    app = express(),
    log = require('npmlog'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    morgan = require('morgan'),
    swig = require('swig'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    _helper = require('./mandatory/helper'),
    _env = require('./mandatory/config').env(),
    _route_oauth2 = require('./oauth2/auth'),
    _route_resource_private = require('./resource/private'),
    _route_resource_public = require('./resource/public'),
    _oauth = require('./oauth2/config').oauth;

/* -- CHIM LOCAL VARs ------------------------------------------------------- */

var _private = {
    server: null,
    sessionStore: new RedisStore({
        client: _helper.connection().redis(),
        ttl: _env.ttl
    }),
    sessionSettings: null
};

_private.sessionSettings = _.extend(
    _env.sessionOpts(), {
        store: _private.sessionStore
    }
);

/* -- SET CONFIG ------------------------------------------------------------ */

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', _env.pathToPublic);
app.set('view cache', !_env.debug);
app.use(bodyParser.urlencoded(_env.urlencodedOpts()));
app.use(bodyParser.json(_env.bodyParserOpts()));
app.use(cookieParser());
app.use(session(_private.sessionSettings));
app.use(compression());
app.use(favicon(_env.pathToPublic + '/favicon.ico'));
app.use('/static', express.static(_env.pathToPublic, _env.staticOpts().opts));

swig.setDefaults({
    cache: _env.debug ? 'memory' : false
});

log.level = _env.debug ? 'silly' : 'silent';

/* -- ROUTES LOG ------------------------------------------------------------ */

app.use(morgan(_env.morganOpts()));

/* -- ROUTEs ---------------------------------------------------------------- */

app.use('/oauth2', _route_oauth2);
app.use('/private', _route_resource_private);
app.use('/public', _route_resource_public);

app.use(_oauth.errorHandler());

/* -- START SERVER ---------------------------------------------------------- */

_private.server = app.listen(8085, function () {
    log.info(
        'SERVER STARTED',
        '%s, listening on port %d',
        _env.app_name.toUpperCase(),
        this.address().port);
});
/*jslint node: true */
'use strict';
 
var uuid = require('node-uuid'),
    log = require('npmlog'),
    _helper = require('../mandatory/helper'),
    _rclient = _helper.connection().redis(),
    _env = require('../mandatory/config').env(),
    _config_oauth = {
        username: 'username',
        password: 'zud2gesW6KeF',
        client: uuid.v4(),
        secret: uuid.v4()
    };

_helper.password().gen(_config_oauth.password, function (err, hash) {
    var k_user = _env.app_name + ':oauth:users:' + _config_oauth.username,
        k_client = _env.app_name + ':oauth:clients:' + _config_oauth.client,
        k_grant_type = _env.app_name + ':oauth:clients:' + _config_oauth.client + ':grant_types';

    if (err) {
        log.error('xgen_credentials', err);
        return;
    }

    _rclient.multi()
        .hmset(k_user, {
            id: _config_oauth.username,
            username: _config_oauth.username,
            password: hash
        })
        .hmset(k_client, {
            clientId: _config_oauth.client,
            clientSecret: _config_oauth.secret
        })
        .sadd(k_grant_type, [
            'password',
            'refresh_token'
        ])
        .exec(function (errs) {
            if (errs) {
                log.error('xgen_credentials', errs[0].message);
                return process.exit(1);
            }

            log.info('xgen_credentials', 'username : ' + _config_oauth.username);
            log.info('xgen_credentials', 'password : ' + _config_oauth.password);
            log.info('xgen_credentials', 'client : ' + _config_oauth.client);
            log.info('xgen_credentials', 'secret : ' + _config_oauth.secret);
            
            process.exit();
        });
});
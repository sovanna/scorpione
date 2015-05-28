/*jslint node: true */
'use strict';

var _tools = require('./helper').tools();

/* -- HTTP CODE ------------------------------------------------------------- */

exports.code = function (code, data, res) {
    if (_tools.var_type(data) === '[object String]') {
        return res.status(code).json({
            data: data
        });
    }

    return res.status(code).json(data);
};
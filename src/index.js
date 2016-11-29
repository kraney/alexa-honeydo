'use strict';
var HoneyDo = require('./honeyDo');

exports.handler = function(event, context) {
    var honeyDo = new HoneyDo();
    honeyDo.execute(event, context);
}

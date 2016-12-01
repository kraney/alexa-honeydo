'use strict';
var HoneyDo = require('./honeyDo');

//##########################################################
// Entry point for the skill Lambda function
//##########################################################
exports.handler = function(event, context) {
    var honeyDo = new HoneyDo();
    honeyDo.execute(event, context);
}

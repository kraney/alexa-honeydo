'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = undefined;
var skillContext = {}

var HoneyDo = function() {
    AlexaSkill.call(this);
    skillContext.needMoreHelp = true;
};


HoneyDo.prototype = Object.create(AlexaSkill.prototype);
HoneyDo.prototype.constructor = HoneyDo;

eventHandlers.register(HoneyDo.prototype.eventHandlers, skillcontext);
intentHandlers.register(HoneyDo.prototype.intentHandlers, skillContext);

module.exports = HoneyDo;

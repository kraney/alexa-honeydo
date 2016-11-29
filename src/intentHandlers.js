'use strict';
var textHelper = require('./textHelper'),
    storage = require('./storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.AddPersonIntent = function (intent, session, response) {
    };

    intentHandlers.AddTaskIntent = function (intent, session, response) {
    };

    intentHandlers.ListTasksIntent = function (intent, session, response) {
    };

    intentHandlers.RemoveTaskIntent = function (intent, session, response) {
    };

    intentHandlers.ClearTaskIntent = function (intent, session, response) {
    };

    intentHandlers.ResetIntent = function (intent, session, response) {
    };

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
    };
};

exports.register = registerIntentHandlers;

'use strict';
var storage = require('./storage),
    textHelper = require('./textHelper');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        storage.loadTasks(session, function (currentTasks) {
            var speechOutput = '',
                reprompt;
            if (currentTasks.data.persons.length === 0) {
                speechOutput += 'Honey Do, Let\'s start your task list. Who\'s your first person?';
                reprompt = "Please tell me your first person.";
            } else if (currentTasks.isEmptyTaskList()) {
                speechOutput += 'Honey Do, you have ' + currentTasks.data.persons.length;
                if (currentTasks.data.persons.length > 1) {
                    speechOutput += ' people';
                } else {
                    speechOutput += ' person';
                }
                speechOutput += ' defined. You can add a task for a person, add another person, reset all, or exit. Which would you like?';
            } else {
                speechOutput += 'Honey Do, What can I do for you?';
                reprompt = textHelper.nextHelp;
            }
            response.ask(speechOutput, reprompt);
        });
    };
};
exports.register = registerEventHandlers;

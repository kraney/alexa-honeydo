'use strict';
var textHelper = require('./textHelper'),
    storage = require('./storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.AddPersonIntent = function (intent, session, response) {
        var newPersonName = intent.slots.Person.value;
        if (!newPersonName) {
            response.ask('OK. Who do you want to add?', 'Who do you want to add?');
            return;
        }
        storage.loadTasks(session, function (currentTasks) {
            var speechOutput,
                reprompt;
            if (currentTasks.data.tasks[newPersonName] !== undefined) {
                speechOutput = newPersonName + ' has already been added.';
                if (skillContext.needMoreHelp) {
                    response.ask(speechOutput + ' What else?', 'What else?');
                } else {
                    response.tell(speechOutput);
                }
                return;
            }
            speechOutput = newPersonName + ' has been added. ';
            currentTasks.data.persons.push(newPersonName);
            currentTasks.data.tasks[newPersonName] = [];
            if (skillContext.needMoreHelp) {
                if (currentTasks.data.persons.length == 1) {
                    speechOutput += 'You can say, I am Done Adding People. Now who\'s your next person?';
                    reprompt = textHelper.nextHelp;
                } else {
                    speechOutput += 'Who is your next person?';
                    reprompt = textHelper.nextHelp;
                }
            }
            currentTasks.save(function () {
                if (reprompt) {
                    response.ask(speechOutput, reprompt);
                } else {
                    response.tell(speechOutput);
                }
            });
        });
    };

    intentHandlers.AddTaskIntent = function (intent, session, response) {
        var personName = intent.slots.Person.value,
            task = intent.slots.Task.value;
        if (!personName) {
            response.ask('sorry, I did not hear the person\'s name, please say that again', 'Please say the name again');
            return;
        }
        storage.loadTasks(session, function (currentTasks) {
            var targetPerson,
                speechOutput = '';
            if (currentTasks.data.persons.length < 1) {
                response.ask('sorry, no one has been added yet, what can I do for you?', 'what can I do for you?');
                return;
            }
            for (var i = 0; i < currentTasks.data.persons.length; i++) {
                if (currentTasks.data.persons[i] === personName) {
                    targetPerson = currentTasks.data.persons[i];
                    break;
                }
            }
            if (!targetPerson) {
                speechOutput = personName + ' has been added. ';
                currentTasks.data.persons.push(personName);
                currentTasks.data.tasks[newPersonName] = [];
                targetPerson = personName;
            }
            currentTasks.data.tasks[targetPerson].push(task);

            speechOutput += ' added task ' + task + ' for ' + targetPerson + '. ';
            currentTasks.save(function () {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.ListTasksIntent = function (intent, session, response) {
        var personName = intent.slots.Person.value,
        if (!personName) {
            response.ask('sorry, I did not hear the person\'s name, please say that again', 'Please say the name again');
            return;
        }
        storage.loadTasks(session, function (currentTasks) {
            var targetPerson,
                speechOutput = '',
                taskCount = 0,
                cardContent = '';
            if (currentTasks.data.persons.length < 1) {
                response.ask('sorry, no one has been added yet, what can I do for you?', 'what can I do for you?');
                return;
            }
            for (var i = 0; i < currentTasks.data.persons.length; i++) {
                if (currentTasks.data.persons[i] === personName) {
                    targetPerson = currentTasks.data.persons[i];
                    break;
                }
            }
            if (!targetPerson) {
                response.ask('Sorry, I don\'t know person ' + personName + '. What else?', 'I don\'t know ' + personName + '. What else?');
                return;
            }
            currentTasks.data.tasks[targetPerson].forEach(function (task) {
                taskCount += 1;
                speechOutput += 'Task ' + taskCount + ' is ' + task + '. ';
                cardContent += 'No. ' + taskCount + ' - ' + task + '\n';
            }
            speechOutput += 'What else?';
            response.tellWithCard(speechOutput, "Tasks for " + targetPerson, cardContent
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

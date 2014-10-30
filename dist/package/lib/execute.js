
/*
Javascript function for exec linux commands in nodejs
@class Execute
@author Jan Sanchez
 */

/*
 * Module dependencies.
 */
var Execute, execute, extend, fs, rimraf;

extend = require('util')._extend;

execute = require("child_process").exec;

fs = require('fs');

rimraf = require('rimraf');


/*
 * Library.
 */

Execute = function(settings) {
  this.reset();
  return this;
};

Execute.prototype.runCommand = function(command) {
  var exec, newCommand;
  newCommand = command + " 2>&1 1>output && echo done > done";
  exec = execute(newCommand);
  this.readFile(command);
  if (this.output === '') {
    this.runCommand(command);
  }
  this.reset();
  return this.output;
};

Execute.prototype.readFile = function() {
  while (!fs.existsSync('./done')) {
    this.attempts++;
  }
  this.output = fs.readFileSync('./output', {
    encoding: 'utf8'
  }).toString().replace(/\n/gi, '');
};

Execute.prototype.reset = function() {
  rimraf('./done', function() {});
  rimraf('./output', function() {});
  this.attempts = 0;
};


/*
 * Expose library.
 */

module.exports = Execute;

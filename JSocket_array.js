/**
 * Module dependencies.
 */
var events = require('events');
var EventEmitter = process.EventEmitter;
var socket;
var jsonData;

/**
 * Export the constructor.
 */
exports = module.exports = JSocket;

/**
 * Default error event listener to prevent uncaught exceptions.
 */
var defaultError = function () {};

/**
 * JSocket constructor.
 *
 * @param {Socket} socket instance
 * @api public
 */
function JSocket(sock) {
  socket = sock;
  jsonData = new Array;
  this.on('error', defaultError);
	
  // Add a 'data' event handler to this instance of socket
  socket.on('data', dataHandler);
};

/**
 * Inherits from EventEmitter.
 */
JSocket.prototype.__proto__ = EventEmitter.prototype;

/**
 * Original emit function.
 *
 * @api private
 */
JSocket.prototype.$emit = EventEmitter.prototype.emit;

/**
 * Data handler.
 */
var dataHandler = function(data) {
	var tempJsonData = '';
	var i;
	jsonData.push(data);
	try{
		for (i=0;i<jsonData.length;i++) {
			tempJsonData += jsonData[i];
			console.log('DATA : ' +i+ ":" + tempJsonData);
		}
		
		var obj = JSON.parse(tempJsonData)
		// Write the data back to the socket, the client will receive it as data from the server
		socket.write('JSON data: ' + tempJsonData);
		jsonData = new Array;
	} catch (e) {
		console.log("not JSON");
	}
}

var parseString = function(jsonString) {
	if (jsonString.charAt(0) != '{') return false;
	
	var closeIndex = jsonString.indexOf('}');
	if (closeIndex == -1) return false;
	
	
	
}






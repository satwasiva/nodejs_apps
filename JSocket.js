/**
 * Module dependencies.
 */
var events = require('events');
var EventEmitter = process.EventEmitter;
var socket;
var jsonString;

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
  jsonString = '';
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
	jsonString += data;
	
	if (jsonString.charAt(0) != '{') return false;
	
	var closeIndex = jsonString.indexOf('}');
	if ((closeIndex == -1) || (closeIndex == 0)) return false;
	
    console.log('DATA : ' + jsonString);
	var openLeftBraceCnt = 0;
	var start = 0;
	var strLen = jsonString.length;
	
    console.log('len : ' + strLen);
	for(i=0;i<strLen;i++)
	{
		switch (jsonString[i])
		{
			case '{': openLeftBraceCnt++;
				break;
			case '}': openLeftBraceCnt--;
				break;
		}
		
		console.log('i : ' + i + "lbc: " + openLeftBraceCnt);
		if ((openLeftBraceCnt == 0))
		{
			var subString = jsonString.substring(start,i+1);
			console.log('substring : ' + subString);
			try{
				JSON.parse(subString);
				// Write the data back to the socket, the client will receive it as data from the server
				socket.write('JSON data: ' + subString);
				subString = '';
				start = i+1;
			} catch (e) {
				console.log("not JSON");
				return;
			}
		}
	}
	jsonString = jsonString.slice(start);
}







Playviews Server Developer Code Test

Language:  Node.js


Please choose one or both of the following problems to solve.  Feel free to include a README.md file to explain your implementation or approach.  Since this is a code test, we do not expect your code to be production ready, but you may wish to include notes on what steps you would take to harden your code for deployment.

You are free to use any resources that would be available to you in a standard work environment (Google, node modules, open source software, etc) but please limit the code you submit to code you wrote yourself.  Be prepared to explain and answer technical questions about your code.

1.  TCP Defragmenter

The TCP protocol guarantees in-order delivery, but since it is a stream protocol it does not guarantee that a message will be received in one piece, or that only one message will be received at a time.  Write a module that acts like a standard net.Socket, but that emits a data event for each complete block of JSON it receives.

Your module should be named JSocket and will be used in the following code:

var net = require('net');
var JSocket = require('./JSocket')

var server = net.createServer(function(socket) {
	var JSock = new JSocket(socket);
	JSock.on('data', function(data) {
		console.log(data);
	});
}).listen(3333);

You do not need to implement any other socket events, nor do you need to handle errors.  You may assume that your code will always receive valid JSON.


2.  Callback Queue

Often in Node.js, in order to avoid blocking program execution, a function (foo, in this case) will have a callback passed as a parameter to be called when foo is finished (foo(database, query, function(result) { ... }); ).  

Occasionally, we will want to run several long operations concurrently (several database writes, for example) and continue program execution when all the operations have completed.  Write a proof-of-concept system for accomplishing this.

For full credit, your system should be able to handle multiple simultaneous callback queues.


Question 1:

Files included: client.js, server.js, JSocket.js

JSocket.js:

This is a wrapper module around Socket class in node.js. This class extends Emitter and contans socket object and jsonData variable that holds the json data received from client. Constructor sets listener for socket data event with data handler function. The data handler function concatenates the data to jsonData variable and checks if it is a valid json. If yes, writes it to socket which emits data event and client gets full json data. Otherwise it skips until next call to data handler arrives.

Server.js:

Sets up node js standard server which makes JSocket object and sends the data it received from client to JSocket object.

Client.js:

A standard node.js client. Making the json wites happen with broken json strings.


Question 2:

For asynchronous queueing async library can be used with parallel or series method for queueing system. In addition, keep a counter for all the calls made and check for the counter value. Once it is zero, have the logic to continue the execution further.

async.parallel([
    function(callback){
        // do some stuff ...
        callback(null, 'one');
		counter++;
    },
    function(callback){
        // do some more stuff ...
        callback(null, 'two');
		counter++;
    },
],

//callback
function(err, results){
	counter--;
	if (counter <=0) {
		//logic to go further in the process.
	}
});
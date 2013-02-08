var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    console.log("Starting simple fragmentation test.");
    client.write('{"key1":"value1"');
    client.write(',"key2":"value2"}');

    console.log("Sending two JSON blocks in one packet to simulate packet combination")
    client.write('{"key3":"value3"}{"key4":"value4"}');

    console.log("Sending joined, then fragmented packets.");
    client.write('{"key5"');
    client.write(':"value5"}{"key6":');
    client.write('"value6"}{"key7":"value7"}');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    //client.destroy();
    
});

client.on('customdata', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
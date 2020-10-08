#!/usr/bin/env node
var dgram = require('dgram');



var socket = dgram.createSocket('udp4');

socket.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    try{
    	var publicEndpointB = JSON.parse(message);
    	sendMessageToB(publicEndpointB.address, publicEndpointB.port);
    }catch(err) {}
});

function sendMessageToS () {
	var serverPort = 33333;
	var serverHost = '54.146.157.118';

	var message = new Buffer('A');
	socket.send(message, 0, message.length, serverPort, serverHost, function (err, nrOfBytesSent) {
	    if (err) return console.log(err);
	    console.log('UDP message sent to ' + serverHost +':'+ serverPort);
	    // socket.close();
	});
}

sendMessageToS();

var counter = 0;
function sendMessageToB (address, port) {
	if(counter == 5) return;
	var message = new Buffer(`Connected \n
	Received 1448 bytes \n
	HTTP/1.0 200 OK \n\n
	Cache-Control: max-age=604800 \n
	Content-Type: text/html; charset=UTF-8 \n
	Date: Thu, 25 Oct 2018 16:14:49 GMT\n
	Etag: "1541025663+ident"\n
	Expires: Thu, 01 Nov 2018 16:14:49 GMT\n
	Last-Modified: Fri, 09 Aug 2013 23:54:35 GMT\n
	Server: ECS (lga/1372)\n
	Vary: Accept-Encoding\n
	X-Cache: HIT\n
	Content-Length: 1270\n
	Connection: close\n
	\n
	<!doctype html>\n
	<html>\n
	<head>\n
		<title>Example Domain</title>\n
		<meta charset="utf-8" />\n
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n
		<meta name="viewport" content="width=device-width, initial-scale=1" />\n
		<style type="text/css">\n
		body {\n
			background-color: #f0f0f2;\n
		</style>\n
	</head>\n
	<body>\n
	<div>\n
		<h1>Example Domain</h1>\n
		<p>This domain is established to be used for illustrative examples in documents. You may use this\n
	Received 163 bytes\n
	 s without prior coordination or asking for permission.</p>\n
	</div>\n
	</body>\n
	</html>\n
	Connection Closed`
	)
	socket.send(message, 0, message.length, port, address, function (err, nrOfBytesSent) {
	    if (err) return console.log(err);
	    console.log('UDP message sent to B:', address +':'+ port);

	    setTimeout(function () {
	    	sendMessageToB(address, port);
	    }, 2000);
	});
}
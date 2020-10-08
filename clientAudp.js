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
	var message = new Buffer(`Connected
	Received 1448 bytes
	HTTP/1.0 200 OK
	Cache-Control: max-age=604800
	Content-Type: text/html; charset=UTF-8
	Date: Thu, 25 Oct 2018 16:14:49 GMT
	Etag: "1541025663+ident"
	Expires: Thu, 01 Nov 2018 16:14:49 GMT
	Last-Modified: Fri, 09 Aug 2013 23:54:35 GMT
	Server: ECS (lga/1372)
	X-Cache: HIT
	Content-Length: 1270
	Connection: close
	<!doctype html>
	<html>
	<head>
		<title>Example Domain</title>
		<meta charset="utf-8" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style type="text/css">
		body {
			background-color: #f0f0f2;
		</style>
	</head>
	<body>
	<div>
		<h1>Example Domain</h1>
		<p>This domain is established to be used for illustrative examples in documents. You may use this
	</html>
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
var http = require('http');
var url = require('url');
var request = require('request');

http.createServer(onRequest).listen(3000);

function onRequest(req, res) {

    console.log(req)
}
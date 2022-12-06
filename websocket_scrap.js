var WebSocketClient = require('websocket').client;
const fs = require('fs');

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection, req) {
    console.log('Websocket Handshake is Successful')
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('message', (data, ) => {
        console.log(data)
    })
});

client.connect('wss://web.whatsapp.com/ws/chat',null, null, {
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ar,en-US;q=0.9,en;q=0.8", 
                "Cache-Control": "no-cache",
                "Connection": "Upgrade",
                "Host": "web.whatsapp.com",
                "Origin": "https://www.abc.com",
                "Pragma": "no-cache",
                "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
                'Sec-WebSocket-Version':"13",
                "Upgrade": "websocket",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
}, null);


// wss://api.smooch.io/faye
// "Host": "api.smooch.io",
const WebSocket = require('ws')
const mic = require('mic');

module.exports = {
  openMicAndSendToSocket
}

async function openMicAndSendToSocket(audio_channel, socket_port) {

  var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 6,
    device: audio_channel
  });
  var micInputStream = micInstance.getAudioStream();
  
  const wss = new WebSocket.Server({ port: socket_port })
  wss.on('listening', ws => {
    console.log("Websocket listening on port " + socket_port)
  });
  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    });
    micInputStream.on('data', function(data) {
      console.log("Recieved Input Stream: " + data.length);
      ws.send(data);
    });
    micInputStream.on('error', function(err) {
      console.log("Error in Input Stream: " + err);
    });
    micInputStream.on('stopComplete', function() {
      console.log("Got SIGNAL stopComplete");
    });
    micInputStream.on('silence', function() {
      console.log("Got SIGNAL silence");
    });
    micInputStream.on('processExitComplete', function() {
      console.log("Got SIGNAL processExitComplete");
    });
    micInputStream.on('error', function(err) {
      console.log("Error in Input Stream: " + err);
    });
    micInputStream.on('stopComplete', function() {
      console.log("Got SIGNAL stopComplete");
    });
    micInputStream.on('silence', function() {
      console.log("Got SIGNAL silence");
    });
    micInputStream.on('processExitComplete', function() {
      console.log("Got SIGNAL processExitComplete");
    });
      
  })

}



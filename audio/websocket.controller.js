const WebSocket = require('ws')
const mic = require('mic');
const decode = require('audio-decode');
const { array } = require('mongoose/lib/utils');
module.exports = {
  openMicAndSendToSocket
}

async function openMicAndSendToSocket(audio_channel, socket_port) {

  var arrayBuffer = new ArrayBuffer();
  var firstStream;
  var sockets = [];

  var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 0,
    device: audio_channel
  });
  var micInputStream = micInstance.getAudioStream();
  var startDate = new Date();
  
  const wss = new WebSocket.Server({ port: socket_port })
  wss.on('listening', ws => {
    console.log("Websocket listening on port " + socket_port)
  });
  wss.on('connection', ws => {
    sockets.push(ws);
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    });
  })
  wss.on('close', ws => {
    sockets.forEach((item, index) =>{
      if (item == ws) sockets.splice(index, 1);
    })
  });
  micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);
    if (firstStream == undefined){
      firstStream = data;
    }
    arrayBuffer = _appendBuffer(arrayBuffer, data);      
  });
  micInputStream.on('error', function(err) {
    console.log("Error in Input Stream: " + err);
  });

  micInputStream.on('startComplete', function() {
      console.log("Got SIGNAL startComplete");
      setTimeout(function() {
              micInstance.pause();
      }, 200);
  });
      
  micInputStream.on('stopComplete', function() {
      console.log("Got SIGNAL stopComplete");
  });
      
  micInputStream.on('pauseComplete', function() {
    if (sockets.length >  0){
      sockets.forEach((item, index) => item.send(arrayBuffer));
    }
    arrayBuffer = firstStream;
    micInstance.resume();
  });
  
  micInputStream.on('resumeComplete', function() {
    console.log("Resume complete");
    setTimeout(function() {
          micInstance.pause();
    }, 200);
  });
  
  micInputStream.on('silence', function() {
      console.log("Got SIGNAL silence");
  });
  
  micInputStream.on('processExitComplete', function() {
      console.log("Got SIGNAL processExitComplete");
  });
  micInstance.start();
}

var _appendBuffer = function(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};



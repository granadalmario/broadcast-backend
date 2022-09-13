const ss = require('socket.io-stream');
var mic = require('mic');
var fs = require('fs');
const portAudio = require('naudiodon');
var channels = require('./channels.json');


module.exports = {
    play,
    stop
}

var active = false;

var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 6,
    device: "hw:2,0"
});
var micInputStream = micInstance.getAudioStream();
//var outputFileStream = fs.WriteStream('output.wav');
//micInputStream.pipe(outputFileStream);


micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);data.length
});


micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
});

micInputStream.on('startComplete', function() {
    console.log("Got SIGNAL startComplete");
    setTimeout(function() {
            micInstance.pause();
    }, 5000);
});
    
micInputStream.on('stopComplete', function() {
    console.log("Got SIGNAL stopComplete");
});
    
micInputStream.on('pauseComplete', function() {
    console.log("Got SIGNAL pauseComplete");
    setTimeout(function() {
        micInstance.resume();
    }, 5000);
});

micInputStream.on('resumeComplete', function() {
    console.log("Got SIGNAL resumeComplete");
    setTimeout(function() {
        micInstance.stop();
    }, 5000);
});

micInputStream.on('silence', function() {
    console.log("Got SIGNAL silence");
});

micInputStream.on('processExitComplete', function() {
    console.log("Got SIGNAL processExitComplete");
});


async function play(language) {
    //micInstance.start();
    //return micInputStream;
    var readStream = fs.createReadStream("example.wav", 
                                          {'flags': 'r',
                                           'encoding': 'binary', 
                                           'mode': 0666, 
                                           'bufferSize': 64 * 1024});
     readStream.on('data', function(data) {
         console.log(typeof data);
         console.log('sending chunk of data')
         socket.send(data);
     });
     socket.on('disconnect', function () {
         console.log('connection droped');
     });
}

async function stop(language) {
    micInstance.stop();    
}

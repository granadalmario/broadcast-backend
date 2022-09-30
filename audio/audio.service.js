var fs = require('fs');
const portAudio = require('naudiodon');
var channels = require('./channels.json');

module.exports = {
    getDevices,
    getSocketPortForLanguage
}

async function getDevices(){
    console.log(portAudio.getDevices());
    return portAudio.getDevices();
}

async function getSocketPortForLanguage(language) {
    return channels[language]["socketPort"];
}


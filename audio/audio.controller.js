const express = require('express');
const router = express.Router();
const audioService = require('./audio.service');

// routes
router.get('/play/:language', play);
router.get('/devices', getDevices);


module.exports = router;

function play(req, res) {
    audioService.getSocketPortForLanguage(req.params.language)
    .then((socketPort) => res.json(socketPort));
}

function getDevices(req, res) {
    audioService.getDevices().then((devices) => res.json(devices));
}
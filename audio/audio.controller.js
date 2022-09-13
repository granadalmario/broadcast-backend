const express = require('express');
const router = express.Router();
const audioService = require('./audio.service');

// routes
router.get('/play/:language', play);
router.get('/stop/:language', stop);

module.exports = router;

function play(req, res, next) {
    audioService.play(req.params.language)
        .then(stream => {
            res.writeHead(200,{
                "Content-Type": "audio/mpeg",
                'Transfer-Encoding': 'chunked'
            });
            stream.pipe(res)
        })
        .catch(err => next(err));
}

function stop(req, res, next) {
    audioService.stop(req.params.language)
        .then(stream => {
            return stream;
            /*
            res.writeHead(200, {
                'Content-Type': 'audio/mpeg'
                //'Content-Length': stat.size
            });
            stream.pipe(res)*/
        })
        .catch(err => next(err));
}
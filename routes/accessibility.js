var express = require('express');
var router = express.Router();
var axePuppeteer = require('../modules/axe-puppeteer');

/**
 * Scan endpoint to run axe audit on a website.
 */
router.get('/scan/:url', function (req, res) {

    // CORS headers - (*) allow connection from any source.
    // For better security, update this to only allow from trusted sources.
    res.set('Access-Control-Allow-Origin', '*');

    // AXE testing engine.
    // Errors will cause the Node process to crash so it will need to be restarted or
    // set to auto-restart.
    axePuppeteer(req.params.url)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            console.error('Error running axe-core:', err.message);
            process.exit(1);
        });

});

module.exports = router
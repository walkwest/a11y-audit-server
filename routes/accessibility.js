var express = require('express');
var router = express.Router();
var axePuppeteer = require('../modules/axe-puppeteer');

/**
 * Scan endpoint to run axe audit on a website.
 */
router.get('/scan/:url', function (req, res) {
  
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
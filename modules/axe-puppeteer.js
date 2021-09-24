const puppeteer = require('puppeteer');
const axeCore = require('axe-core');
const { parse: parseURL } = require('url');

/**
 * Cheap URL validation
 * @param string input 
 * @returns boolean
 */
const isValidURL = input => {
    const u = parseURL(input);
    return u.protocol && u.host;
};

/**
 * Launch puppeteer server, open the requested
 * URL and run axe-core for a11y analysis.
 * 
 * @param string url 
 * @returns json
 */
const main = async url => {
    let browser;
    let results;

    if ( ! isValidURL(url) ) {
        return {error: "Invalid website URL"}
    }

    try {
        // Setup Puppeteer
        browser = await puppeteer.launch();

        // Get new page
        const page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 768,
        });
        await page.goto(url);

        // Inject and run axe-core
        const handle = await page.evaluateHandle(`
                // Inject axe source code
                ${axeCore.source}
                // Run axe
                axe.run({
                    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
                })
            `);

        // Get screenshot
        const screenshot = await page.screenshot({
            encoding: 'base64',
        });

        // Get the results from `axe.run()` and append screenshot.
        results = await handle.jsonValue();
        results['screenshots'] = {
            'desktop': `data:image/jpg;base64, ${screenshot}`
        };

        // Destroy the handle & return axe results.
        await handle.dispose();//

    } catch (err) {

        // Ensure we close the puppeteer connection when possible
        if (browser) {
            await browser.close();
        }

        // Re-throw
        throw err;
    }

    await browser.close();

    return results;
};

module.exports = main;
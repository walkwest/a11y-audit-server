# A11y Website Testing Server

An accessibility API than can be used for testing a website's compliance to [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/guidelines) guidelines. Simply feed the API a website URL and it will return a set of results using [axe](https://www.deque.com/axe/), the world’s leading digital accessibility toolkit.

Built using the [Express](https://expressjs.com/) framework for [Node.js](https://nodejs.org/en/). 

## Requirements

- A server running [Node.js](https://nodejs.org/en/)

## Using the API

Make a GET request to `/accessibility/scan/{url}`, replacing `{url}` with the website URL you want to test. The result will be a JSON object with your [test results](https://www.deque.com/axe/core-documentation/api-documentation/#results-object) and a screenshot of the website.

## Helpful Resources
- [How To Set Up a Node.js Application On Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)
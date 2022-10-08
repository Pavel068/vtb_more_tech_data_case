const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

class Puppeteer {
    constructor() {
        if (!!Puppeteer.instance) {
            return Puppeteer.instance;
        }

        Puppeteer.instance = this;

        this.browser = null;
        this.browserWSEndpoint = null;

        return this;
    }

    async init(navigationTimeout = 30000, lazyLoad = false) {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: true,
                userDataDir: path.join(__dirname, 'tmp'),
                ignoreHTTPSErrors: true,
                args: [
                    '--lang=en-US,en',
                    '--disable-dev-shm-usage',
                    '--disable-crash-reporter',
                    '--disable-breakpad',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--window-position=0,0',
                    '--ignore-certifcate-errors',
                    '--ignore-certifcate-errors-spki-list',
                ]
            });
        }

        const browserWSEndpoint = this.browser.wsEndpoint();
        this.browser = await puppeteer.connect({browserWSEndpoint});

        const page = await this.browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        await page.setCacheEnabled(false);

        const preloadFile = fs.readFileSync(path.join(__dirname, './preload.js'), 'utf8');
        await page.evaluateOnNewDocument(preloadFile);

        await page.setDefaultNavigationTimeout(navigationTimeout);

        await page.setRequestInterception(true);
        page.on('request', request => {
            // Do nothing in case of non-navigation requests.
            if (!request.isNavigationRequest()) {
                request.continue();
                return;
            }
            // Add a new header for navigation request.
            const headers = request.headers();
            if (lazyLoad) {
                headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36 WAIT_UNTIL=load';
            } else {
                headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36';
            }

            request.continue({headers});
        });

        await page.goto('about:blank');

        return {
            browser: this.browser,
            page
        };
    }

    async autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if(totalHeight >= scrollHeight - window.innerHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
}

module.exports = Puppeteer;
const axios = require('axios')
const Puppeteer = require('./Puppeteer')
const fs = require('fs')

const PuppeteerInstance = new Puppeteer()

const getTopURLs = async (page, role) => {
        try {
            await page.goto(`https://yandex.ru/search/?text=${role}+новости`)
            await page.waitForSelector('.main__content')

            const validLinks = []
            const links = await page.$$('.serp-item_card a')
            for (const link of links) {
                let l = await page.evaluate(element => element.href, link)
                if (l.indexOf('yandex') === -1 && l.indexOf('dzen') === -1) {
                    validLinks.push(l)
                }
            }

            let output = []
            let hosts = []

            for (const l of validLinks) {
                let url = new URL(l)
                if (hosts.indexOf(url.host) === -1) {
                    hosts.push(url.host)
                    output.push(l)
                }
            }

            return output
        } catch (e) {
            console.error(e)
        }
}

const getArticlesLinks = async (page, topURLs) => {
        const articlesLinks = []
        for (const url of topURLs) {
            try {
                await page.goto(url)
                await page.waitForSelector('body')

                const articleLinks = await page.$$('article a')
                if (articleLinks.length) {
                    for (const article of articleLinks) {
                        const a = await page.evaluate(element => element.href, article)
                        if (a) {
                            articlesLinks.push(a)
                        }
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }

        return articlesLinks
}

;(async () => {
    const role = 'Генеральный+директор'
    const { browser, page } = await PuppeteerInstance.init(15000)

    const urls = await getTopURLs(page, role)
    const articlesLinks = await getArticlesLinks(page, urls)

    const result = []
    for (const article of articlesLinks) {
        try {
            await page.goto(article)
            await page.waitForSelector('meta[property="og:title"]')

            const data = {
                url: article,
                title: await page.evaluate(element => element.content, await page.$('meta[property="og:title"]')),
                description: await page.evaluate(element => element.content, await page.$('meta[property="og:description"]')),
            }
            console.log(data)
            result.push(data)
        } catch (e) {
            console.error(e)
        }
    }

    fs.writeFileSync('buh.json', JSON.stringify(result))

    await page.close()
    await browser.close()
})()
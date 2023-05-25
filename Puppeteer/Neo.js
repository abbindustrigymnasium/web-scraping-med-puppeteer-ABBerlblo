import puppeteer from "puppeteer"
import fs from "fs"

// const sleep = s => new Promise(r => setTimeout(r, s * 1000))
const url = "https://www.imdb.com/chart/top/"

async function PageScrape (page, ext) {
    let nav = "https://www.imdb.com" + ext
    page.goto(nav, { waitUntil: "domcontentloaded" })

    let items = await page.evaluate(() => {
        let moviedata = document.querySelector(".sc-52d569c6-0.kNzJA-D")

        return Array.from(moviedata).map((movieinfo) => {
            let title = movieinfo.querySelector("sc-afe43def-0.hnYaOZ > span").innerText
            let year = movieinfo.querySelector("ul > li.ipc-inline-list__item > a").innerText
            let rating = movieinfo.querySelector("ul > li.ipc-inline-list__item > a").innerText
            let length = movieinfo.querySelector("ul > li.ipc-inline-list__item").innerText
            let genre = movieinfo.querySelector("")
            let genres = Array.from(genre).map((innerData) => {
                let genredata = innerData.querySelectorAll("").innerText
                return genredata
            })
            return { title, year, rating, length, genres }
        })
    })
    console.log(items)
}

const launch = async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: null
        }
    )

    const website = await browser.newPage()
    await website.goto(url, { waitUntil: "domcontentloaded" })

    const links = await website.evaluate(() => {
        let data = document.querySelectorAll(".chart.full-width > .lister-list > tr")
        return Array.from(data).map((info) => {
            const link = info.querySelector("td.titleColumn > a").getAttribute("href")
            return link
        })
    })

    for (let link of links) {
        console.log(link)
        await PageScrape(website, link)
    }

    await browser.close()
}

await launch()
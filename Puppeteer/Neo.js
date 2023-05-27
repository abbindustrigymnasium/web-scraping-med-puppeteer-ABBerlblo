const fs = require("fs")
const puppeteer = require("puppeteer")

const url = "https://www.imdb.com/chart/top/"

async function PageScrape (page, ext) {
    let nav = "https://www.imdb.com" + ext
    await page.goto(nav, { waitUntil: "domcontentloaded" })

    let items = await page.evaluate(() => {
        function convertDurationToMinutes (duration) {
            const hours = parseInt(duration.match(/(\d+)h/)?.[1] ?? 0)
            const minutes = parseInt(duration.match(/(\d+)m/)?.[1] ?? 0)
            return hours * 60 + minutes
        }

        let moviedata = document.querySelectorAll(".gDnnOB")

        return Array.from(moviedata).map((movieinfo) => {
            let title = movieinfo.querySelector(".sc-afe43def-1.fDTGTb").innerText
            let imageUrl = "https://www.imdb.com" + movieinfo.querySelector(".ipc-lockup-overlay.ipc-focusable").getAttribute("href")
            let year = movieinfo.querySelector(".ipc-inline-list.ipc-inline-list--show-dividers.sc-afe43def-4.kdXikI.baseAlt a").innerText
            let rating = movieinfo.querySelector(".sc-bde20123-1.iZlgcd").innerText
            let duration = movieinfo.querySelector(".ipc-inline-list.ipc-inline-list--show-dividers.sc-afe43def-4.kdXikI.baseAlt li:nth-child(3)").innerText
            let genres = Array.from(document.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt")).map((tag) => tag.querySelector("span").innerText)

            let lenghtMin = convertDurationToMinutes(duration)

            return {
                title: title,
                year: year,
                rating: rating,
                length: lenghtMin,
                imageUrl: imageUrl,
                genres: genres,
            }
        })
    })
    return items
}

const launch = async () => {
    try {
        const browser = await puppeteer.launch(
            {
                headless: false,
                args: ["--disable-setuid-sandbox"],
                ignoreHTTPSErrors: true,
                defaultViewport: null
            }
        )

        const website = await browser.newPage()
        await website.goto(url, { waitUntil: "domcontentloaded" })

        const links = await website.evaluate(() => {
            let data = document.querySelectorAll(".lister-list > tr")
            return Array.from(data).map((info) => {
                const link = info.querySelector("a").getAttribute("href")
                return link
            })
        })

        let films = []
        let i = 1

        for (let link of links) {
            try {
                films.push(await PageScrape(website, link))
                const progress = ((i / links.length) * 100).toFixed(2)
                console.log(`Progress: ${progress}% (${i}/${links.length})`)
                i++
            } catch (err) {
                console.log("Error occurred while scraping page:", err)
                console.log("Skipping to the next link...")
                continue
            }
        }

        const data = { films: films.flat() }

        fs.writeFile(`./Data/Top_db.json`, JSON.stringify(data), "utf8", function (err) {
            if (err) {
                return console.log(err)
            }
            console.log(`The data has been scraped and saved successfully! View it at 'db.json'`)
        })

        await browser.close()
    } catch (err) { console.log("Error occurred while launching Puppeteer:", err) }
}

launch()
const fs = require("fs")

const scraperObject = {
  url: "https://www.IMDb.com/",
  async scraper (browser, extention, genre) {
    let page = await browser.newPage()

    console.log(`Navigating to ${this.url}...`)
    await page.goto(`${this.url}${extention}`, { waitUntil: "domcontentloaded" })

    const PoIs = await page.$$eval(".lister-list tr", (data) =>
      data.map((info) => info.querySelector("a").getAttribute("href"))
    )

    let products = await page.evaluate(async () => {
      const list = []
      for (const PoI of PoIs) {
        await page.goto(`${this.url}${PoI}`, { waitUntil: "domcontentloaded" })

        const name = document.querySelector(".sc-afe43def-1.fDTGTb").innerHTML
        const tags = Array.from(document.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt").innerHTML)
        const year = document.querySelector(".ipc-link.ipc-link--baseAlt.ipc-link--inherit-color").innerHTML
        const rating = document.querySelector(".sc-bde20123-1.iZlgcd").innerHTML
        imageUrl = document.querySelector(".ipc-lockup-overlay__screen")

        list.push({
          title: name,
          year: year,
          rating: rating,
          imageUrl: imageUrl?.src ?? "",
          tags: tags,
        })

      }

      return list
    })

    products = products.map((p) => {
      return { ...p, genres: genre }
    })

    const result = { genre: [] }
    result.genre.push(products)

    fs.writeFile(`./Data/250_db.json`, JSON.stringify(result), "utf8", function (err) {
      if (err) {
        return console.log(err)
      }
      console.log(`The data has been scraped and saved successfully! View it at 'db.json'`)
    })

    await browser.close()
  },
}

module.exports = scraperObject
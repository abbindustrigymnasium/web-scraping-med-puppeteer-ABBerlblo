// const fs = require("fs")

// const scraperObject = {
//   url: "https://www.IMDb.com/",
//   async scraper (browser, address, genre) {
//     let page = await browser.newPage()
//     console.log(`Navigating to ${this.url}...`)
//     await page.goto(`${this.url}${"title/tt0068646/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=1a264172-ae11-42e4- 8ef7-7fed1973bb8f&pf_rd_r=TVQE4WSQB0T8KAAJQ8TW&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_2'"
//       }`, { waitUntil: "domcontentloaded" })
//     // Wait for the required DOM to be rendered

//     let products = await page.evaluate(() => {
//       const list = []
//       const GenreSorting = []
//       const items = document.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt")
//       for (const item of items) {
//         const gen = item.querySelector("span").innerHTML
//         GenreSorting.push(gen)
//       }
//       list.push({ gen: GenreSorting })
//       return list

//     })

//     fs.writeFile(
//       `_db.json`,
//       JSON.stringify(products),
//       "utf8",
//       function (err) {
//         if (err) {
//           return console.log(err)
//         }
//         console.log(
//           `The data has been scraped and saved successfully! View it at 'db.json'`
//         )
//       }
//     )

//     await browser.close()
//   },
// }

// module.exports = scraperObject

// const fs = require("fs")

// const scraperObject = {
//   url: "https://www.IMDb.com/",
//   async scraper (browser, address, genre) {
//     let page = await browser.newPage()
//     console.log(`Navigating to ${this.url}...`)
//     await page.goto(`${this.url}${address}`, { waitUntil: "domcontentloaded" })

//     // Wait for the required DOM to be rendered

//     let products = await page.evaluate(async () => {
//       const list = []
//       const items = document.querySelectorAll(".lister-list tr")
//       for (const item of items) {
//         const name = item.querySelector(".titleColumn a").innerHTML
//         const year = item.querySelector(".secondaryInfo").innerHTML.slice(1, -1)
//         const rating = item.querySelector(".imdbRating strong").innerHTML
//         imageUrl = item.querySelector(".posterColumn img")

//         const direction = item.querySelector("a").getAttribute("href")
//         let Newpage = await browser.newPage()
//         console.log(`Navigating to ${this.url}${direction}...`)
//         await Newpage.goto(`${window.location.origin}${direction}`, { waitUntil: "domcontentloaded" })

//         let gen = Newpage.evaluate(async () => {
//           const GenreSorting = []
//           const Tags = document.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt")
//           list.push(Tags)
//         })
//         Newpage.close()
//         // for (const tag of Tags) {
//         //   const gen = tag.querySelector("span").innerHTML
//         //   GenreSorting.push(gen)
//         //   consol.push(gen)
//         // }

//         // page.close()

//         // list.push({
//         //   name: name,
//         //   year: year,
//         //   rating: rating,
//         //   imageUrl: imageUrl?.src ?? "",
//         //   gen: GenreSorting,
//         // })
//       }
//       return list
//     })

//     products = products.map((p) => {
//       return { ...p, genres: genre }
//     })

//     const result = { genre: [] }
//     result.genre.push(products)

//     fs.writeFile(`250_db.json`, JSON.stringify(result), "utf8", function (err) {
//       if (err) {
//         return console.log(err)
//       }
//       console.log(`The data has been scraped and saved successfully! View it at 'db.json'`)
//     })

//     await browser.close()
//   },
// }

// module.exports = scraperObject

// let length = movieinfo.querySelector("ul > li.ipc-inline-list__item").innerText
            // let genre = movieinfo.querySelector(".ipc-chip-list__scroller")
            // let genres = Array.from(genre).map((innerData) => { innerData.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt span").innerText })
            // let genres = []
            // let tags = document.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt")
            // for (const tag of tags) {
            //     const genre = tag.querySelector("span").innerText
            //     genres.push(genre)
            // }
            // let genre = movieinfo.querySelector(".ipc-chip-list__scroller")
            // let genres = Array.from(genre).map((innerData) => {
            //     return innerData.querySelectorAll(".ipc-chip.ipc-chip--on-baseAlt span").innerText
            // })
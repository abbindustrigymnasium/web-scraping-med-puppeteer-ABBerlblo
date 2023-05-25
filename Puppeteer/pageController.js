const pageScraper = require("./pageScraper")

async function scrapeAll (browserInstance) {
  let browser
  try {
    browser = await browserInstance

    await pageScraper.scraper(
      browser,
      "chart/top/?ref_=nv_mv_250",
      "Top250"
    )

  } catch (err) {
    console.log("Could not resolve the browser instance => ", err)
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)

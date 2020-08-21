const extractUrls = () => {
  const trackItems = document.querySelectorAll('.trackItem__content .trackItem__trackTitle');
  const trackUrls = [];

  for (let track of trackItems) {
    trackUrls.push(track.href);
  }
  return trackUrls;
};

const getTrackUrls = async (browser, url) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 926 });
  await page.goto(url);
  // change 3rd parameter for max num of songs in tracklist - can't get around soundcloud login to automatically get playlist track amount
  let trackUrls = await scrapeInfiniteScrollItems(page, extractUrls, 22);
  return trackUrls;
};

const scrapeInfiniteScrollItems = async (
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000
) => {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
  } catch(e) { 
    items = await page.evaluate(extractItems);
  }
  return items;
}

module.exports = {
  getTrackUrls
}
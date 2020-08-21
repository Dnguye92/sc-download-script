const puppeteer = require('puppeteer');
const { PLAYLIST_URL, SC_TO_MP3_URL } = require('./utils');
const { BROWSER_CONFIGS } = require('./browser-configs');
const { getTrackUrls } = require('./get-track-urls');
const { soundcloudDownloader } = require('./soundcloud-downloader');

(async () => {
  const browser = await puppeteer.launch(BROWSER_CONFIGS);
  try {
    const trackUrls = await getTrackUrls(browser, PLAYLIST_URL);
    await soundcloudDownloader(browser, SC_TO_MP3_URL, trackUrls);
  } finally {
    await browser.close();
  }
})();

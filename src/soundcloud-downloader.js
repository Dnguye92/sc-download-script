const { disableAssets } = require('./disable-assets');

const soundcloudDownloader = async (browser, url, trackUrls) => {
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 926 });
  await disableAssets(page);
  await page.goto(url, { waitUntil: 'networkidle2' });
  for (const trackUrl of trackUrls) {
    await insertUrlIntoDownloader(page, trackUrl);
  }
};

const insertUrlIntoDownloader = async (page, url) => {
  const inputSelector = '#conversionForm input.form-control';
  const downloadButtonSelector = '.input-group-btn button.btn.btn-color';
  const downloadTrackSelector = 'a#download-btn.btn.btn-lg.btn-success';
  const convertNewTrackSelector = 'a.btn.btn-lg.btn-success.mb25';
  await Promise.all([
    await page.waitForSelector(inputSelector),
    await page.focus(inputSelector),
    await page.keyboard.type(url),
    await page.waitFor(3000),
    await page.waitForSelector(downloadButtonSelector),
    await page.click(downloadButtonSelector),
    await page.waitFor(3000),
    await page.waitForSelector(downloadTrackSelector),
    await page.click(downloadTrackSelector),
    await page.waitFor(3000),
    await page.waitForSelector(convertNewTrackSelector),
    await page.click(convertNewTrackSelector)
  ]);
};

module.exports = {
  soundcloudDownloader
}
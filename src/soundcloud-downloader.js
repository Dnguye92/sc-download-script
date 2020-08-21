const soundcloudDownloader = async (browser, url, trackUrls) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 926 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  for (const trackUrl of trackUrls) {
    await insertUrlIntoDownloader(page, trackUrl);
  }
};

const insertUrlIntoDownloader = async (page, url) => {
  const inputSelector = '#conversionForm input.form-control';
  const downloadButtonSelector = '.input-group-btn button';
  await Promise.all([
    await page.waitForSelector(inputSelector),
    await page.focus(inputSelector),
    await page.keyboard.type(url),
    await page.waitFor(4000),
    await page.waitForSelector(downloadButtonSelector),
    await page.click(downloadButtonSelector),
    await page.waitFor(7000),
    await page.waitForSelector('.btn.btn-lg.btn-success'),
    await page.click('.btn.btn-lg.btn-success'),
    await page.waitFor(7000),
    await page.waitForSelector('.btn.btn-lg.btn-success'),
    await page.click('.btn.btn-lg.btn-success')
  ]);
};

module.exports = {
  soundcloudDownloader
}
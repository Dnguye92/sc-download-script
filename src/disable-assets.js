const disableAssets = async (page) => {
  await page.setRequestInterception(true);

  page.on('request', req => {
    if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
      req.abort();
    } else {
      req.continue();
    }
  });
};

module.exports = {
  disableAssets
};
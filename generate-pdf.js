const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML file
  await page.goto(`file://${path.resolve('./resume.html')}`, {
    waitUntil: 'networkidle0',
  });

  // Wait a bit more to ensure fonts and layout are fully loaded
  await page.waitFor(2000);

  // Generate PDF with specific options
  await page.pdf({
    path: 'resume.pdf',
    format: 'A4',
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  // eslint-disable-next-line no-console
  console.log('PDF generated successfully with custom script!');
})();

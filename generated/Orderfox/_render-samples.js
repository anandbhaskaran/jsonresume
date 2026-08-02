const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const htmlPath = path.resolve(__dirname, 'work-samples.html');
  const pdfPath = path.resolve(__dirname, 'work-samples.pdf');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitFor(500);

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`PDF generated: ${pdfPath}`);
})();

const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const theme = require('./index.js');

async function generatePDF() {
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
  console.log('PDF generated successfully!');
}

async function build() {
  try {
    // Get the resume file path from command line arguments or use default
    const resumeFile = process.argv[2] || './resume.json';

    // Check if the file exists
    if (!fs.existsSync(resumeFile)) {
      throw new Error(`Resume file not found: ${resumeFile}`);
    }

    // Read the resume file
    const resume = JSON.parse(fs.readFileSync(resumeFile, 'utf-8'));
    // eslint-disable-next-line no-console
    console.log(`Using resume file: ${resumeFile}`);

    // Generate the HTML
    const html = theme.render(resume);

    // Write the HTML file
    fs.writeFileSync('./resume.html', html);
    // eslint-disable-next-line no-console
    console.log('HTML generated successfully!');

    // Always generate PDF
    await generatePDF();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build process
build();

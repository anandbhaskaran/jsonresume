const fs = require('fs');
const theme = require('./index.js');

// Read the resume.json file
const resume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'));

// Generate the HTML
const html = theme.render(resume);

// Write the HTML file
fs.writeFileSync('./resume.html', html);

// Also generate PDF if requested
if (process.argv.includes('--pdf')) {
  // eslint-disable-next-line global-require
  require('./generate-pdf.js');
}

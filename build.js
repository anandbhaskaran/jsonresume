const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const util = require('util');
const theme = require('./index.js');

const execPromise = util.promisify(exec);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility function to normalize job titles (lowercase, hyphenated)
function normalizeJobTitle(jobTitle) {
  return jobTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Function to prompt user for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to prompt user for multi-line input
function promptMultiLine(question) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-console
    console.log(question);
    // eslint-disable-next-line no-console
    console.log('(Enter your job description. Type "END" on a new line when finished)');

    const lines = [];

    const processLine = (line) => {
      if (line.trim() === 'END') {
        rl.removeListener('line', processLine);
        resolve(lines.join('\n').trim());
      } else {
        lines.push(line);
      }
    };

    rl.on('line', processLine);
  });
}

async function generatePDF(outputPath = 'resume.pdf', htmlPath = './resume.html') {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML file
  await page.goto(`file://${path.resolve(htmlPath)}`, {
    waitUntil: 'networkidle0',
  });

  // Wait a bit more to ensure fonts and layout are fully loaded
  await page.waitFor(2000);

  // Generate PDF with specific options
  await page.pdf({
    path: outputPath,
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
  console.log(`PDF generated successfully: ${outputPath}`);
}

async function buildCustomCV() {
  try {
    // Get job application details from user
    const companyName = await prompt('Enter company name: ');
    const jobTitle = await prompt('Enter job title: ');
    const jobUrl = await prompt('Enter job URL (optional): ');
    const jobDescription = await promptMultiLine('Enter job description (optional):');

    // Normalize job title for file naming
    const normalizedJobTitle = normalizeJobTitle(jobTitle);

    // Create company folder if it doesn't exist
    const companyFolder = `./generated/${companyName}`;
    if (!fs.existsSync(companyFolder)) {
      fs.mkdirSync(companyFolder, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(`Created folder: ${companyFolder}`);
    }

    // Call API to generate customized resume
    // eslint-disable-next-line no-console
    console.log('Generating customized resume via API...');

    // Create temporary file for the JSON payload to handle multi-line content
    const tempPayload = { job_description: jobDescription };
    const tempFile = './temp_payload.json';
    fs.writeFileSync(tempFile, JSON.stringify(tempPayload));

    const curlCommand = `curl --location 'https://api.anand-creations.com/webhook/resume/generate' \\
--header 'Content-Type: application/json' \\
--data @${tempFile} \\
--silent`;

    let baseResume;
    try {
      const { stdout, stderr } = await execPromise(curlCommand);

      // Clean up temporary file
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }

      if (stderr) {
        throw new Error(`API call failed: ${stderr}`);
      }

      const apiResponse = JSON.parse(stdout);

      // Check if API returned an error (like webhook not registered)
      if (apiResponse.code && apiResponse.code !== 200) {
        throw new Error(`API Error: ${apiResponse.message || 'Unknown API error'}`);
      }

      baseResume = apiResponse;
      // eslint-disable-next-line no-console
      console.log('✓ Received customized resume from API');
    } catch (error) {
      // Clean up temporary file in case of error
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }

      // eslint-disable-next-line no-console
      console.warn(`⚠ API call failed: ${error.message}`);
      // eslint-disable-next-line no-console
      console.log('📄 Falling back to local resume.json file...');

      // Fallback to local resume.json
      if (!fs.existsSync('./resume.json')) {
        throw new Error('Resume file not found: ./resume.json');
      }
      baseResume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'));
    }

    // Add job application metadata as a comment in the JSON
    const customResume = {
      ...baseResume,
      _jobApplication: {
        company: companyName,
        jobTitle,
        jobUrl,
        jobDescription,
        createdAt: new Date().toISOString(),
      },
    };

    const resumeFileName = `${normalizedJobTitle}.json`;
    const resumeFilePath = path.join(companyFolder, resumeFileName);

    fs.writeFileSync(resumeFilePath, JSON.stringify(customResume, null, 2));
    // eslint-disable-next-line no-console
    console.log(`Created custom resume: ${resumeFilePath}`);

    // Generate HTML
    const html = theme.render(customResume);
    const htmlFileName = `${normalizedJobTitle}.html`;
    const htmlFilePath = path.join(companyFolder, htmlFileName);

    fs.writeFileSync(htmlFilePath, html);
    // eslint-disable-next-line no-console
    console.log(`Generated HTML: ${htmlFilePath}`);

    // Generate PDF
    const pdfFileName = `${normalizedJobTitle}.pdf`;
    const pdfFilePath = path.join(companyFolder, pdfFileName);

    await generatePDF(pdfFilePath, htmlFilePath);

    // eslint-disable-next-line no-console
    console.log(`\nCustom CV created successfully for ${companyName} - ${jobTitle}!`);
    // eslint-disable-next-line no-console
    console.log(`Files created in: ${companyFolder}/`);
    // eslint-disable-next-line no-console
    console.log(`- Resume JSON: ${resumeFileName}`);
    // eslint-disable-next-line no-console
    console.log(`- HTML: ${htmlFileName}`);
    // eslint-disable-next-line no-console
    console.log(`- PDF: ${pdfFileName}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Custom CV build failed:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

async function build() {
  try {
    // Check if user wants to build a custom CV for a job application
    const customCV = await prompt('Do you want to build a custom CV for a job application? (y/N): ');

    if (customCV.toLowerCase() === 'y' || customCV.toLowerCase() === 'yes') {
      await buildCustomCV();
      return;
    }

    // Continue with regular build process
    rl.close();

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

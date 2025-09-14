const fs = require('fs');
const path = require('path');

// Test the normalize function
function normalizeJobTitle(jobTitle) {
  return jobTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Test cases
console.log('Testing normalizeJobTitle function:');
console.log('Senior Software Engineer ->', normalizeJobTitle('Senior Software Engineer'));
console.log('Full-Stack Developer ->', normalizeJobTitle('Full-Stack Developer'));
console.log('JavaScript & React Developer ->', normalizeJobTitle('JavaScript & React Developer'));
console.log('Lead UI/UX Designer ->', normalizeJobTitle('Lead UI/UX Designer'));

// Test folder creation
const testCompany = 'TestCompany123';
const testFolder = `./${testCompany}`;

console.log('\nTesting folder creation:');
if (!fs.existsSync(testFolder)) {
  fs.mkdirSync(testFolder, { recursive: true });
  console.log(`✓ Created folder: ${testFolder}`);
} else {
  console.log(`✓ Folder already exists: ${testFolder}`);
}

// Test JSON file creation
const testResume = {
  basics: {
    name: "Test User",
    email: "test@example.com"
  },
  _jobApplication: {
    company: testCompany,
    jobTitle: "Senior Developer",
    jobUrl: "https://example.com",
    jobDescription: "Test description",
    createdAt: new Date().toISOString(),
  },
};

const normalizedJobTitle = normalizeJobTitle("Senior Developer");
const resumeFileName = `${normalizedJobTitle}.json`;
const resumeFilePath = path.join(testFolder, resumeFileName);

fs.writeFileSync(resumeFilePath, JSON.stringify(testResume, null, 2));
console.log(`✓ Created test resume: ${resumeFilePath}`);

console.log('\nTest completed successfully!');

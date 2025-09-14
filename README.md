# Macchiato Theme! ☕️+🥛

Macchiato it's a [JSON Resume](https://jsonresume.org/) theme based on [Theme Boilerplate](https://github.com/jsonresume/jsonresume-theme-boilerplate) and [Caffeine Theme](https://github.com/kelyvin/jsonresume-theme-caffeine).

## Why?

I wanted to build my own resume theme, so I decided to start from a theme I like a lot and tring to make it a bit more personal.

I also wanted I simple environment, so I used the boilerplate provided by JSON Resume instead of using the awesome work done by [kelyvin](https://github.com/kelyvin/) for it's Caffeine Theme. If you are looking for a more complete environment take a look at the caffine theme.


> ***Currently it doesn't have any major style difference from it's parent [Caffeine](https://github.com/kelyvin/jsonresume-theme-caffeine).***


## Changes from Caffeine Theme

### Environment

- Simpler and less sofisticated development environment, the same as JSON Resume boilerplate. (Caffeine has live re-building and automatic page reloading)


### Visual differences

- Add tags to projects and skills
- Switch from `UPPERCASE` to `Capitalize` on most text


## Usage

1. Download [JSON Resume CLI](https://jsonresume.org/)
  ```
  npm install -g resume-cli
  ```

2. Download the theme from [npm](https://www.npmjs.com/)
  ```
  npm install -g jsonresume-theme-macchiato
  ```

3. Use resume cli to build your resume
  ```
  resume export resume.html --theme macchiato
  ```

### PDF output

#### Using the build script

This theme includes a convenient `build.js` script that generates both HTML and PDF versions of your resume:

```bash
# Build using default resume.json file
node build.js

# Build using a custom resume file
node build.js path/to/your/resume.json
```

The script will:
1. Read your resume JSON file (defaults to `resume.json`)
2. Generate an HTML file (`resume.html`)
3. Generate a PDF file (`resume.pdf`)

#### Custom CV for Job Applications

The build script also supports creating customized CVs for specific job applications:

```bash
node build.js
# When prompted, choose 'y' for custom CV
# Enter company name, job title, job URL
# For job description: Enter multiple lines and type "END" when finished
```

**📝 Multi-line Job Description Support:**
When entering the job description, you can provide detailed, multi-line content:
- Paste the full job posting
- Include requirements, responsibilities, and company details
- Type "END" on a new line when you're finished
- The AI will analyze the entire description for better customization

When you choose the custom CV option, the script will:
1. Ask for job application details (company name, job title, URL, description)
2. Call AI API to generate a customized resume based on the job description
3. Fallback to local resume.json if API is unavailable
4. Create a company folder (if it doesn't exist)
5. Add job application metadata to the resume
6. Generate customized HTML and PDF files with normalized filenames
7. Store all files in the company folder

**Example structure after creating custom CVs:**
```
./
├── resume.json (your base resume)
├── generated/
│   ├── Google/
│   │   ├── senior-software-engineer.json
│   │   ├── senior-software-engineer.html
│   │   └── senior-software-engineer.pdf
│   └── Microsoft/
│       ├── frontend-developer.json
│       ├── frontend-developer.html
│       └── frontend-developer.pdf
```

**🤖 AI-Powered Customization:**
The script uses an AI API to automatically customize your resume content based on the job description you provide. This includes:
- Tailoring your summary to match the role requirements
- Highlighting relevant skills and experience
- Optimizing keywords for the specific position
- If the API is unavailable, it gracefully falls back to your local resume.json

**Example multi-line job description input:**
```
Enter job description (optional):
(Enter your job description. Type "END" on a new line when finished)
We are seeking a Senior Software Engineer to join our team.

Requirements:
- 5+ years of React.js experience
- Strong Node.js background
- AWS cloud platform expertise
- Leadership and mentoring skills

Responsibilities:
- Design scalable web applications
- Lead cross-functional teams
- Code reviews and best practices
END
```

This helps you:
- Keep track of applications for different companies
- Maintain version history of customized resumes
- Organize your job search materials efficiently
2. Generate an HTML file (`resume.html`)
3. Generate a PDF file (`resume.pdf`)

#### Manual PDF generation

Probably you want a PDF version of your resume...

JSONResume CLI should be able to make a PDF out of your JSON but I always struggled to get it to work,
so I switched to a more direct and effective approach.

I use Puppeteer-CLI to make a PDF from my HTML resume.

```
npm install -g puppeteer-cli
puppeteer --wait-until networkidle0 --margin-top 0 --margin-right 0 --margin-bottom 0 --margin-left 0 --format A4 print resume.html resume.pdf
```

Obviously you could write a very simple Node script to use the real Puppeteer and the `render` function to make a PDF without first exporting the HTML version.

Also checkout [HackMyResume](https://github.com/hacksalot/HackMyResume), a powerful tool to build and analyze your JSON Resume.


## License

Available under the [MIT license](http://mths.be/mit).


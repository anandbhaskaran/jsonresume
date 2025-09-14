# AI Agents & Automation Guide

This document outlines the AI agents and automation workflows available for the Anand Bhaskaran resume project.

## Project Overview

This is a JSON Resume-based project using the Macchiato theme to maintain and generate Anand Bhaskaran's professional resume. The primary goal is to produce a high-quality PDF resume while maintaining simple, modern, and top-notch UX.

## Available AI Agents & Automations

### 1. Resume Content Agent
**Purpose**: Assists with updating and optimizing resume content in `resume.json`

**Capabilities**:
- Content review and enhancement suggestions
- Skills and experience optimization
- Format validation according to JSON Resume schema
- Language and tone improvements

**Usage**: Directly edit `resume.json` or ask for content suggestions

### 2. PDF Generation Agent
**Purpose**: Automates the HTML to PDF conversion process

**Capabilities**:
- Converts `resume.html` to `resume.pdf` using Puppeteer
- Optimizes PDF formatting (A4, margins, print-friendly)
- Ensures consistent visual output
- Validates PDF generation quality

**Command**:
```bash
puppeteer --wait-until networkidle0 --margin-top 0 --margin-right 0 --margin-bottom 0 --margin-left 0 --format A4 print resume.html resume.pdf
```

### 3. Style & UX Agent
**Purpose**: Maintains and improves the visual design and user experience

**Capabilities**:
- CSS optimization in `src/style.css`
- Handlebars template improvements in `src/partials/`
- Responsive design enhancements
- Print media queries optimization
- Modern design pattern implementation

**Focus Areas**:
- Typography and readability
- Color scheme and contrast
- Layout and spacing
- Professional appearance
- Print optimization

### 4. Theme Development Agent
**Purpose**: Manages the Macchiato theme customizations

**Capabilities**:
- Handlebars template modifications
- Component development in `src/partials/`
- Theme configuration updates
- JSON Resume schema compliance
- Cross-browser compatibility

### 5. Quality Assurance Agent
**Purpose**: Ensures output quality and consistency

**Capabilities**:
- Visual regression testing (using Jest + Puppeteer)
- PDF output validation
- Content accuracy verification
- Performance optimization
- Accessibility compliance

**Test Command**:
```bash
npm test
```

## Workflow Automation

### Standard Resume Update Process

1. **Content Update**: Modify `resume.json` with new information
2. **Theme Generation**: Run `node index.js` to generate `resume.html`
3. **PDF Creation**: Use Puppeteer to convert HTML to PDF
4. **Quality Check**: Validate visual output and formatting
5. **Version Control**: Commit changes with descriptive messages

### Automated Pipeline Commands

```bash
# Full regeneration pipeline
resume export resume.html --theme .  # Generate HTML from JSON
npm test                         # Run visual tests
puppeteer --wait-until networkidle0 --margin-top 0 --margin-right 0 --margin-bottom 0 --margin-left 0 --format A4 print resume.html resume.pdf
```

## JSON Resume Schema Reference

The project follows the official JSON Resume schema with the following sections:

### Core Sections
- **basics**: Personal information, contact details, and social profiles
- **work**: Professional experience with highlights and achievements
- **education**: Academic background and relevant coursework
- **skills**: Technical and professional competencies with proficiency levels
- **projects**: Notable projects with descriptions and outcomes

### Optional Sections
- **volunteer**: Volunteer work and community involvement
- **awards**: Recognition and achievements
- **certificates**: Professional certifications and credentials
- **publications**: Articles, papers, or other published works
- **languages**: Language proficiencies
- **interests**: Personal interests and hobbies
- **references**: Professional references

### Schema Validation Guidelines
- All date fields should use ISO 8601 format (YYYY-MM-DD)
- URLs must be valid and accessible
- Required fields in `basics`: name, label, email
- Skills should include relevant keywords for ATS optimization
- Work experience should include quantified achievements
- All sections are optional except `basics`

## Agent Guidelines

### Design Principles
- **Simplicity**: Keep designs clean and professional
- **Modernity**: Use contemporary design patterns
- **UX Focus**: Prioritize readability and visual hierarchy
- **PDF Optimization**: Ensure excellent print/PDF output
- **Responsiveness**: Maintain quality across different formats

### Content Standards
- Professional tone and language
- Quantified achievements where possible
- Consistent formatting and structure
- Relevant and up-to-date information
- ATS-friendly formatting

### Technical Standards
- Valid JSON Resume schema compliance
- Clean, maintainable Handlebars templates
- Optimized CSS for print media
- Cross-platform PDF compatibility
- Version-controlled changes

## Integration Points

### External Tools
- **Puppeteer**: PDF generation and visual testing
- **Handlebars**: Template engine for HTML generation
- **Jest**: Testing framework for quality assurance
- **ESLint/Prettier**: Code quality and formatting

### File Dependencies
- `resume.json` → `resume.html` → `resume.pdf`
- `src/partials/*.hbs` → Template components
- `src/style.css` → Styling and print optimization
- `index.js` → Theme compilation engine

## Support & Maintenance

For optimal results:
- Keep content concise and impactful
- Regularly update skills and experience
- Test PDF output after changes
- Maintain consistent formatting
- Follow semantic versioning for releases

---

*This project maintains Anand Bhaskaran's professional resume with a focus on modern design, excellent UX, and high-quality PDF output.*

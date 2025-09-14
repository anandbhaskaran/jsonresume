# Copilot Instructions for JSON Resume Project

## Project Context

This is **Anand Bhaskaran's professional resume project** built with JSON Resume and the Macchiato theme. The primary objective is to m### Testing & Validation

### Before Committing
- [ ] JSON Resume schema validation passes
- [ ] All required fields are present in basics section
- [ ] Date fields use proper YYYY-MM-DD format
- [ ] All URLs are valid and accessible
- [ ] HTML output generates without errors
- [ ] PDF renders correctly with proper formatting
- [ ] Visual regression tests pass
- [ ] Print preview looks professional
- [ ] All contact information is accurate

### Schema-Specific Validation
- [ ] `basics.name`, `basics.label`, `basics.email` are present
- [ ] Date fields follow ISO 8601 format
- [ ] Skill keywords are relevant and ATS-friendly
- [ ] Work highlights include quantified achievements
- [ ] All URLs in profiles, work, education are functional
- [ ] Optional sections are properly structured if included high-quality, modern resume that exports beautifully to PDF format with exceptional UX.

## Core Principles

### 1. Design Philosophy
- **Simple & Modern**: Clean, professional designs that stand out
- **UX-First**: Every change should enhance readability and visual appeal
- **PDF Excellence**: Always optimize for print/PDF output quality
- **Professional Standards**: Maintain corporate-level presentation quality

### 2. Technical Standards
- Follow JSON Resume schema strictly
- Use semantic HTML and modern CSS
- Optimize for both screen and print media
- Ensure cross-browser compatibility
- Write maintainable, well-documented code

## File Structure & Responsibilities

```
├── resume.json          # Single source of truth for resume data
├── resume.html          # Generated HTML output
├── resume.pdf           # Final PDF output (generated via Puppeteer)
├── index.js             # Theme compilation engine
├── src/
│   ├── resume.hbs       # Main template
│   ├── style.css        # Styling (screen + print)
│   └── partials/        # Handlebars components
│       ├── basics.hbs   # Personal info header
│       ├── work.hbs     # Work experience
│       ├── skills.hbs   # Technical skills
│       ├── education.hbs # Education section
│       └── ...          # Other resume sections
```

## JSON Resume Schema Compliance

This project strictly follows the official JSON Resume schema. Understanding this structure is crucial for maintaining data integrity and ensuring proper template rendering.

### Complete Schema Structure

```json
{
  "basics": {
    "name": "string (required)",
    "label": "string (required) - Professional title/role",
    "image": "string - Profile photo URL",
    "email": "string (required)",
    "phone": "string",
    "url": "string - Personal website",
    "summary": "string - Professional summary",
    "location": {
      "address": "string",
      "postalCode": "string",
      "city": "string",
      "countryCode": "string",
      "region": "string"
    },
    "profiles": [
      {
        "network": "string - Platform name",
        "username": "string",
        "url": "string - Profile URL"
      }
    ]
  },
  "work": [
    {
      "name": "string - Company name",
      "position": "string - Job title",
      "url": "string - Company URL",
      "startDate": "string - YYYY-MM-DD format",
      "endDate": "string - YYYY-MM-DD format",
      "summary": "string - Role description",
      "highlights": ["string - Key achievements"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "url": "string",
      "area": "string - Field of study",
      "studyType": "string - Degree type",
      "startDate": "string - YYYY-MM-DD",
      "endDate": "string - YYYY-MM-DD",
      "score": "string - GPA/Grade",
      "courses": ["string - Relevant courses"]
    }
  ],
  "skills": [
    {
      "name": "string - Skill category",
      "level": "string - Proficiency level",
      "keywords": ["string - Specific technologies"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "startDate": "string - YYYY-MM-DD",
      "endDate": "string - YYYY-MM-DD",
      "description": "string",
      "highlights": ["string - Key outcomes"],
      "url": "string - Project URL"
    }
  ],
  "volunteer": [...],
  "awards": [...],
  "certificates": [...],
  "publications": [...],
  "languages": [...],
  "interests": [...],
  "references": [...]
}
```

### Schema Validation Rules

1. **Date Formatting**: Always use ISO 8601 format (YYYY-MM-DD)
2. **Required Fields**: `basics.name`, `basics.label`, `basics.email`
3. **URL Validation**: All URLs must be valid and accessible
4. **Consistency**: Maintain consistent formatting across similar fields
5. **ATS Optimization**: Include relevant keywords in skills and descriptions

## Development Guidelines

### When Editing resume.json
- **Validate JSON syntax** before committing
- **Follow JSON Resume schema** exactly as specified
- **Use quantified achievements** (metrics, percentages, dollar amounts)
- **Keep descriptions concise** but impactful
- **Maintain consistent date formatting** (YYYY-MM-DD)
- **Ensure all URLs are accessible and professional**
- **Include relevant keywords** for ATS optimization
- **Validate required fields** are present in basics section

### When Modifying Templates (*.hbs)
- **Follow Handlebars best practices**
- **Test with different data scenarios**
- **Maintain semantic HTML structure**
- **Ensure accessibility compliance**
- **Add appropriate CSS classes for styling**

### When Updating Styles (style.css)
- **Use CSS custom properties** for consistent theming
- **Optimize print media queries** for PDF generation
- **Maintain responsive design principles**
- **Test typography across different sizes**
- **Ensure high contrast for readability**

### When Working with PDF Generation
- **Always test PDF output** after changes
- **Verify page breaks and spacing**
- **Check for cut-off content**
- **Ensure consistent margins and formatting**
- **Test print preview in multiple browsers**

## Common Tasks & Workflows

### Adding New Work Experience
1. Update `resume.json` with new position details
2. Ensure proper date formatting (YYYY-MM-DD or YYYY-MM)
3. Include quantified achievements and impact metrics
4. Regenerate HTML: `node index.js`
5. Generate PDF and verify formatting

### Updating Skills Section
1. Add new skills to appropriate categories in `resume.json`
2. Consider skill proficiency levels and relevance
3. Test visual layout with new skill count
4. Ensure PDF formatting remains clean

### Theme Customization
1. Modify relevant partial templates in `src/partials/`
2. Update styles in `src/style.css`
3. Test across different screen sizes
4. Verify PDF output quality
5. Run visual regression tests: `npm test`

## Code Quality Standards

### HTML/Handlebars
- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Keep templates modular and reusable
- Comment complex logic or data transformations

### CSS
- Use BEM methodology for class naming
- Group related styles logically
- Include print-specific optimizations
- Maintain consistent spacing and typography scales

### JavaScript
- Follow ES6+ standards
- Handle errors gracefully
- Document complex functions
- Maintain clean, readable code

## Testing & Validation

### Before Committing
- [ ] JSON Resume schema validation
- [ ] HTML output generates without errors
- [ ] PDF renders correctly with proper formatting
- [ ] Visual regression tests pass
- [ ] Print preview looks professional
- [ ] All links and contact information are accurate

### Quality Checklist
- [ ] Typography is readable and consistent
- [ ] Colors have sufficient contrast
- [ ] Page breaks are logical
- [ ] Content fits properly on pages
- [ ] Professional appearance maintained
- [ ] No technical errors or warnings

## AI Assistant Guidelines

When helping with this project:

1. **Always prioritize PDF output quality** - this is the primary deliverable
2. **Suggest modern, professional design improvements** when appropriate
3. **Validate JSON syntax** before making changes to resume.json
4. **Test suggestions in context** of the full resume layout
5. **Consider print media implications** for all styling changes
6. **Maintain consistency** with existing design patterns
7. **Focus on UX improvements** that enhance readability
8. **Provide complete, testable solutions** rather than partial code snippets

## Troubleshooting Common Issues

### JSON Schema Validation Errors
- Verify all required fields in `basics` section are present
- Check date formatting (must be YYYY-MM-DD)
- Validate JSON syntax using a JSON validator
- Ensure array structures are properly formatted
- Check for missing commas or brackets

### PDF Generation Problems
- Check puppeteer installation and path
- Verify HTML validity before PDF conversion
- Test different margin and page size settings
- Ensure all external resources load properly

### Template Rendering Issues
- Validate that resume.json matches expected schema
- Check for missing or malformed data properties
- Ensure optional sections have proper structure
- Test with minimal data set to isolate issues

### Styling Issues
- Validate CSS syntax
- Check print media queries
- Test responsive breakpoints
- Verify font loading and fallbacks

### Template Compilation Errors
- Validate Handlebars syntax
- Check data property references against JSON schema
- Ensure all partials are properly registered
- Test with minimal data set first

---

**Remember**: This resume represents Anand Bhaskaran professionally. Every change should enhance the overall presentation quality and maintain the highest standards of design and functionality.

#!/bin/bash

# Test multi-line job description functionality
echo "Testing multi-line job description input..."

# Create multi-line input for the build script
cat << 'EOF' | node build.js
y
TestCompany
Senior Software Engineer
https://testcompany.com/careers/123
We are looking for a Senior Software Engineer to join our team.

Requirements:
- 5+ years of experience in software development
- Strong knowledge of React.js and Node.js
- Experience with cloud platforms (AWS, Azure, or GCP)
- Excellent communication skills

Responsibilities:
- Design and implement scalable web applications
- Collaborate with cross-functional teams
- Mentor junior developers
- Participate in code reviews
END
EOF

echo "Test completed. Checking results..."

# Check if folder was created
if [ -d "generated/TestCompany" ]; then
    echo "✓ Company folder created"
    ls -la generated/TestCompany/

    # Check if the JSON file contains the multi-line job description
    if [ -f "generated/TestCompany/senior-software-engineer.json" ]; then
        echo "✓ JSON file created"
        echo "Job description in JSON:"
        cat generated/TestCompany/senior-software-engineer.json | grep -A 10 "job_description"
    fi
else
    echo "✗ Company folder not created"
fi

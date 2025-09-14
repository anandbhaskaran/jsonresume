#!/bin/bash

# Test script for custom CV functionality
echo "Testing custom CV functionality..."

# Create input for the build script
cat << EOF | node build.js
y
TestCompany
Senior Frontend Developer
https://testcompany.com/jobs/123
Looking for an experienced frontend developer with React and TypeScript skills
EOF

echo "Test completed. Checking results..."

# Check if folder was created
if [ -d "TestCompany" ]; then
    echo "✓ Company folder created"
    ls -la TestCompany/
else
    echo "✗ Company folder not created"
fi

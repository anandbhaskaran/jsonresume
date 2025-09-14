#!/bin/bash

# Test the custom CV functionality with API fallback
echo "Testing custom CV functionality with API fallback..."

# Create input for the build script
printf "y\nTestCompany\nSenior Backend Developer\nhttps://testcompany.com/jobs/456\nLooking for an experienced backend developer with Node.js and MongoDB skills\n" | node build.js

echo "Test completed. Checking results..."

# Check if folder was created
if [ -d "generated/TestCompany" ]; then
    echo "✓ Company folder created"
    ls -la generated/TestCompany/

    # Check if files exist
    if [ -f "generated/TestCompany/senior-backend-developer.json" ]; then
        echo "✓ JSON file created"
    fi

    if [ -f "generated/TestCompany/senior-backend-developer.html" ]; then
        echo "✓ HTML file created"
    fi

    if [ -f "generated/TestCompany/senior-backend-developer.pdf" ]; then
        echo "✓ PDF file created"
    fi
else
    echo "✗ Company folder not created"
fi

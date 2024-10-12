#!/bin/bash

# Run the build command
npm run build

# Check if the build command was successful
if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

echo "Build was successful. Uploading to www.manoskarystinos.com"
# If the build was successful, copy the build directory to the server
scp -r ./build/ www.manoskarystinos.com:/var/www/news/news-frontend

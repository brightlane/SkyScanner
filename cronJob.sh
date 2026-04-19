#!/bin/bash

# Step 1: Run the article generation script
node /path/to/your/script/generateArticlesWithKeywords.js

# Step 2: Generate the sitemap
node /path/to/your/script/generateSitemap.js

# Step 3: Organize articles into keyword-specific folders
node /path/to/your/script/fileOrganizer.js

# Step 4: Deploy to GitHub
node /path/to/your/script/deployToGitHub.js

# Optional: Log output to a file for monitoring
echo "Cron job executed on $(date)" >> /path/to/your/logs/cron_log.txt

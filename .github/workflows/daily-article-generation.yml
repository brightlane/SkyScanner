# .github/workflows/automated-article-generation.yml
name: Daily Article Generation & Deployment

on:
  # Trigger workflow on push to the main branch and every day at midnight (UTC)
  push:
    branches:
      - main
  workflow_dispatch:  # Allow manual triggering from the GitHub UI
  schedule:
    - cron: '0 0 * * *'  # Runs every day at midnight (UTC)

jobs:
  generate-articles:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    # Run article generation script
    - name: Run article generation script
      run: node ./generateArticlesWithKeywords.js

    # Optional: Skip if not needed, or uncomment if you want to regenerate the sitemap.
    # - name: Generate Sitemap
    #   run: node ./generateSitemap.js

    # Example deployment to GitHub Pages
    - name: Deploy to GitHub Pages
      run: |
        # This is an example of how you could deploy content
        # Ensure you have a `gh-pages` branch or adjust deployment commands accordingly
        # npx gh-pages -d ./public  # Example deployment command, adjust based on your setup

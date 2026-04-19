const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

// Initialize the simple-git instance
const git = simpleGit();

// Function to deploy the changes to GitHub
async function deployToGitHub() {
  const repoPath = path.join(__dirname, './');  // Path to your GitHub repo

  try {
    // Stage all files (articles, sitemap, etc.)
    await git.cwd(repoPath);
    await git.add('./*');  // Add all files in the repo

    // Commit the changes
    await git.commit('Auto-generated articles and sitemap update');

    // Push the changes to GitHub
    await git.push('origin', 'main');  // Replace 'main' with your branch if different
    
    console.log('Deployed changes to GitHub!');
  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

// Run the deployment
deployToGitHub();

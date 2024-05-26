const { execSync } = require("child_process");

const exec = (command) => {
  try {
    return execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

const main = () => {
  console.log("Starting deployment to GitHub...");

  // Check for unstaged changes
  exec("git add .");

  // Commit changes
  const commitMessage = process.argv[2] || "Deploying updates";
  exec(`git commit -m "${commitMessage}"`);

  // Push to GitHub
  exec("git push origin main");

  console.log("Deployment to GitHub completed successfully.");
};

main();

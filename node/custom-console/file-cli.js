// file-cli.js

const fs = require('fs').promises;
const [,, command, ...args] = process.argv;

async function run() {
  try {
    switch (command) {
      case "copy":
        await fs.copyFile(args[0], args[1]);
        console.log("✅ File copied successfully.");
        break;

      case "rename":
        await fs.rename(args[0], args[1]);
        console.log("✅ File renamed successfully.");
        break;

      case "delete":
        await fs.unlink(args[0]);
        console.log("✅ File deleted successfully.");
        break;

      case "write":
        await fs.writeFile(args[0], args.slice(1).join(" "), 'utf8');
        console.log("✅ File written successfully.");
        break;

      case "read":
        const data = await fs.readFile(args[0], 'utf8');
        console.log("📄 File Content:\n", data);
        break;

      default:
        console.error("❌ Unknown command. Use: copy, rename, delete, write, read");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

run();

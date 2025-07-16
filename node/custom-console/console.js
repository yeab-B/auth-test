// console.js

const args = process.argv.slice(2); // Skips first two items
const [type, ...messageParts] = args;
const message = messageParts.join(" ");

if (!type || !message) {
  console.error("Usage: node console.js <log|error> <message>");
  process.exit(1);
}

if (type === "log") {
  console.log("[LOG]:", message);
} else if (type === "error") {
  console.error("[ERROR]:", message);
} else {
  console.error("Unknown type. Use 'log' or 'error'.");
}

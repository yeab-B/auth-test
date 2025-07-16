const log = (message) => {
    process.stdout.write(`\x1b[32m[LOG]: ${message}\x1b[0m\n`);
};

const error = (message) => {
    process.stderr.write(`\x1b[31m[ERROR]: ${message}\x1b[0m\n`);
};

const [, , type, ...msgParts] = process.argv;
const msg = msgParts.join(" ");

if (type === "log") {
    log(msg);
} else if (type === "error") {
    error(msg);
} else {
    console.error("Unknown type. Use 'log' or 'error'");
}

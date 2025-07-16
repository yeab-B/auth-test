const fs = require('fs');
const path = require('path');

const [, , command, ...args] = process.argv;

const log = (msg) => console.log(` ${msg}`);
const err = (msg) => console.error(` ${msg}`);

switch (command) {
    case 'copy': {
        const [src, dest] = args;
        fs.copyFile(src, dest, (e) => {
            if (e) return err(e.message);
            log(`Copied ${src} to ${dest}`);
        });
        break;
    }
    case 'rename': {
        const [oldName, newName] = args;
        fs.rename(oldName, newName, (e) => {
            if (e) return err(e.message);
            log(`Renamed ${oldName} to ${newName}`);
        });
        break;
    }
    case 'delete': {
        const [fileName] = args;
        fs.unlink(fileName, (e) => {
            if (e) return err(e.message);
            log(`Deleted ${fileName}`);
        });
        break;
    }
    case 'write': {
        const [fileName, ...content] = args;
        fs.writeFile(fileName, content.join(" "), (e) => {
            if (e) return err(e.message);
            log(`Wrote to ${fileName}`);
        });
        break;
    }
    case 'read': {
        const [fileName] = args;
        fs.readFile(fileName, 'utf8', (e, data) => {
            if (e) return err(e.message);
            log(`Contents of ${fileName}:`);
            console.log(data);
        });
        break;
    }
    default:
        err("Invalid command. Use copy, rename, delete, write, or read.");
}

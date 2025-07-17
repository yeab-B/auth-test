

# 📘 Practice Node: Custom Console & File CLI Tool

This project is a Node.js-based CLI utility tool that includes:

1.  A **custom console logger** mimicking `console.log()` and `console.error()`.
2.  A **CLI for file operations** like copy, rename, delete, write, and read using Node’s `fs` module.

---

## Folder Structure

```
nodeChallenge/
└── node/
    ├── custom-console/
    │   ├── custom-console.js   ← Custom logger (Task 1)
    │   ├── file.js             ← File CLI tool (Task 2)
    │   └── intern.js           ← (For future tasks)
    ├── package.json
    └── package-lock.json
```

---

## Task 1: Custom Console Logger (`custom-console.js`)

Run like:

```bash
node custom-console.js log "New intern added: John Doe"
```

###  Expected Output:

```
[LOG]: New intern added: John Doe
```

---

###  Code Explanation (Line-by-Line)

```js
const log = (message) => {
    process.stdout.write(`\x1b[32m[LOG]: ${message}\x1b[0m\n`);
};
```

* Defines a `log()` function.
* Prints message in green using ANSI escape code `\x1b[32m`.
* Uses `process.stdout.write` for more control (vs `console.log`).

```js
const error = (message) => {
    process.stderr.write(`\x1b[31m[ERROR]: ${message}\x1b[0m\n`);
};
```

* Defines an `error()` function.
* Prints message in red using `\x1b[31m`.
* Uses `stderr` for error output.

```js
const [, , type, ...msgParts] = process.argv;
```

* Extracts command-line arguments:

  * `type` is either `log` or `error`
  * `msgParts` contains the actual message.

```js
const msg = msgParts.join(" ");
```

* Joins the message parts into a single string.

```js
if (type === "log") {
    log(msg);
} else if (type === "error") {
    error(msg);
} else {
    console.error("Unknown type. Use 'log' or 'error'");
}
```

* Based on `type`, it calls the appropriate function or throws a usage error.

---

##  Task 2: File CLI (`file.js`)

Run like:

```bash
node file.js write interns.txt "John Doe - Backend Intern"
```

### Expected Output:

```
 Wrote to interns.txt
```

---

###  Code Explanation (Line-by-Line)

```js
const fs = require('fs');
const path = require('path');
```

* Imports Node’s built-in file system (`fs`) and path modules.

```js
const [, , command, ...args] = process.argv;
```

* Extracts the command (`write`, `copy`, etc.) and its arguments from terminal input.

```js
const log = (msg) => console.log(` ${msg}`);
const err = (msg) => console.error(` ${msg}`);
```

* Utility functions for showing success (`correct`) or error (`wrong`) messages.

---

###  Supported Commands

#### `write` – Write content to a file

```bash
node file.js write interns.txt "John Doe - Backend Intern"
```

* Writes message to a file (creates the file if it doesn’t exist).
* Output: ` Wrote to interns.txt`

#### `read` – Read content of a file

```bash
node file.js read interns.txt
```

* Reads and prints contents of `interns.txt`.

####  `copy` – Copy file to new location

```bash
node file.js copy interns.txt interns_backup.txt
```

* Duplicates the file.

#### `rename` – Rename a file

```bash
node file.js rename interns.txt developer_list.txt
```

* Renames the file.

#### `delete` – Delete a file

```bash
node file.js delete developer_list.txt
```

* Deletes the specified file.

---

###  Full Example Workflow (Intern Use Case)

```bash
# Step 1: Add new intern
node file.js write interns.txt "John Doe - Backend Intern"

# Step 2: Read intern list
node file.js read interns.txt

# Step 3: Backup the intern file
node file.js copy interns.txt interns_backup.txt

# Step 4: Rename the file
node file.js rename interns.txt team.txt

# Step 5: Delete the renamed file
node file.js delete team.txt
```

---

## 🔗 GitHub Repo

Repo: [nodeChallenge](https://github.com/yeab-B/nodeChallenge)

Clone:

```bash
git clone https://github.com/yeab-B/nodeChallenge.git
cd nodeChallenge/node/custom-console
```

##  What i Learned

###  What is a CLI?

A **Command Line Interface (CLI)** is a text-based way to interact with software, often faster and more scriptable than graphical user interfaces (GUIs).

###  What is `process.argv`?

`process.argv` is a **Node.js global array** that holds the command-line arguments:

```bash
node script.js arg1 arg2
```

* `process.argv[2]` = `arg1`
* `process.argv[3]` = `arg2`

Used to **create dynamic, interactive CLI tools**.

## Conclusion

This project gave you hands-on practice with:

*  Building CLI tools using `process.argv`
*  Creating styled logs and errors using color codes
*  Managing file operations with the async `fs` module
*  Using real-world scenarios (like managing intern lists) to simulate backend tools

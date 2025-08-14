const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/run", (req, res) => {
  const { code, language } = req.body;
  if (language === "javascript") {
    let output = "";
    const originalLog = console.log;
    console.log = (...args) => {
      output += args.join(" ") + "\n";
    };

    try {
      Function(code)();
      res.send(output || "");
    } catch (err) {
      res.status(400).send(err.toString());
    } finally {
      console.log = originalLog; // restore original console.log
    }
    return;
  }


  let command;

  if (language === "python") {
    const absPath = process.cwd();
    const encodedCode = Buffer.from(code).toString("base64");
    command = `docker run --rm -v "${absPath}:/app" -w /app python sh -c "echo ${encodedCode} | base64 -d > script.py && python script.py && rm -f script.py"`;
  }

  else if (language === "java") {
    let className;

    const publicClassMatch = code.match(/public\s+class\s+([A-Za-z_]\w*)/);
    if (publicClassMatch) {
      className = publicClassMatch[1];
    } else {
      const anyClassMatch = code.match(/class\s+([A-Za-z_]\w*)/);
      if (anyClassMatch) {
        className = anyClassMatch[1];
      } else {
        return res.status(400).send("Java code must contain a class.");
      }
    }

    const absPath = process.cwd();
    const encodedCode = Buffer.from(code).toString("base64");

    command = `docker run --rm -v "${absPath}:/app" -w /app openjdk sh -c "echo ${encodedCode} | base64 -d > ${className}.java && javac ${className}.java && java ${className} && rm -f ${className}.java ${className}.class"`;
  }

  else {
    return res.status(400).send("Unsupported language");
  }

  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    if (error) return res.send(stderr || error.message);
    res.send(stdout);
  });
});

app.listen(5000, () => console.log("Code runner API running on port 5000"));

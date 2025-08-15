const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/run", (req, res) => {
  console.log("Received request:", req.body);
  const { code, language, input } = req.body;

  let dockerCmd = [];
  const absPath = process.cwd();
  const encodedCode = Buffer.from(code).toString("base64");

  if (language === "javascript") {
    dockerCmd = [
      "run", "--rm", "-i",
      "-v", `${absPath}:/app`,
      "-w", "/app",
      "node:18",
      "sh", "-c",
      `echo ${encodedCode} | base64 -d > script.js && node script.js && rm -f script.js`
    ];
  }

  else if (language === "python") {
    dockerCmd = [
      "run", "--rm", "-i",
      "-v", `${absPath}:/app`,
      "-w", "/app",
      "python",
      "sh", "-c",
      `echo ${encodedCode} | base64 -d > script.py && python script.py && rm -f script.py`
    ];
  }

  else if (language === "java") {
    let className;
    const publicClassMatch = code.match(/public\\s+class\\s+([A-Za-z_]\\w*)/);
    if (publicClassMatch) {
      className = publicClassMatch[1];
    } else {
      const anyClassMatch = code.match(/class\\s+([A-Za-z_]\\w*)/);
      if (anyClassMatch) {
        className = anyClassMatch[1];
      } else {
        return res.status(400).send("Java code must contain a class.");
      }
    }

    dockerCmd = [
      "run", "--rm", "-i",
      "-v", `${absPath}:/app`,
      "-w", "/app",
      "openjdk",
      "sh", "-c",
      `echo ${encodedCode} | base64 -d > ${className}.java && javac ${className}.java && java ${className} && rm -f ${className}.java ${className}.class`
    ];
  }

  else if (language === "c++") {
    dockerCmd = [
      "run", "--rm", "-i",
      "-v", `${absPath}:/app`,
      "-w", "/app",
      "gcc",
      "sh", "-c",
      `echo ${encodedCode} | base64 -d > main.cpp && g++ main.cpp -o main && ./main && rm -f main.cpp main`
    ];
  }

  else {
    return res.status(400).send("Unsupported language");
  }

  // Spawn Docker so we can pass stdin
  const child = spawn("docker", dockerCmd);

  let stdoutData = "";
  let stderrData = "";

  child.stdout.on("data", (data) => {
    stdoutData += data.toString();
  });

  child.stderr.on("data", (data) => {
    stderrData += data.toString();
  });

  if (input) {
    child.stdin.write(input);
  }
  child.stdin.end();

  child.on("close", (code) => {
    if (code !== 0) {
      return res.status(400).send(stderrData || "Error running code");
    }
    res.send(stdoutData);
  });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Code runner API running on port ${PORT}`));

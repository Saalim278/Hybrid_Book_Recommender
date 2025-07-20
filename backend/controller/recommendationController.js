import { spawn } from "child_process";

// export const recommed = (req, res) => {
//   const isbn = req.params.isbn;
//   const python = spawn("python", ["recommend.py", isbn]);

//   let data = "";
//   python.stdout.on("data", (chunk) => {
//     data += chunk.toString();
//   });

//   python.stderr.on("data", (err) => {
//     console.error("Python error:", err.toString());
//   });

//   python.on("close", (code) => {
//     if (code !== 0) {
//       return res.status(500).json({ error: "Python script failed" });
//     }
//     try {
//       const result = JSON.parse(data);
//       res.json(result);
//     } catch (err) {
//       res.status(500).json({ error: "Failed to parse JSON from Python" });
//     }
//   });
// };


export const recommed = (req, res) => {
  const isbn = req.params.isbn?.trim();
  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required" });
  }

  const python = spawn("python", ["recommend.py", isbn]);

  let data = "";
  let errorOutput = "";

  python.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on("data", (err) => {
    errorOutput += err.toString();
    console.error("Python stderr:", err.toString()); // Log full stderr
  });

  python.on("close", (code) => {
    if (code !== 0) {
      try {
        const jsonError = JSON.parse(data);
        return res.status(400).json(jsonError);
      } catch (parseErr) {
        return res.status(500).json({
          error: "Python script failed",
          stderr: errorOutput,
          rawOutput: data,
        });
      }
    }

    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: "Failed to parse JSON from Python",
        rawOutput: data,
      });
    }
  });

  python.on("error", (err) => {
    console.error("Failed to start Python process:", err);
    res.status(500).json({ error: "Failed to start Python process" });
  });
};


export const recommendByAuthor = (req, res) => {
  const author = req.params.author?.trim();
  if (!author) {
    return res.status(400).json({ error: "Author is required" });
  }

  const python = spawn("python", ["recommend_by_author.py", author]);

  let data = "";
  let errorOutput = "";

  python.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on("data", (err) => {
    errorOutput += err.toString();
    console.error("Python stderr:", err.toString());
  });

  python.on("close", (code) => {
    if (code !== 0) {
      try {
        const jsonError = JSON.parse(data);
        return res.status(400).json(jsonError);
      } catch (parseErr) {
        return res.status(500).json({
          error: "Python script failed",
          stderr: errorOutput,
          rawOutput: data,
        });
      }
    }

    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: "Failed to parse JSON from Python",
        rawOutput: data,
      });
    }
  });

  python.on("error", (err) => {
    console.error("Failed to start Python process:", err);
    res.status(500).json({ error: "Failed to start Python process" });
  });
};

export const recommendByTitle = (req, res) => {
  const title = req.params.title?.trim();
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const python = spawn("python", ["recommend_by_title.py", title]);

  let data = "";
  let errorOutput = "";

  python.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on("data", (err) => {
    errorOutput += err.toString();
    console.error("Python stderr:", err.toString());
  });

  python.on("close", (code) => {
    if (code !== 0) {
      try {
        const jsonError = JSON.parse(data);
        return res.status(400).json(jsonError);
      } catch (parseErr) {
        return res.status(500).json({
          error: "Python script failed",
          stderr: errorOutput,
          rawOutput: data,
        });
      }
    }

    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: "Failed to parse JSON from Python",
        rawOutput: data,
      });
    }
  });

  python.on("error", (err) => {
    console.error("Failed to start Python process:", err);
    res.status(500).json({ error: "Failed to start Python process" });
  });
};
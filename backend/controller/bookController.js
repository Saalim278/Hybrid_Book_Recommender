import { exec } from "child_process";

export const getRecommendation = (req, res) => {
  const isbn = req.params.isbn;

  exec(`python recommend.py ${isbn}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: stderr || error.message });
    }

    const lines = stdout.trim().split("\n");
    const results = lines
      .map((line) => {
        try {
          return JSON.parse(line.replace(/'/g, '"'));
        } catch {
          return null;
        }
      })
      .filter((book) => book);

    res.json(results);
  });
};

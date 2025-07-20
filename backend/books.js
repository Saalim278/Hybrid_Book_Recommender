const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

// GET test route
router.get("/", (req, res) => {
  res.send("Books API route working!");
});

const bookList = [
  {
    isbn: "0399135782",
    title: "The Kitchen House Wife",
    author: "Amy Tan",
  },
];


// GET recommendation by ISBN
router.get("/recommend/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  exec(`python recommend.py ${isbn}`, (error, stdout, stderr) => {
    if (error) {
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
});

module.exports = { bookList, router };

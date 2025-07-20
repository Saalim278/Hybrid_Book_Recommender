import cors from "cors";
import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import fs from "fs";
import csv from "csv-parser";
import authMiddleware from "./middleware.js";
import mongoose from "mongoose";
import { vars } from "./AppProperties.js";


// import bookList  from "./books";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recommend", recommendRoutes);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/order", authMiddleware, orderRoutes);
app.use("/address", authMiddleware, addressRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port 5000`);
// });

mongoose
  .connect(vars.DATABASE)
  .then(() => {
    app.listen(vars.PORT, () =>
      console.log(`✅ Server running on http://localhost:${vars.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

let bookList = [];

fs.createReadStream("books.csv")
  .pipe(csv())
  .on("data", (row) => {
    bookList.push({
      isbn: row["ISBN"],
      title: row["Book-Title"],
      author: row["Book-Author"],
      coverImage: row["Image-URL-L"],
    });
  })
  .on("end", () => {
    console.log("Books dataset loaded!");

    app.get("/recommendations", (req, res) => {
      res.json(bookList.slice(0, 20));
    });

    app.get("/search/isbn/:isbn", (req, res) => {
      const isbn = req.params.isbn;
      const book = bookList.find((b) => b.isbn === isbn);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      const recommendations = bookList
        .filter((b) => b.author === book.author && b.isbn !== book.isbn)
        .slice(0, 5)
        .map((b) => ({
          isbn: b.isbn,
          title: b.title,
          author: b.author,
          coverImage: b.coverImage,
        }));

      res.json(recommendations);
    });

    
    app.get("/search/author/:author", (req, res) => {
      const author = req.params.author.toLowerCase();

      const results = bookList.filter((b) =>
        b.author.toLowerCase().includes(author)
      );

      if (results.length === 0) {
        return res.status(404).json({ error: "No books found for this author" });
      }

      res.json(
        results.map((b) => ({
          isbn: b.isbn,
          title: b.title,
          author: b.author,
          coverImage: b.coverImage,
        }))
      );
    });

    app.get("/search/title/:title", (req, res) => {
      const title = req.params.title.toLowerCase();

      const results = bookList.filter((b) =>
        b.title.toLowerCase().includes(title)
      );

      if (results.length === 0) {
        return res.status(404).json({ error: "No books found with this title" });
      }

      res.json(
        results.map((b) => ({
          isbn: b.isbn,
          title: b.title,
          author: b.author,
          coverImage: b.coverImage,
        }))
      );
    });
  })
  .on("error", (err) => {
    console.error("Error reading CSV:", err);
  });

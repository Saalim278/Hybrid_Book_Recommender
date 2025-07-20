import React, { useState } from "react";

const BookRecommender = () => {
  const [isbn, setIsbn] = useState("");
  const [books, setBooks] = useState([]);

  const getRecommendations = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books/recommend/${isbn}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Book Recommendation</h2>
      <input
        type="text"
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <button
        onClick={getRecommendations}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Get Recommendations
      </button>

      <div className="mt-4">
        {books.length > 0 ? (
          <ul className="list-disc pl-5">
            {books.map((book, index) => (
              <li key={index} className="mb-2">
                <strong>{book["Book-Title"]}</strong> by {book["Book-Author"]} ({book["Year-Of-Publication"]})
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookRecommender;

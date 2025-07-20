import React, { useState } from "react";
import axios from "axios";

const Recommendation = () => {
  const [isbn, setIsbn] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/books/recommend/${isbn}`
      );
      setRecommendations(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendations([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Book Recommendation</h1>
      <input
        className="border p-2 mr-2"
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="Enter ISBN"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={fetchRecommendations}
      >
        Get Recommendations
      </button>

      <div className="mt-4">
        {recommendations.length > 0 ? (
          <>
            {recommendations.map((data) => (
              <ul className="list-disc pl-5">
                {data.map((book, index) => (
                  <li key={index}>{book.title}</li>
                ))}
              </ul>
            ))}
          </>
        ) : (
          <p className="text-gray-500">No recommendations to show</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;

import React, { useContext, useState } from "react";
import { BookSto } from "../Context";
import BookCard from "../components/BookCard";
import axios from "axios";

export default function Search() {
  const { loca } = useContext(BookSto);
  const [result, setResult] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isbn, setIsbn] = useState();
  const [type, setType] = useState("ISBN");

  const getRecommendations = (isbn) => {
    let url;
    if (type === "ISBN") {
      url = `${loca}/api/recommend/${isbn}`
    }
    else if (type === "Title") {
      url = `${loca}/api/recommend/title/${isbn}`
    } else {
      url = `${loca}/api/recommend/author${isbn}`
    }
    axios
      .get(url)
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (  ) => {

    let url;
    if (type === "ISBN") {
      url = `${loca}/search/isbn/${isbn}`
    }
    else if (type === "Title") {
      url = `${loca}/search/title/${isbn}`
    } else {
      url = `${loca}/search/author/${isbn}`
    }
    axios
      // .get(`${loca}/api/recommend/${isbn}`)
      .get(url)
      .then((res) => {
        setResult(res.data);
        setRecommendations([]);
        getRecommendations(isbn);
      })
      .catch((err) => {
        setRecommendations([]);
        getRecommendations(isbn);
        console.log(err);
      });
  };
  return (
    <div
      className="container mt-5"
      style={{
        minHeight: "80vh",
      }}
    >
      <h2>Search Book by ISBN</h2>
      <div className="input-group my-3">
        <select
          class="form-select"
          style={{
            maxWidth: "100px",
          }}
          onChange={(e) => {
            console.log(e.target.value);
            
            setType(e.target.value)
          }}
        >
          <option selected>ISBN</option>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
        </select>
        <input
          className="form-control"
          placeholder={`Enter ${type}`}
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => handleSearch("author")}
        >
          Search
        </button>
      </div>
      <div className="container">
        <h2 className="text-center mb-5">📚 Books Results</h2>
        {result.length > 0 ? (
          <div className="row">
            {result.map((book) => (
              <BookCard book={book} />
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <p>Please search book to get recommendations</p>
          </div>
        )}
      </div>
      {recommendations.length > 0 && (
        <div className="container">
          <h2 className="text-center mb-3">📚 Books Recommendations by AI</h2>
          <div className="row">
            {recommendations.map((book) => (
              <BookCard book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

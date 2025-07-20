import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BookSto } from "../Context";
import BookCard from "../components/BookCard";

export default function Homepage() {
  const { loca } = useContext(BookSto);
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    axios.get(`${loca}/recommendations`).then((res) => {
      console.log(res.data);

      setBooks(res.data);
    });
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-2">📚 Top Recommended Books</h2>
      <div className="row">
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}

// const BookCard = ({ book }) => (
//   <div className="book-card">
//     <img src={book.coverImage} alt={book.title} />
//     <h3>{book.title}</h3>
//     <p>{book.author}</p>
//   </div>
// );

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../Style/Homepage.css";

// export default function Homepage() {
//   const [query, setQuery] = useState("");
//   const [books, setBooks] = useState([]);
//   const [userId, setUserId] = useState("2");

//   const handleSearch = () => {
//     axios
//       .get(`http://localhost:5000/search?query=${query}`)
//       .then((res) => {
//         setBooks(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching books:", err);
//       });
//   };

//   const getRecommendations = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/recommendations?user_id=${userId}`
//       );
//       setBooks(res.data);
//     } catch (err) {
//       console.error("Error fetching recommendations:", err);
//     }
//   };

//   useEffect(() => {
//     getRecommendations();
//   }, []);

//   const rateBook = async (bookId, rating) => {
//     try {
//       await axios.post(`http://localhost:5000/rate`, {
//         user_id: userId,
//         book_id: bookId,
//         rating: rating,
//       });
//       alert("Rating submitted!");
//     } catch (err) {
//       console.error("Error rating book:", err);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>📚 Book Recommender</h1>
//       <input
//         type="text"
//         placeholder="Search books..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <h2>Recommended for You</h2>
//       <div className="book-list">
//         {books.map((book) => (
//           <div className="book-card" key={book.id}>
//             <img src={book.coverImage} alt={book.title} />
//             <h3>{book.title}</h3>
//             <p>By {book.author}</p>
//             <div>
//               <select
//                 onChange={(e) => rateBook(book.id, e.target.value)}
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Rate this book
//                 </option>
//                 {[1, 2, 3, 4, 5].map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

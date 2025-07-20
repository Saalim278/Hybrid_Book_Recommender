import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('path_to_your_books.json_or_API')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(input) ||
      book.author.toLowerCase().includes(input)
    );
    setSuggestions(filtered.slice(0, 5)); // show top 5 matches
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or author"
        value={query}
        onChange={handleChange}
      />
      <ul>
        {suggestions.map(book => (
          <li key={book.isbn} onClick={() => onSelect(book.isbn)}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;

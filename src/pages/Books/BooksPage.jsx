import "./BooksPage.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://example-data.draftbit.com/books";

function BooksPage() {
  const [visibleCount, setVisibleCount] = useState(20);
  const [books, setBooks] = useState(null);
  const [nextClicked, setNextClicked] = useState(false);

  const handleNext = () => {
    setVisibleCount((prevCount) => prevCount + 20);
    setNextClicked(true);
  };

  const handlePrevious = () => {
    setVisibleCount((prevCount) => prevCount - 20);
  };

  async function fetchAllBooks() {
    try {
      const response = await axios.get(`${API_URL}`);
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllBooks();
  }, []);

  if (!books) {
    return <p>Loading...</p>;
  }

  const startIndex = visibleCount - 20;
  const visibleBooks = books.slice(startIndex, visibleCount);

  return (
    <>
      <div className="book-container">
        {visibleBooks.map((book, i) => (
          <div key={i} className="book-item">
            <Link to={"/books/" + book.id} className="book-link">
              <img
                src={book.image_url}
                className="book-image"
                alt={"image of " + book.title}
              />
              <h2 className="bookTitle">{book.title}</h2>
            </Link>
            <h3 className="bookAuthor">
              <em>By {book.authors}</em>
            </h3>
          </div>
        ))}
      </div>

      <div className="btnContainer">
        {nextClicked && (
          <button className="previousBtn" onClick={handlePrevious}>
            Previous
          </button>
        )}
        {books.length > visibleCount && (
          <button className="nextBtn" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default BooksPage;

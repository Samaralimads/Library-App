import "./BooksPage.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = "https://example-data.draftbit.com/books";

function BooksPage() {
  const [visibleCount, setVisibleCount] = useState(20);
  const [books, setBooks] = useState(null);
  const [nextClicked, setNextClicked] = useState(false);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const handleNext = () => {
    setVisibleCount((prevCount) => prevCount + 20);
    setNextClicked(true);
  };

  const handlePrevious = () => {
    setVisibleCount((prevCount) => prevCount - 20);
  };

  async function fetchBooks() {
    try {
      const response = await axios.get(`${API_URL}`);
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  if (!books) {
    return <p>Loading...</p>;
  }

  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title &&
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  if (filteredBooks.length === 0) {
    return (
      <div className="noBooksContainer">
        <h1>Sorry, we coudn't find the book you were looking for. </h1>
        <p>
          Make sure there are no typos and that you are searching by book title.
        </p>
        <img
          src="File searching-pana.png"
          alt="Book Not Found"
          className="notFoundImage"
        />
      </div>
    );
  }

  const startIndex = visibleCount - 20;
  const visibleBooks = filteredBooks.slice(startIndex, visibleCount);

  return (
    <>
      <div className="book-container">
        {visibleBooks.map((book, i) => (
          <div key={i} className="book-item">
            <Link to={"/books/" + book.id} className="book-link">
              <div className="img-wrapper">
                <img
                  src={book.image_url}
                  className="book-image"
                  alt={"image of " + book.title}
                />
              </div>
            </Link>
            <div className="content">
              <h2 className="bookTitle">{book.title}</h2>
              <h3 className="bookAuthor">
                <em>By {book.authors}</em>
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="btnContainer">
        {nextClicked && (
          <button className="previousBtn" onClick={handlePrevious}>
            Previous
          </button>
        )}
        {filteredBooks.length > visibleCount && (
          <button className="nextBtn" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default BooksPage;

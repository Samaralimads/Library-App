import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyBooks.css";

const API_URL = "https://example-data.draftbit.com/books";

function MyBooksPage() {
  const [myBooks, setMyBooks] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");

  const getBookDetails = async (bookId) => {
    if (!bookId) {
      return null;
    }

    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchBooksData = async () => {
      const storedBooks = Object.keys(localStorage)
        .filter((key) =>
          ["wantToRead", "read", "currentlyReading"].includes(key)
        )
        .map((key) => {
          const category = key;
          const booksInCategory = JSON.parse(localStorage.getItem(key));
          return booksInCategory.map((book) => ({ category, ...book }));
        })
        .flat();

      const bookDetailsPromises = storedBooks.map(async (book) => {
        const bookDetails = await getBookDetails(book.id);
        return {
          bookId: book.id,
          categories: [book.category],
          bookDetails,
        };
      });

      const booksData = await Promise.all(bookDetailsPromises);

      const filteredBooks =
        filterCategory === "all"
          ? booksData.filter((book) =>
              book.categories.some((category) =>
                ["wantToRead", "read", "currentlyReading"].includes(category)
              )
            )
          : booksData.filter((book) =>
              book.categories.includes(filterCategory)
            );

      setMyBooks(filteredBooks);
    };

    fetchBooksData();
  }, [filterCategory]);

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  return (
    <div className="pageContainer">
      <div className="sidebar">
        <button onClick={() => handleFilter("all")}>All</button>
        <button onClick={() => handleFilter("read")}>Read</button>
        <button onClick={() => handleFilter("wantToRead")}>Want to Read</button>
        <button onClick={() => handleFilter("currentlyReading")}>
          Currently Reading
        </button>
      </div>
      <div className="mainContent">
        <h2>My Books</h2>
        <div className="book-container">
          {myBooks.map((book) => (
            <div key={book.bookId} className="book-item">
              <Link to={`/books/${book.bookId}`} className="book-link">
                <div className="img-wrapper">
                  <img
                    src={book.bookDetails.image_url}
                    alt="bookImage"
                    className="book-img"
                  />
                </div>
                <div className="content">
                  <h2 className="book-title">{book.bookDetails.title}</h2>
                  <p>Authors: {book.bookDetails.authors}</p>
                  <p>Categories: {book.categories.join(", ")}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBooksPage;

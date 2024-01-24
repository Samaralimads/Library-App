// MyBooksPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyBooks.css";

const API_URL = "https://example-data.draftbit.com/books";

function MyBooksPage() {
  const [myBooks, setMyBooks] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");

  const getBookDetails = async (bookId) => {
    if (!bookId) {
      console.error("Book ID is undefined");
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
      const storedBookCategories = Object.keys(localStorage)
        .filter((key) => key.startsWith("bookCategories_"))
        .map((key) => {
          const bookId = key.replace("bookCategories_", "");
          const categories = JSON.parse(localStorage.getItem(key));
          return { categories, bookId };
        });

      const bookDetailsPromises = storedBookCategories.map(async (data) => {
        const { bookId, categories } = data;
        const bookDetails = await getBookDetails(bookId);
        return {
          bookId,
          categories,
          bookDetails,
        };
      });

      const booksData = await Promise.all(bookDetailsPromises);

      const filteredBooks =
        filterCategory === "all"
          ? booksData
          : booksData.filter((book) => book.categories[filterCategory]);

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
        <div>
          {myBooks.map((book) => (
            <div key={book.bookId} className="bookCard">
              <img
                src={book.bookDetails.image_url}
                alt="bookImage"
                className="bookImg"
              />
              <p>Title: {book.bookDetails.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBooksPage;

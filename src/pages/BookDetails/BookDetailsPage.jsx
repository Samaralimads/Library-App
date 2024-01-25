import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookDetailsPage.css";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";

const API_URL = "https://example-data.draftbit.com/books";

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const { id: bookId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCheckmark, setShowCheckmark] = useState(false);

  const fetchOneBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      setBook(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCategory = (category) => {
    const storedCategories =
      JSON.parse(localStorage.getItem(`bookCategories_${book.id}`)) || {};
    const currentCategoryState = storedCategories[category];

    const updatedCategories = {
      ...storedCategories,
      [category]: !currentCategoryState,
    };

    localStorage.setItem(
      `bookCategories_${book.id}`,
      JSON.stringify(updatedCategories)
    );

    setSelectedCategory(category);
    setShowCheckmark(!currentCategoryState);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOneBook();

      if (book && book.id) {
        const storedCategories =
          JSON.parse(localStorage.getItem(`bookCategories_${book.id}`)) || {};
        const initialCategory = Object.keys(storedCategories)[0] || "";
        setSelectedCategory(initialCategory);
        setShowCheckmark(storedCategories[initialCategory] || false);
      }
    };

    fetchData();
  }, [bookId]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bookContainer">
      {book && (
        <>
          <div className="leftColumn">
            <img src={book.image_url} alt="bookImage" className="bookImg" />
            <div className="bookDetails">
              <h1>{book.title}</h1>
              <h2>by {book.authors}</h2>
            </div>
          </div>
          <div className="rightColumn">
            <div className="bookDescription">
              <h3>Description:</h3>
              {book.description}
            </div>
            <div className="ratingContainer">
              <p>Avg. Rating: {book.rating}</p>
              <StarRating />
            </div>
            <div className="buttons">
              <button
                onClick={() => handleAddToCategory("wantToRead")}
                className={selectedCategory === "wantToRead" ? "selected" : ""}
              >
                {showCheckmark && selectedCategory === "wantToRead" ? "✓ " : ""}{" "}
                Want to read
              </button>
              <button
                onClick={() => handleAddToCategory("read")}
                className={selectedCategory === "read" ? "selected" : ""}
              >
                {showCheckmark && selectedCategory === "read" ? "✓ " : ""} Read
              </button>
              <button
                onClick={() => handleAddToCategory("currentlyReading")}
                className={
                  selectedCategory === "currentlyReading" ? "selected" : ""
                }
              >
                {showCheckmark && selectedCategory === "currentlyReading"
                  ? "✓ "
                  : ""}{" "}
                Currently Reading
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BookDetailsPage;

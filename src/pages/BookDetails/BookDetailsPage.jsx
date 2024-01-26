import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookDetailsPage.css";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";

const API_URL = "https://example-data.draftbit.com/books";

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const { id: bookId } = useParams();
  const [rerender, setRerender] = useState(false);
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
    console.log("here");
    const currentStorage = JSON.parse(localStorage.getItem(category)) || [];
    currentStorage.push(book);
    localStorage.setItem(category, JSON.stringify(currentStorage));
    setRerender(!rerender);
  };

  const handleRemoveFromCategory = (category) => {
    let currentStorage = JSON.parse(localStorage.getItem(category)) || [];
    currentStorage = currentStorage.filter(
      (storedBook) => storedBook.id !== Number(bookId)
    );
    localStorage.setItem(category, JSON.stringify(currentStorage));
    setRerender(!rerender);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOneBook();
    };

    fetchData();
  }, [bookId]);

  if (!book) {
    return <p>Loading...</p>;
  }

  const wantToRead =
    book &&
    localStorage.getItem("wantToRead") &&
    JSON.parse(localStorage.getItem("wantToRead")).some(
      (item) => item.id === Number(bookId)
    );

  const read =
    book &&
    localStorage.getItem("read") &&
    JSON.parse(localStorage.getItem("read")).some(
      (item) => item.id === Number(bookId)
    );

  const currentlyReading =
    book &&
    localStorage.getItem("currentlyReading") &&
    JSON.parse(localStorage.getItem("currentlyReading")).some(
      (item) => item.id === Number(bookId)
    );

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
              <StarRating
                bookId={bookId}
                onRatingChange={() => setRerender(!rerender)}
              />
            </div>
            <div className="buttons">
              <button
                onClick={() =>
                  wantToRead
                    ? handleRemoveFromCategory("wantToRead")
                    : handleAddToCategory("wantToRead")
                }
                className={selectedCategory === "wantToRead" ? "selected" : ""}
              >
                {wantToRead && "✓ "} Want to read
              </button>
              <button
                onClick={() =>
                  read
                    ? handleRemoveFromCategory("read")
                    : handleAddToCategory("read")
                }
                className={selectedCategory === "read" ? "selected" : ""}
              >
                {read && "✓ "} Read
              </button>
              <button
                onClick={() =>
                  currentlyReading
                    ? handleRemoveFromCategory("currentlyReading")
                    : handleAddToCategory("currentlyReading")
                }
                className={
                  selectedCategory === "currentlyReading" ? "selected" : ""
                }
              >
                {currentlyReading && "✓ "} Currently Reading
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BookDetailsPage;

import React, { useState, useEffect } from "react";
import "./BookDetailsPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_URL = "https://example-data.draftbit.com/books";

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const { id: bookId } = useParams();

  async function fetchOneBook() {
    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      console.log(response);
      setBook(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOneBook();
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
              <div className="buttons">
                <button>Want to read</button>
                <button>Read</button>
              </div>
            </div>
          </div>
          <div className="rightColumn">
            <div className="bookDescription">
              <h3>Description:</h3>
              {book.description}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BookDetailsPage;

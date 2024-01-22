import "./BooksPage.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "https://example-data.draftbit.com/books";

function BooksPage() {
  const [books, setBooks] = useState(null);

  async function fetchAllBooks() {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log(response);
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

  return (
    <>
      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {books &&
          books.map((book, i) => {
            return (
              <div key={i}>
                <Link to={"/books/" + book.id}>
                  <div
                    className="card m-2 p-2 text-center"
                    style={{ width: "24rem", height: "18rem" }}
                  >
                    <div className="card-body">
                      <img
                        src={book.image_url}
                        style={{ height: "6rem" }}
                        alt={"image of" + book.title}
                      />
                      <h5 className="card-title text-truncate mt-2">
                        {book.title}
                      </h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        <em>By {book.authors}</em>
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default BooksPage;

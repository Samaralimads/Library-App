import React, { useState, useEffect } from "react";
import "./StarRating.css";

const StarRating = ({ bookId, onRatingChange }) => {
  const [rating, setRating] = useState(() => {
    const storedRatings = JSON.parse(localStorage.getItem("bookRatings")) || {};
    return storedRatings[bookId] || 1;
  });

  useEffect(() => {
    onRatingChange(rating);
  }, [rating, onRatingChange]);

  const handleRatingChange = (value) => {
    const storedRatings = JSON.parse(localStorage.getItem("bookRatings")) || {};
    storedRatings[bookId] = value;
    localStorage.setItem("bookRatings", JSON.stringify(storedRatings));
    setRating(value);
  };

  return (
    <div className="rating">
      {[5, 4, 3, 2, 1].map((value) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            id={`star${value}_${bookId}`}
            name={`rate_${bookId}`}
            value={value}
            checked={rating === value}
            onChange={() => handleRatingChange(value)}
          />
          <label
            htmlFor={`star${value}_${bookId}`}
            title={`Rating: ${value}`}
          ></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StarRating;

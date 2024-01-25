import React, { useState } from "react";
import "./StarRating.css";

const StarRating = () => {
  const [rating, setRating] = useState(1);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="rating">
      {[5, 4, 3, 2, 1].map((value) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            id={`star${value}`}
            name="rate"
            value={value}
            checked={rating === value}
            onChange={() => handleRatingChange(value)}
          />
          <label htmlFor={`star${value}`} title={`Rating: ${value}`}></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StarRating;

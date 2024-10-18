import React, { useState } from 'react';

// Inline SVG for the star
const starSvg = (filled) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 30 30"
    fill={filled ? "#ffc107" : "#e4e5e9"}  // Fill color based on hover or rating
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 1.629 8.111L12 18.896l-7.565 4.228L6.064 15.01 0 9.303l8.332-1.148z" />
  </svg>
);

const Rating = ({ onRate }) => {
  const [rating, setRating] = useState(5);  // Actual rating value
  const [hover, setHover] = useState(null); // Hover state for stars

  return (
    <div className="star-rating d-flex justify-content-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <span
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setRating(ratingValue);  // Update the rating value
              onRate(ratingValue);     // Pass rating to parent component
            }}
            onMouseEnter={() => setHover(ratingValue)}  // Set hover state when mouse enters a star
            onMouseLeave={() => setHover(null)}         // Reset hover state when mouse leaves
          >
            {starSvg(ratingValue <= (hover || rating))}  {/* Render filled or empty star */}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;

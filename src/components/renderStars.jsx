import React from 'react';
import './renderStars.css'

// Function to render stars based on the rating
export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <i key={index} className="starStyle bi bi-star-fill text-warning"></i>
      ))}
      {/* Half star */}
      {halfStar ? <i className="starStyle bi bi-star-half text-warning"></i> : null}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={index} className="starStyle bi bi-star text-warning"></i>
      ))}
    </>
  );
};

import React from 'react';
// import {FaStar} from "react-icons/fa";


const starSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 30 30"
      fill="currentColor"
    >
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 1.629 8.111L12 18.896l-7.565 4.228L6.064 15.01 0 9.303l8.332-1.148z" />
    </svg>
  );

  export default function StarRate() {

    return (
      <>
        {[...Array(5)].map((star, index) => {
          return (
            <>

            <span key={index}>
                {starSvg}
            </span>

            </>
          );
        })}
      </>
    );
  }


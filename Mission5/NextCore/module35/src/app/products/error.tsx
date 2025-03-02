"use client";

import React from "react";

const ErrorPage = ({ error, reset }) => {
  return (
    <div>
      {error ? (
        <div>
          <h1>Error: {error.message}</h1>
          <button className="p-1 bg-black text-white font-bold" onClick={reset}>
            Reset
          </button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ErrorPage;

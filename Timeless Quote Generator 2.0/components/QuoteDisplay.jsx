import React, { useState } from "react";
import QuoteButton from "./QuoteButton";

const QuoteDisplay = ({ quoteData, onLike, onGenerate, showQuote }) => {
  const [showAlert, setShowAlert] = useState(false);

  if (!quoteData) return null;
  const { image, quote, author, history } = quoteData;

  const handleLike = () => {
    onLike(quoteData);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="container">
      <QuoteButton onClick={onGenerate} />

      {showAlert && (
        <div className="alert-container">
          <div className="alert alert-success" role="alert">
            Quote saved successfully!
          </div>
        </div>
      )}

      <div id="quote-image">
        <img src={image} alt={author} className={showQuote ? "animated" : ""} />
      </div>

      {showQuote && (
        <div id="quote-container">
          <p className="custom-bold">
            "{quote}"
          </p>
          <p>- {author}</p>
          <p dangerouslySetInnerHTML={{ __html: history }}></p>
          <button onClick={handleLike} className="like-button">
            🖤
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;

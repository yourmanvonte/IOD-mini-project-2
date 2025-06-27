import React from 'react';
import QuoteButton from './QuoteButton';

const QuoteDisplay = ({ quoteData, onLike, onGenerate, showQuote }) => {
  if (!quoteData) return null;

  const { image, quote, author, history } = quoteData;

  return (
     <div className="container">
      <QuoteButton onClick={onGenerate} />

      <div id="quote-image">
        <img src={image} alt={author} className={showQuote ? 'animated' : ''} />
      </div>

      {showQuote && (
        <div id="quote-container">
          <p><strong>"{quote}"</strong></p>
          <p>- {author}</p>
          <p dangerouslySetInnerHTML={{ __html: history }}></p>

          <button className="like-button" onClick={() => {
            onLike(quoteData);
          }}>
            🖤
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SavedQuotes = () => {
    const [savedQuotes, setSavedQuotes] = useState([]);

    useEffect(() => {
        const quotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
        setSavedQuotes(quotes);
    }, []);

    const removeQuote = () => {
      const updatedQuotes = savedQuotes.filter((_, idx) => idx !== indexToRemove);
      localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
      setSavedQuotes(updatedQuotes);
    }

    return (
    <div className="page-container">
      <header>
        <h1>Saved Quotes</h1>
        <Link to="/" className="back-link">Back to Generator</Link>
      </header>
      <main>
        {savedQuotes.length === 0 ? (
          <p>No saved quotes yet.</p>
        ) : (
          savedQuotes.map((item, idx) => (
            <div key={idx} className="saved-quote">
              <p>"{item.quote}"</p>
              <p><strong>{item.author}</strong></p>
              <button onClick={() => removeQuote(idx)} className="remove-button">🗑️</button>
              <hr />
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default SavedQuotes;
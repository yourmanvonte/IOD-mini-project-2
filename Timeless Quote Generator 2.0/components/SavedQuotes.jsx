import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SavedQuotes = ({ user }) => {
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const quotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    setSavedQuotes(quotes);
  }, []);

  const removeQuote = (indexToRemove) => {
    const updatedQuotes = savedQuotes.filter((_, idx) => idx !== indexToRemove);
    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
    setSavedQuotes(updatedQuotes);

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  if (!user) {
    return (
      <div className="page-container">
        <p>Please <Link to="/login">log in</Link> to view saved quotes.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header>
        <h1>Saved Quotes</h1>
        <Link to="/" className="back-link">Back to Generator</Link>
      </header>

      {showAlert && (
        <div className="alert-container">
          <div className="alert alert-success" role="alert">
            Quote removed from saved quotes.
          </div>
        </div>
      )}

      <main>
        {savedQuotes.length === 0 ? (
          <p>No saved quotes yet.</p>
        ) : (
          savedQuotes.map((item, idx) => (
            <div key={idx} className="saved-quote">
              <p>"{item.quote}"</p>
              <p><strong>{item.author}</strong></p>
              <button onClick={() => removeQuote(idx)} className="remove-button btn btn-danger btn-sm">
                🗑️
              </button>
              <hr />
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default SavedQuotes;

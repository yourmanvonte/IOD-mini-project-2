import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import SavedQuotes from "../components/SavedQuotes";
import "./App.css";
import Intro from "../components/Intro";
import QuoteDisplay from "../components/QuoteDisplay";
import quotesData from "./data/quotes.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const getRandomQuote = () => {
  const randomAuthor =
    quotesData[Math.floor(Math.random() * quotesData.length)];

  if (
    !randomAuthor ||
    !Array.isArray(randomAuthor.quotes) ||
    randomAuthor.quotes.length === 0
  ) {
    console.warn("Invalid quote data:", randomAuthor);
    return {
      author: "Unknown",
      image: "",
      history: ["<p>No historical info available.</p>"],
      quote: "No quote available.",
    };
  }

  const quoteArray = randomAuthor.quotes;
  const randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];

  return {
    author: randomAuthor.author,
    image: randomAuthor.image,
    history: randomAuthor.history[0],
    quote: randomQuote,
  };
};

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  const [currentQuote, setCurrentQuote] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const generateNewQuote = () => {
    setCurrentQuote(getRandomQuote());
    setShowQuote(true);
  };

  const saveQuote = (quote) => {
    const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    const isDuplicate = savedQuotes.some(
      (q) => q.quote === quote.quote && q.author === quote.author
    );

    if (isDuplicate) {
      console.log("Quote already saved.");
      return;
    }

    localStorage.setItem(
      "savedQuotes",
      JSON.stringify([...savedQuotes, quote])
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page-container">
            <header className="header">
              <div className="header-left" />
              <h1 className="title">Timeless Quote Generator</h1>
              <div className="user-info">
                {user ? (
                  <>
                    <Link to="/saved" className="saved-link">
                      Saved Quotes
                    </Link>
                    <span>Welcome, {user}</span>
                    <button onClick={handleLogout} className="logout-button btn btn-primary btn-md">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="login-link btn btn-primary btn-md" >
                    Login
                  </Link>
                )}
              </div>
            </header>
            <main>
              {!showQuote && <Intro />}
              {currentQuote && (
                <QuoteDisplay
                  quoteData={currentQuote}
                  onLike={saveQuote}
                  onGenerate={generateNewQuote}
                  showQuote={showQuote}
                />
              )}
            </main>
          </div>
        }
      />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route
        path="/saved"
        element={
          user ? (
            <SavedQuotes user={user} />
          ) : (
            <div className="page-container">
              <h2>
                Please <Link to="/login">log in</Link> to view saved quotes.
              </h2>
            </div>
          )
        }
      />
      <Route path="*" element={<p>Page Not Found</p>} />
    </Routes>
  );
};

export default App;

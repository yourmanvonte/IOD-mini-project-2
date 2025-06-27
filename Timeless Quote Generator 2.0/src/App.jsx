import { useState, useEffect } from 'react';
import './App.css';
import Intro from '../components/Intro'
import QuoteDisplay from '../components/QuoteDisplay';
import quotesData from './data/quotes.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const getRandomQuote = () => {
  const randomAuthor = quotesData[Math.floor(Math.random() * quotesData.length)];

  if (!randomAuthor || !Array.isArray(randomAuthor.quotes) || randomAuthor.quotes.length === 0) {
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
  const [currentQuote, setCurrentQuote] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  if (!currentQuote) return null;

  const generateNewQuote = () => {
    setCurrentQuote(getRandomQuote());
    setShowQuote(true);
  };

  const saveQuote = (quote) => {
    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    localStorage.setItem('savedQuotes', JSON.stringify([...savedQuotes, quote]));
  };

  return (
      <div className="page-container">
        <header>
          <h1>Timeless Quote Generator</h1>
          {!showQuote && <Intro />}
        </header>
        <main>
          <QuoteDisplay quoteData={currentQuote} onLike={saveQuote} onGenerate={generateNewQuote} showQuote={showQuote}/>
        </main>
      </div>
    )
};

export default App;
import { useState } from 'react';
import './App.css';
import Intro from '../components/Intro'
import QuoteDisplay from '../components/QuoteDisplay';
import quotesData from './data/quotes.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const getRandomQuote = () => {
  const randomAuthor = quotesData[Math.floor(Math.random() * quotesData.length)];
  const quoteArray = randomAuthor.quotes.quote;
  const randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];

  return {
    author: randomAuthor.author,
    image: randomAuthor.image,
    history: randomAuthor.history[0],
    quote: randomQuote,
  };
};

const App = () => {
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  const generateNewQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

const saveQuote = (quote) => {
  const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
  localStorage.setItem('savedQuotes', JSON.stringify([...savedQuotes, quote]));
};

  return (
      <div className="page-container">
        <header>
          <h1>Timeless Quote Generator</h1>
          <Intro />
        </header>
        <main>
          <QuoteDisplay quoteData={currentQuote} onLike={saveQuote} onGenerate={generateNewQuote} />
        </main>
      </div>
    )
};

export default App;
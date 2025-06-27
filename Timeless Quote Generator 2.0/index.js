let quotes = [];

const getRandomQuote = () => {
    const randomIndex = quotes[Math.floor(Math.random() * quotes.length)]; 
    const quoteList = randomIndex.quotes.quote;
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

    return {
        author: randomIndex.author,
        quote: quote,
        image: randomIndex.image,
        history: randomIndex.history[0],
    };
};

const displayQuote = () => {
    const random = getRandomQuote();
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const imageElement = document.getElementById("image");
    const historyElement = document.getElementById("history");

    quoteElement.textContent = `"${random.quote}"`;
    authorElement.textContent = `- ${random.author}`;
    historyElement.innerHTML = random.history;

    imageElement.classList.remove("animated");
    imageElement.style.opacity = 0; 
    imageElement.src = random.image; 
    imageElement.alt = `${random.author}'s portrait`;
    
    imageElement.onload = () => {
        void imageElement.offsetWidth;
        imageElement.classList.add("animated");
        imageElement.style.opacity = 1; 
    };
};

const fetchQuotes = async () => {
    try {
        const response = await fetch("quotes.json"); 
        quotes = await response.json(); 
        displayQuote();
    } catch(error) {
        console.error("Failed to fetch quotes:", error); 
    }
};

document.getElementById("generate-quote").addEventListener("click", () => { 
    if (quotes.length === 0) return; 
        displayQuote(); 

        const introSection = document.querySelector(".intro"); 
        if (introSection) {
            introSection.classList.add("fade-out"); 
            setTimeout(() => {
                introSection.style.display = "none"; 
            }, 500);
        }
        document.getElementById("quote-container").style.display = "block"; 
        
});

const saveQuote = () => {
    const quote = document.getElementById("quote").textContent;
    const author = document.getElementById("author").textContent;
    const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || []; 
    
    const exists = savedQuotes.some(item => item.quote === quote && item.author === author);
    if (exists) {
        alert("Quote already saved!");
        return;
    }

    savedQuotes.push({ quote, author }); 
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes)); 
    alert("Quote saved!"); 
};

document.getElementById("like-button").addEventListener("click", saveQuote); 
document.getElementById("like-button").textContent = "🖤";
document.getElementById("like-button").classList.add("like-button");

fetchQuotes();
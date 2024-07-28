// Array to store quotes
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
    // Check if there are quotes available
    if (quotes.length === 0) {
        console.log("No quotes available");
        return;
    }

    // Get a random quote index
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Get the random quote
    const randomQuote = quotes[randomIndex];

    // Display the random quote
    console.log(`Random Quote: ${randomQuote.text} - ${randomQuote.category}`);
}

// Function to add a new quote
function addQuote() {
    // Get the new quote text and category from the input fields
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // Create a new quote object
    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory,
    };

    // Add the new quote to the quotes array
    quotes.push(newQuote);

    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Display success message
    console.log("New quote added successfully!");

    // Display the updated quotes array
    console.log("Updated Quotes:", quotes);
}
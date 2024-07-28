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

    // Update the HTML to display the new quote
    const quoteContainer = document.getElementById("quoteContainer");
    quoteContainer.innerHTML += `<p>${newQuote.text} - ${newQuote.category}</p>`;
}

function createAddQuoteForm() {
    // Create the form element
    const form = document.createElement("form");

    // Create the input field for quote text
    const quoteTextInput = document.createElement("input");
    quoteTextInput.setAttribute("type", "text");
    quoteTextInput.setAttribute("id", "newQuoteText");
    quoteTextInput.setAttribute("placeholder", "Enter quote text");
    form.appendChild(quoteTextInput);

    // Create the input field for quote category
    const quoteCategoryInput = document.createElement("input");
    quoteCategoryInput.setAttribute("type", "text");
    quoteCategoryInput.setAttribute("id", "newQuoteCategory");
    quoteCategoryInput.setAttribute("placeholder", "Enter quote category");
    form.appendChild(quoteCategoryInput);

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "button");
    submitButton.textContent = "Add Quote";
    submitButton.addEventListener("click", addQuote);
    form.appendChild(submitButton);

    // Append the form to the document body
    document.body.appendChild(form);
}
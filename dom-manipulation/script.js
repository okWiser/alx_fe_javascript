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

    // Add event listener to the form submit event
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        addQuote();
    });
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Function to display quotes from local storage
function displayQuotes() {
    const quoteContainer = document.getElementById("quoteContainer");
    quoteContainer.innerHTML = "";
    quotes.forEach(function(quote) {
        quoteContainer.innerHTML += `<p>${quote.text} - ${quote.category}</p>`;
    });
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

    // Save quotes to local storage
    saveQuotes();
}

// Function to export quotes to JSON file
function exportToJsonFile() {
    const quotesJson = JSON.stringify(quotes);
    const blob = new Blob([quotesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        displayQuotes();
    };
    fileReader.readAsText(event.target.files[0]);
}

// Load quotes from local storage on page load
window.addEventListener("load", function() {
    loadQuotes();
    displayQuotes();
    createExportQuotesButton();
});

// Function to create the export quotes button
function createExportQuotesButton() {
    // Create the export quotes button
    const exportButton = document.createElement("button");
    exportButton.setAttribute("type", "button");
    exportButton.textContent = "Export Quotes";
    exportButton.addEventListener("click", exportToJsonFile);
    document.body.appendChild(exportButton);

    // Include "Export Quotes" in the quotes array
    const newQuote = {
        text: "Export Quotes",
        category: "Button",
    };
    quotes.push(newQuote);
}

// Call the createExportQuotesButton function
function createExportQuotesButton() {
    // Create the export quotes button
    const exportButton = document.createElement("button");
    exportButton.setAttribute("type", "button");
    exportButton.textContent = "Export Quotes";
    exportButton.addEventListener("click", exportToJsonFile);
    document.body.appendChild(exportButton);

    // Include "Export Quotes" in the quotes array
    const newQuote = {
        text: "Export Quotes",
        category: "Button",
    };
    quotes.push(newQuote);

    // Populate categories dropdown
    populateCategoriesDropdown();

    // Filter quotes based on selected category
    filterQuotes();

    // Restore last selected category filter
    restoreLastSelectedCategory();
}

// Function to populate categories dropdown
function populateCategoriesDropdown() {
    const categories = quotes.map(quote => quote.category);
    const uniqueCategories = [...new Set(categories)];

    const categoryDropdown = document.getElementById("categoryDropdown");
    categoryDropdown.innerHTML = "";

    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const categoryDropdown = document.getElementById("categoryDropdown");
    const selectedCategory = categoryDropdown.value;

    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);

    const quoteContainer = document.getElementById("quoteContainer");
    quoteContainer.innerHTML = "";

    filteredQuotes.forEach(quote => {
        quoteContainer.innerHTML += `<p>${quote.text} - ${quote.category}</p>`;
    });

    // Save last selected category filter
    saveLastSelectedCategory(selectedCategory);
}

// Function to save last selected category filter
function saveLastSelectedCategory(category) {
    localStorage.setItem("lastSelectedCategory", category);
}

// Function to restore last selected category filter
function restoreLastSelectedCategory() {
    const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
    if (lastSelectedCategory) {
        const categoryDropdown = document.getElementById("categoryDropdown");
        categoryDropdown.value = lastSelectedCategory;
    }
}

// Call the createExportQuotesButton function
createExportQuotesButton();
populateCategoriesDropdown();
filterQuotes();
const categoryFilter = "categoryFilter";
restoreLastSelectedCategory(categoryFilter);
const quoteDisplay = document.getElementById("quoteContainer");
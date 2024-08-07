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

// Step 1: Simulate Server Interaction
// Setup Server Simulation:
// Use JSONPlaceholder or a similar mock API to simulate fetching and posting data.
// Implement periodic data fetching to simulate receiving updates from a server.

// Simulate fetching data from the server
function fetchQuotesFromServer() {
    // Simulate an API call to fetch quotes from the server
    // Replace the URL with the actual API endpoint
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            // Update the local quotes array with the fetched data
            quotes = data;
            // Display the updated quotes
            displayQuotes();
        })
        .catch((error) => {
            console.log("Error fetching quotes from server:", error);
        });
}

// Simulate periodic data fetching from the server
setInterval(fetchQuotesFromServer, 5000); // Fetch quotes every 5 seconds

// Step 2: Implement Data Syncing
// Data Syncing Logic:
// Add functionality to periodically check for new quotes from the server and update the local storage accordingly.
// Implement a simple conflict resolution strategy where the server’s data takes precedence in case of discrepancies.

// Function to sync local quotes with the server
function syncQuotesWithServer() {
    // Simulate an API call to send the local quotes to the server
    // Replace the URL with the actual API endpoint
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(quotes),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Update the local quotes array with the response from the server
            quotes = data;
            // Display the updated quotes
            displayQuotes();
        })
        .catch((error) => {
            console.log("Error syncing quotes with server:", error);
        });
}

// Simulate periodic syncing of quotes with the server
setInterval(syncQuotesWithServer, 10000); // Sync quotes every 10 seconds

// Step 3: Handling Conflicts
// Conflict Resolution:
// Add a UI element or notification system to inform users when data has been updated or if conflicts were resolved.
// Provide an option for users to manually resolve conflicts if desired.

// Function to handle conflicts and update the local quotes array
function handleConflicts(updatedQuotes) {
    // Compare the local quotes array with the updated quotes from the server
    // and resolve any conflicts by updating the local quotes array accordingly
    quotes = updatedQuotes;
    // Display the updated quotes
    displayQuotes();
    // Show a notification or update the UI to inform the user about the conflict resolution
    console.log("Conflicts resolved. Quotes updated.");
}

// Step 4: Testing and Verification
// Ensure Comprehensive Testing:
// Test the sync and conflict resolution functionalities thoroughly to ensure they work as expected.
// Verify that changes are correctly merged, conflicts are handled appropriately, and no data is lost during the sync process.

// Testing and verification code goes here

// Function to fetch quotes from the server using async/await
async function fetchQuotesFromServer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        quotes = data;
        displayQuotes();
    } catch (error) {
        console.log("Error fetching quotes from server:", error);
    }
}

// Simulate periodic data fetching from the server
setInterval(fetchQuotesFromServer, 5000); // Fetch quotes every 5 seconds

// Function to sync quotes with the server using async/await
async function syncQuotesWithServer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(quotes),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await response.json();
        quotes = data;
        displayQuotes();
    } catch (error) {
        console.log("Error syncing quotes with server:", error);
    }
}

// Simulate periodic syncing of quotes with the server
setInterval(syncQuotesWithServer, 10000); // Sync quotes every 10 seconds

// Function to handle conflicts and update the local quotes array using async/await
async function handleConflicts(updatedQuotes) {
    quotes = updatedQuotes;
    displayQuotes();
    console.log("Conflicts resolved. Quotes updated.");
}

// Testing and verification code goes here
const headers = {
    "Content-Type": "application/json"
const headers = {
    "Content-Type": "application/json"
};

// Function to display a notification or update the UI when quotes are synced with the server
function showSyncNotification() {
    // Replace this with your actual notification or UI update logic
    console.log("Quotes synced with server!");
}

// Call the showSyncNotification function after syncing quotes with the server
syncQuotesWithServer().then(() => {
    showSyncNotification();
});
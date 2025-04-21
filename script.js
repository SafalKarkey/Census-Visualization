// --- Configuration ---

// Map your Datawrapper chart embed codes here.
// Structure: { categoryValue: { subCategoryName: { embedCode: 'FULL_HTML_EMBED_CODE_STRING' } } }
// ** Go to Datawrapper, get the full embed code (<iframe> + <script> usually) for EACH chart,
// ** and paste it as a JavaScript string below. Be careful with quotes inside the string!
// ** Using backticks (`) for the string makes it easier to handle multi-line code and quotes.
const datawrapperCharts = {
    'caste': {
        '-- Select Caste Data --': { embedCode: null }, // Placeholder
        'Kshetri': {
            embedCode: `<iframe title="Kshetri" aria-label="Map" id="datawrapper-chart-y6QIW" src="https://datawrapper.dwcdn.net/y6QIW/5/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>`
            // Note: This is the SCRIPT embed. If you have an IFRAME embed code, use that instead. Example:
            // embedCode: `<iframe title="Title From Datawrapper" aria-label="Map" id="datawrapper-chart-XXXXX" src="https://datawrapper.dwcdn.net/XXXXX/Y/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="ZZZ" data-external="1"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}();\x3c/script>`
            // ** REPLACE THE ABOVE WITH YOUR ACTUAL, COMPLETE KSHETRI EMBED CODE **
        },
        'Brahmin-Hill': {
            embedCode: `<iframe title="Brahman - Hill" aria-label="Map" id="datawrapper-chart-5bubU" src="https://datawrapper.dwcdn.net/5bubU/1/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>` // ** REPLACE **
        },
        'Thakuri': {
            embedCode: `<iframe title="Thakuri" aria-label="Map" id="datawrapper-chart-3fMtK" src="https://datawrapper.dwcdn.net/3fMtK/3/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>` // ** REPLACE **
        },
        'Tamang': {
            embedCode: `<iframe title="Tamang" aria-label="Map" id="datawrapper-chart-sTHeH" src="https://datawrapper.dwcdn.net/sTHeH/4/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>` // ** REPLACE **
        },
        // Add other caste sub-categories here
    },
    'religion': {
        '-- Select Religion Data --': { embedCode: null }, // Placeholder
        'Islam': {
             // Using the iframe example you provided initially
            embedCode: `<iframe title="Percentage of Islam" aria-label="Map" id="datawrapper-chart-Nj2u6" src="https://datawrapper.dwcdn.net/Nj2u6/3/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>`
             // ** If Datawrapper gives you a different embed code for ISLAM now, use that one **
        },
        'Hindu': {
            embedCode: `<iframe title="Percentage of Hindus" aria-label="Map" id="datawrapper-chart-xz5Wn" src="https://datawrapper.dwcdn.net/xz5Wn/4/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>` // ** REPLACE **
        },
        'Christian': {
            embedCode: `<iframe title="Percentage of Christians" aria-label="Map" id="datawrapper-chart-xTki5" src="https://datawrapper.dwcdn.net/xTki5/3/" scrolling="no" frameborder="0" style="border: none;" width="600" height="451" data-external="1"></iframe>` // ** REPLACE **
        },
        // Add other religion sub-categories here
    }
    // Add other main categories here
};

// --- DOM Elements ---
const categorySelect = document.getElementById('categorySelect');
const subCategorySelect = document.getElementById('subCategorySelect');
const chartContainer = document.getElementById('chartContainer');
// const datawrapperFrame = document.getElementById('datawrapperFrame'); // No longer needed
// const loadingMessage = document.getElementById('loadingMessage'); // No longer needed
const noChartMessage = document.getElementById('noChartMessage');
const initialMessage = document.getElementById('initialMessage');
const currentDateSpan = document.getElementById('currentDate');

// --- Event Listeners ---
categorySelect.addEventListener('change', handleCategoryChange);
subCategorySelect.addEventListener('change', handleSubCategoryChange);

// --- Functions ---

/**
 * Handles changes in the main category selection.
 */
function handleCategoryChange() {
    const selectedCategory = categorySelect.value;
    clearSubCategoryOptions();
    hideChart(); // Clear previous chart/message
    initialMessage.style.display = 'none';

    if (selectedCategory && datawrapperCharts[selectedCategory]) {
        const subCategories = datawrapperCharts[selectedCategory];
        populateSubCategoryOptions(subCategories);
        subCategorySelect.disabled = false;
        // Show the container but display the "no chart" message initially
        showNoChartMessage("Please select specific data from the second dropdown.");
    } else {
        subCategorySelect.disabled = true;
        initialMessage.style.display = 'block'; // Show initial message again
        hideChart(); // Ensure container is hidden
    }
}

/**
 * Handles changes in the sub-category selection.
 */
function handleSubCategoryChange() {
    const selectedCategory = categorySelect.value;
    const selectedSubCategory = subCategorySelect.value;

    if (selectedCategory && datawrapperCharts[selectedCategory] && selectedSubCategory) {
        const chartData = datawrapperCharts[selectedCategory][selectedSubCategory];

        // Check if there is actual embed code
        if (chartData && chartData.embedCode) {
            displayChart(chartData.embedCode);
        } else {
            // Handle placeholder or missing code
            showNoChartMessage("Please select specific data.");
        }
    } else {
         showNoChartMessage("Please select specific data.");
    }
}

/**
 * Populates the sub-category dropdown options.
 */
function populateSubCategoryOptions(subCategories) {
    for (const name in subCategories) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        // Disable placeholder options if they have no embed code
        if (!subCategories[name].embedCode) {
             option.disabled = true;
        }
        subCategorySelect.appendChild(option);
    }
}

/**
 * Removes all options from the sub-category dropdown except the default placeholder.
 */
function clearSubCategoryOptions() {
    while (subCategorySelect.options.length > 1) {
        subCategorySelect.remove(1);
    }
    subCategorySelect.selectedIndex = 0;
}


/**
 * Displays the specified Datawrapper chart by injecting its embed code.
 * @param {string} embedCode - The full HTML embed code string.
 */
function displayChart(embedCode) {
    // Clear previous content (like noChartMessage) and show container
    chartContainer.innerHTML = ''; // Clear previous content first
    chartContainer.style.display = 'block'; // Show container
    noChartMessage.style.display = 'none';
    initialMessage.style.display = 'none';

    // Inject the new embed code
    // Browsers might execute scripts injected this way, which is what Datawrapper relies on.
    chartContainer.innerHTML = embedCode;
}

/**
 * Hides the chart display area and clears its content.
 */
function hideChart() {
    chartContainer.innerHTML = ''; // Clear injected content
    chartContainer.style.display = 'none'; // Hide container
    noChartMessage.style.display = 'none'; // Ensure message is also hidden
}

/**
 * Shows a message in the chart area (e.g., "select data").
 */
function showNoChartMessage(messageText = "Please make a selection.") {
    chartContainer.innerHTML = ''; // Clear any previous chart embed
    noChartMessage.textContent = messageText;
    noChartMessage.style.display = 'block';
    chartContainer.style.display = 'block'; // Keep container visible for the message
    initialMessage.style.display = 'none';
}


/**
 * Sets the current date in the footer.
 */
function setCurrentDate() {
    if(currentDateSpan) {
        const today = new Date();
        // Format date as desired, e.g., Monday, April 21, 2025
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateSpan.textContent = today.toLocaleDateString('en-US', options); // Adjust locale if needed
    }
}

// --- Initial Setup ---
function initializeApp() {
     subCategorySelect.disabled = true;
     clearSubCategoryOptions();
     hideChart(); // Hide chart area initially
     initialMessage.style.display = 'block'; // Show initial message
     setCurrentDate(); // Set date in footer
     if (subCategorySelect.options.length === 0) {
         const defaultOption = document.createElement('option');
         defaultOption.value = "";
         defaultOption.textContent = "-- Select Main Category First --";
         subCategorySelect.appendChild(defaultOption);
     }
}

// Run initialization when the script loads
initializeApp();
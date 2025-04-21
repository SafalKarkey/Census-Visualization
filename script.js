// Data configuration
const dataConfig = {
    caste: {
        title: "Caste/Ethnicity Distribution",
        options: [
            { value: "y6QIW", label: "Kshetri", chartType: "map" },
            { value: "5bubU", label: "Brahmin-Hill", chartType: "map" },
            { value: "DEF456", label: "Thakuri", chartType: "map" },
            { value: "GHI789", label: "Tamang", chartType: "map" },
            { value: "JKL012", label: "Newar", chartType: "map" },
            { value: "MNO345", label: "Magar", chartType: "map" }
        ]
    },
    religion: {
        title: "Religious Distribution",
        options: [
            { value: "Nj2u6", label: "Islam", chartType: "map" },
            { value: "PQR678", label: "Hindu", chartType: "map" },
            { value: "STU901", label: "Christian", chartType: "map" },
            { value: "VWX234", label: "Buddhist", chartType: "map" },
            { value: "YZA567", label: "Kirat", chartType: "map" }
        ]
    },
    language: {
        title: "Language Distribution",
        options: [
            { value: "BCD890", label: "Nepali", chartType: "map" },
            { value: "EFG123", label: "Maithili", chartType: "map" },
            { value: "HIJ456", label: "Bhojpuri", chartType: "map" },
            { value: "KLM789", label: "Tharu", chartType: "map" },
            { value: "NOP012", label: "Tamang", chartType: "map" }
        ]
    },
    education: {
        title: "Education Level",
        options: [
            { value: "QRS345", label: "Literacy Rate", chartType: "map" },
            { value: "TUV678", label: "Higher Education", chartType: "map" },
            { value: "WXY901", label: "Primary Education", chartType: "map" }
        ]
    }
};

// DOM elements
const mainCategorySelect = document.getElementById('mainCategory');
const subCategorySelect = document.getElementById('subCategory');
const subcategoryContainer = document.getElementById('subcategoryContainer');
const visualizationContainer = document.getElementById('dataVisualization');
const loadingSpinner = document.getElementById('loadingSpinner');
const toggleButtons = document.querySelectorAll('.toggle-btn');

// Current state
let currentView = 'map'; // 'map' or 'chart'

// Initialize the app
function init() {
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    mainCategorySelect.addEventListener('change', handleMainCategoryChange);
    subCategorySelect.addEventListener('change', handleSubcategoryChange);
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', handleViewToggle);
    });
}

// Handle main category selection
function handleMainCategoryChange() {
    const selectedCategory = mainCategorySelect.value;
    
    // Reset subcategory
    subCategorySelect.innerHTML = '<option value="">-- Select a subcategory --</option>';
    
    if (selectedCategory) {
        // Show subcategory selector
        subcategoryContainer.style.display = 'block';
        
        // Populate subcategories
        const categoryData = dataConfig[selectedCategory];
        categoryData.options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.label;
            subCategorySelect.appendChild(optElement);
        });
    } else {
        // Hide subcategory selector
        subcategoryContainer.style.display = 'none';
        visualizationContainer.innerHTML = '';
    }
}

// Handle subcategory selection
function handleSubcategoryChange() {
    const selectedSubcategory = subCategorySelect.value;
    const selectedCategory = mainCategorySelect.value;
    
    if (selectedSubcategory) {
        showLoading(true);
        
        // In a real app, you would fetch the appropriate visualization here
        // For now, we'll simulate a delay and then show the iframe
        setTimeout(() => {
            loadVisualization(selectedCategory, selectedSubcategory);
            showLoading(false);
        }, 1000);
    } else {
        visualizationContainer.innerHTML = '';
    }
}

// Load the appropriate visualization
function loadVisualization(category, subcategoryId) {
    // Clear previous visualization
    visualizationContainer.innerHTML = '';
    
    // Find the selected option
    const categoryData = dataConfig[category];
    const selectedOption = categoryData.options.find(opt => opt.value === subcategoryId);
    
    if (!selectedOption) return;
    
    // Create the appropriate visualization based on current view
    if (currentView === 'map') {
        loadMapVisualization(selectedOption);
    } else {
        loadChartVisualization(selectedOption);
    }
}

// Load a map visualization
function loadMapVisualization(option) {
    const iframe = document.createElement('iframe');
    iframe.title = option.label;
    iframe.ariaLabel = 'Map';
    iframe.src = `https://datawrapper.dwcdn.net/${option.value}/2/`;
    iframe.scrolling = 'no';
    iframe.frameBorder = '0';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.setAttribute('data-external', '1');
    
    visualizationContainer.appendChild(iframe);
}

// Load a chart visualization (placeholder - would need specific chart IDs)
function loadChartVisualization(option) {
    // In a real implementation, you would load a different Datawrapper chart
    // For this example, we'll just show a message
    const message = document.createElement('div');
    message.className = 'chart-placeholder';
    message.innerHTML = `
        <h3>${option.label} - Chart View</h3>
        <p>This would display a chart visualization of the data.</p>
        <p>In a full implementation, you would load a different Datawrapper chart ID for the chart view.</p>
    `;
    
    visualizationContainer.appendChild(message);
}

// Handle view toggle (map/chart)
function handleViewToggle(e) {
    const view = e.currentTarget.dataset.view;
    
    if (view === currentView) return;
    
    // Update active button
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Update current view
    currentView = view;
    
    // Reload visualization if we have a subcategory selected
    if (subCategorySelect.value) {
        showLoading(true);
        setTimeout(() => {
            loadVisualization(mainCategorySelect.value, subCategorySelect.value);
            showLoading(false);
        }, 500);
    }
}

// Show/hide loading spinner
function showLoading(show) {
    loadingSpinner.style.display = show ? 'flex' : 'none';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
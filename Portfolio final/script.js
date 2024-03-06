// Theme functionality
const $themebtn = document.querySelector("[data-theme-btn]"); // Selects the theme button
const $HTML = document.documentElement; // Selects the HTML element
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // Checks if user's preference is dark mode

// Check if theme is stored in sessionStorage, otherwise set default based on user preference
if (sessionStorage.getItem("theme")) {
    $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
    $HTML.dataset.theme = isDark ? "dark" : "light";
    sessionStorage.setItem("theme", $HTML.dataset.theme);
}

// Function to toggle between light and dark themes
const changeTheme = () => {
    $HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
    sessionStorage.setItem("theme", $HTML.dataset.theme);
};

$themebtn.addEventListener("click", changeTheme); // Adds click event listener to theme button

// Tab functionality
const $tabBtn = document.querySelectorAll("[data-tab-btn]"); // Selects all tab buttons
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]"); // Selects the initially active tab content
let [lastActiveTabBtn] = $tabBtn; // Selects the initially active tab button

// Adds click event listeners to each tab button
$tabBtn.forEach(item => {
    item.addEventListener("click", function () {
        // Removes 'active' class from last active tab content and tab button
        lastActiveTab.classList.remove("active");
        lastActiveTabBtn.classList.remove("active");

        // Selects the corresponding tab content based on the clicked tab button
        const $tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
        $tabContent.classList.add("active"); // Adds 'active' class to the clicked tab content
        this.classList.add("active"); // Adds 'active' class to the clicked tab button

        // Updates the last active tab and tab button
        lastActiveTab = $tabContent;
        lastActiveTabBtn = this;
    });
});
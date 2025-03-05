// auth.js - Include this on both signup.html and my-account.html pages

// Navigation bar account button redirection
document.addEventListener('DOMContentLoaded', function() {
    // Get the My Account button in the navbar
    const accountButton = document.querySelector('nav a.bg-teal-600');
    
    if (accountButton) {
        accountButton.addEventListener('click', function(e) {
            // Check if user is logged in
            const userData = localStorage.getItem('obitoUser');
            const isLoggedIn = userData ? JSON.parse(userData).isLoggedIn : false;
            
            // If not on signup page and not logged in, redirect to signup
            if (!window.location.pathname.includes('signup.html') && !isLoggedIn) {
                e.preventDefault();
                window.location.href = 'signup.html';
            }
            
            // If on any page and logged in, go to my-account.html
            if (isLoggedIn && !window.location.pathname.includes('my-account.html')) {
                e.preventDefault();
                window.location.href = 'my-account.html';
            }
        });
    }
});

// Check login on my-account.html page
function checkLoginForMyAccount() {
    // Only run this check on the My Account page
    if (window.location.pathname.includes('my-account.html')) {
        const userData = localStorage.getItem('obitoUser');
        const isLoggedIn = userData ? JSON.parse(userData).isLoggedIn : false;
        
        // If not logged in, redirect to signup
        if (!isLoggedIn) {
            window.location.href = 'signup.html';
        } else {
            // If logged in, populate the page with user data
            populateAccountPage(JSON.parse(userData));
        }
    }
}

// Populate My Account page with user data
function populateAccountPage(userData) {
    // Set user name
    const nameElements = document.querySelectorAll('.user-name');
    nameElements.forEach(element => {
        element.textContent = userData.name;
    });
    
    // Set occupation
    const occupationElements = document.querySelectorAll('.user-occupation');
    occupationElements.forEach(element => {
        element.textContent = userData.occupation;
    });
    
    // Set profile photo if available
    const profilePhotos = document.querySelectorAll('.profile-photo');
    profilePhotos.forEach(photo => {
        if (userData.photo) {
            photo.src = userData.photo;
            photo.classList.remove('bg-teal-100');
        }
    });
    
    // Set join date
    const joinDateElements = document.querySelectorAll('.join-date');
    if (joinDateElements.length > 0 && userData.joinDate) {
        const joinDate = new Date(userData.joinDate);
        const options = { year: 'numeric', month: 'long' };
        const formattedDate = joinDate.toLocaleDateString('en-US', options);
        joinDateElements.forEach(element => {
            element.textContent = `Member since ${formattedDate}`;
        });
    }
    
    // Setup logout functionality
    setupLogout();
}

// Add logout functionality
function setupLogout() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update user data to logged out
            const userData = JSON.parse(localStorage.getItem('obitoUser'));
            userData.isLoggedIn = false;
            localStorage.setItem('obitoUser', JSON.stringify(userData));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}

// Run the login check when the page loads
document.addEventListener('DOMContentLoaded', checkLoginForMyAccount);
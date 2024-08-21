document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const testUsername = 'testuser';
    const testPassword = 'testpass';

    // Check if the user is already logged in
    if (localStorage.getItem('loggedIn') === 'true' || sessionStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    form.addEventListener('submit', (event) => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const stayLoggedIn = document.getElementById('stayLoggedIn').checked;

        if (!username || !password) {
            alert('Please fill in both fields.');
            event.preventDefault(); // Prevent form submission
        } else if (username === testUsername && password === testPassword) {
            // Store login status based on Stay Logged In
            if (stayLoggedIn) {
                localStorage.setItem('loggedIn', 'true');
            } else {
                sessionStorage.setItem('loggedIn', 'true');
            }
            // Redirect to dashboard.html
            window.location.href = 'dashboard.html';
            event.preventDefault(); // Prevent form submission
        } else {
            alert('Invalid username or password.');
            event.preventDefault(); // Prevent form submission
        }
    });



    
});

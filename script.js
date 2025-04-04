document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    const passwordField = document.getElementById('password');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generate');
    const lengthInput = document.getElementById('length');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');

    // Load theme preference from local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    // Toggle dark mode
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    // Password Generation Function
    function generatePassword() {
        const length = parseInt(lengthInput.value);
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

        let allChars = "";
        let password = "";

        if (uppercaseCheckbox.checked) allChars += uppercase;
        if (lowercaseCheckbox.checked) allChars += lowercase;
        if (numbersCheckbox.checked) allChars += numbers;
        if (symbolsCheckbox.checked) allChars += symbols;

        if (allChars.length === 0) {
            alert("Please select at least one character type!");
            return;
        }

        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }

        passwordField.value = password;
    }

    // Copy to Clipboard Function
    function copyToClipboard() {
        if (!passwordField.value) {
            alert("No password to copy!");
            return;
        }
        navigator.clipboard.writeText(passwordField.value)
            .then(() => alert("Password copied to clipboard!"))
            .catch(err => console.error("Failed to copy: ", err));
    }

    // Event Listeners
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
});


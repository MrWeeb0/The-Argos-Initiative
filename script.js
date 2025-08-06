// This ensures the script runs only after the entire page is loaded
document.addEventListener('DOMContentLoaded', function() {

    // Find the form on the page
    const form = document.getElementById('leadForm');

    // Make sure the form was actually found before adding a listener
    if (form) {
        const submitButton = document.getElementById('submitButton');
        const formMessage = document.getElementById('formMessage');
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxxKPZ_QCNBRU0rDFzTLtmOvgwY3OpTJO6sq-pJA0oK7_V87C_wDnNujBvgNVieKyxt/exec'; // <-- MAKE SURE THIS IS YOUR LATEST URL

        form.addEventListener('submit', e => {
            e.preventDefault(); // This stops the page from reloading
            
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (response.ok) {
                        formMessage.textContent = 'Success! You will receive the report shortly.';
                        formMessage.style.color = 'var(--accent-color)';
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    formMessage.textContent = 'Error! Please try again.';
                    formMessage.style.color = '#ff6b6b';
                    console.error('Error during fetch!', error); // This will now show errors in the console
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Download Free Report';
                });
        });
    } else {
        console.error('Error: Form with ID "leadForm" was not found.');
    }
});
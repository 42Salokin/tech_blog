const signupFormHandler = async (event) => {
    //This prevents the browser from submitting the form to the server in the default way
    event.preventDefault();

    //Uses document.querySelector to find the element with the ID username-signup
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username, password)
    if (username && password) {
        //This block executes only if all required fields have values
        // Specifies the URL endpoint of the API responsible for user signup.
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            //Creates a JSON object containing the collected user information (username, email, password).
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        //Waits for the response from the API and checks if the status code indicates success (usually in the 200-299 range).
        if (response.ok) {
            //Redirects the user to the /profile page after successful signup.
            document.location.replace('/');
        } else {
            //Displays a basic alert message with the status text from the response (e.g., "400 Bad Request")
            alert(response.statusText);
        }
    }
};

//Uses document.querySelector to find the element with the ID username-signup
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
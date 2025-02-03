document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Accessing the form inputs using their "name" attributes
        const username = registerForm.elements["username"].value;
        const email = registerForm.elements["email"].value;

        // Logging for debugging purposes
        console.log("Saving to localStorage:", { username, email });

        // Save the inputs to localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // Redirect to parentChild.html
        window.location.href = "./parentChild.html";
    });
});


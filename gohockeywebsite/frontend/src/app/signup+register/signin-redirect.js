const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (user === "root" && password === "gohockey") {
        window.location.href = "../adminpanel+programs/admin-panel.html";
    } else {
        window.location.href = "../mainpage/mainpage.html";
    }
});

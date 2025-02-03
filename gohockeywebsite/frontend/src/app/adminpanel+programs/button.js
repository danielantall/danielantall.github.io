const statusButton = document.getElementById("status");

statusButton.addEventListener('click', () => {
    if (statusButton.classList.contains("btn-warning")) {
        statusButton.classList.remove("btn-warning");
        statusButton.classList.add("btn-success");
        statusButton.textContent = "Paid";
    } else if (statusButton.classList.contains("btn-success")){
        statusButton.classList.remove("btn-success");
        statusButton.classList.add("btn-warning");
        statusButton.textContent = "Pending";
    }
})
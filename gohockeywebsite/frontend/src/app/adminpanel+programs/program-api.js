document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://danielantall.github.io/gohockeywebsite/frontend/src/app/adminpanel+programs/mockdata.json";

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            // Transform data into rows for DataTable
            const tableData = data.map((item) => {
                const parent = item.parents[0]; // Assuming a single parent per entry
                return [
                    `${parent.first_name} ${parent.last_name}`, // Name
                    item.program, // Program
                    parent.payment_email, // Email
                    parent.phone, // Phone Number
                    parent.postal, // Postal Code
                    getPaymentStatusButton(item.paymentStatus) // Payment Status as a button
                ];
            });

            // Initialize DataTable on the table element
            $("#example").DataTable({
                data: tableData, // Pass transformed data
                columns: [
                    { title: "Name" },
                    { title: "Program" },
                    { title: "Email" },
                    { title: "Phone Number" },
                    { title: "Postal Code" },
                    {
                        title: "Payment Status",
                        className: "text-center", // Center-align the buttons
                    }
                ],
              
            });
        });
});

// Helper function for payment status as Bootstrap buttons
function getPaymentStatusButton(status) {
    switch (status) {
        case 0:
            return '<button class="btn btn-secondary btn-sm">Not Signed Up</button>';
        case 1:
            return '<button class="btn btn-warning btn-sm">Pending</button>';
        case 2:
            return '<button class="btn btn-danger btn-sm">Unpaid</button>';
        case 3:
            return '<button class="btn btn-success btn-sm">Completed</button>';
        default:
            return '<button class="btn btn-dark btn-sm">Unknown</button>';
    }
}

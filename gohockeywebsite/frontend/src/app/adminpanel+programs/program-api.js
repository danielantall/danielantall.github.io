const programTemplate = document.querySelector("[program-template]");
const programContainer = document.getElementById("programContainer");






document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:8080/gohockeywebsite/frontend/src/app/adminpanel+programs/mockdata.json").then(res => res.json()).then(data => {
        user = data.map(firstData => {
            console.log(firstData);
            const programRow = programTemplate.content.cloneNode(true).children[0];
            
            const firstName = programRow.querySelector("#firstName");
            const lastName = programRow.querySelector("#lastName");
            const program = programRow.querySelector("#program");
            const phone = programRow.querySelector("#phone");
            const email = programRow.querySelector("#email");
            const postal = program.querySelector('#postal')

            firstName.textContent = firstData.parents[0].first_name;
            lastName.textContent = firstData.parents[0].last_name;
            program.textContent = firstData.program;
            phone.textContent = firstData.parents[0].phone;
            email.textContent = firstData.parents[0].payment_email;
            postal.textContent = firstData.parents[0].postal;
            programContainer.innerHTML += programRow;
            return {
                firstName: firstData.parents[0].first_name,
                lastName: firstData.parents[0].last_name,
                program: firstData.program,
                phone: firstData.parents[0].phone,
                email: firstData.parents[0].payment_email,
                
                element: programRow // Assuming `card` is an existing DOM element or object
            };
        });
    });

})
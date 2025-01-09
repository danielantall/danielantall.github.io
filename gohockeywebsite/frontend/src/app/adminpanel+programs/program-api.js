const programTemplate = document.querySelector("[program-template]");
const programContainer = document.getElementById("programContainer");
const programSearch = document.querySelector("[program-search]");

let programs = []
programSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    programs.forEach(program => {
        const isVisible = Object.values(program).some(attribute =>
            attribute.toString().toLowerCase().includes(value)
        );
        // You can add your logic here to handle visibility, e.g., hiding or showing elements
        program.element.classList.toggle("hide", !isVisible);
    });

})



document.addEventListener("DOMContentLoaded", () => {
    fetch("mockdata.json").then(res => res.json()).then(data => {
        user = data.map(firstData => {
            const programRow = programTemplate.content.cloneNode(true).children[0];
            
            const firstName = programRow.querySelector("#firstName");
            const lastName = programRow.querySelector("#lastName");
            const program = programRow.querySelector("#program");
            const phone = programRow.querySelector("#phone");
            const email = programRow.querySelector("#email");
            const childFirstName = programRow.querySelector("#childFirstName");
            const childLastName = programRow.querySelector("#childLastName");
            const birthYear = programRow.querySelector("#birthYear");
            const division = programRow.querySelector("#division");
            const hockeyOrg = programRow.querySelector("#hockeyOrg");
            const position = programRow.querySelector("#position");
            const medicalConcerns = programRow.querySelector("#medicalConcerns");

            firstName.textContent = firstData.parents[0].first_name;
            lastName.textContent = firstData.parents[0].last_name;
            program.textContent = firstData.program;
            phone.textContent = firstData.parents[0].phone;
            email.textContent = firstData.parents[0].payment_email;
            childFirstName.textContent = firstData.children[0].first_name;
            childLastName.textContent = firstData.children[0].last_name;
            birthYear.textContent = firstData.children[0].birth_year;
            division.textContent = firstData.children[0].division_level;
            hockeyOrg.textContent = firstData.children[0].hockey_org;
            position.textContent = firstData.children[0].position;
            medicalConcerns.textContent = firstData.children[0].medical_concerns;
            programContainer.appendChild(programRow);
            return {
                firstName: firstData.parents[0].first_name,
                lastName: firstData.parents[0].last_name,
                program: firstData.program,
                phone: firstData.parents[0].phone,
                email: firstData.parents[0].payment_email,
                childFirstName: firstData.children[0].first_name,
                childLastName: firstData.children[0].last_name,
                birthYear: firstData.children[0].birth_year,
                division: firstData.children[0].division_level,
                hockeyOrg: firstData.children[0].hockey_org,
                position: firstData.children[0].position,
                medicalConcerns: firstData.children[0].medical_concerns,
                element: programRow // Assuming `card` is an existing DOM element or object
            };
        });
    });

})
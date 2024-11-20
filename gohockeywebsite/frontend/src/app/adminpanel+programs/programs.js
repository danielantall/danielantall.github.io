const { google } = require('googleapi');
const fs = require('fs');
// 1. Reference the button
const addButton = document.getElementById('add-button');
const section = document.getElementById('program');
// 2. Define the HTML structure
const newElementHTML = `
    <div contenteditable="true" class="container-xs">
        <div class="row">
            <h3>TITLE HERE</h3>
        </div>
        <div class="row">
            <div>
                    Description
            </div>
        </div>
        <div class="row justify-content-evenly">
            <div class="col-10">
                Requirements:
                <ul>
                    <li>5+ years experience</li>
                    <li>Intermediate skating experience</li>
                </ul>
            </div>
            <div class="col">
                <button class="nav-button register-button">Add to cart</button>
            </div>
        </div>
    </div>
`;

// 3. Add an event listener to the button
addButton.addEventListener('click', () => {
    
    // Create a container for the new HTML
    section.innerHTML += newElementHTML
});

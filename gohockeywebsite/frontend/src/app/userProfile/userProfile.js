/********************************************************
 * DEFINE GUARDIAN AND CHILD HTML
 ********************************************************/
let childCount = 0;

function createGuardianHTML() {
    return `
        <div class="mb-3">
            <label for="guardianFirstName" class="form-label">First Name:</label>
            <input type="text" class="form-control" id="guardianFirstName" placeholder="Enter first name" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianLastName" class="form-label">Last Name:</label>
            <input type="text" class="form-control" id="guardianLastName" placeholder="Enter last name" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianPhone" class="form-label">Phone Number:</label>
            <input type="text" class="form-control" id="guardianPhone" placeholder="Enter phone number" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianEmail" class="form-label">Email:</label>
            <input type="email" class="form-control" id="guardianEmail" placeholder="Enter email" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianPostalCode" class="form-label">Postal Code:</label>
            <input type="text" class="form-control" id="guardianPostalCode" placeholder="Enter postal code" disabled>
        </div>
    `;
}

function createChildHTML(childCount) {
    return `
        <h5>Child ${childCount}</h5>
        <div class="mb-3">
            <label for="childFirstName-${childCount}" class="form-label">First Name:</label>
            <input type="text" class="form-control" id="childFirstName-${childCount}" placeholder="Enter first name" disabled>
        </div>
        <div class="mb-3">
            <label for="childLastName-${childCount}" class="form-label">Last Name:</label>
            <input type="text" class="form-control" id="childLastName-${childCount}" placeholder="Enter last name" disabled>
        </div>
        <div class="mb-3">
            <label for="birthYear-${childCount}" class="form-label">Birth Year:</label>
            <select class="form-control" id="birthYear-${childCount}" disabled>
                <option value="" disabled selected>Choose Birth Year</option>
                ${Array.from({ length: 31 }, (_, i) => `<option value="${2000 + i}">${2000 + i}</option>`).join('')}
            </select>
        </div>
        <div class="mb-3">
            <label for="divisionLevel-${childCount}" class="form-label">Division Level:</label>
            <input type="text" class="form-control" id="divisionLevel-${childCount}" placeholder="Enter division level" disabled>
        </div>
        <div class="mb-3">
            <label for="hockeyOrg-${childCount}" class="form-label">Hockey Organization:</label>
            <input type="text" class="form-control" id="hockeyOrg-${childCount}" placeholder="Enter hockey organization" disabled>
        </div>
        <div class="mb-3">
            <label for="position-${childCount}" class="form-label">Position:</label>
            <select class="form-control" id="position-${childCount}" disabled>
                <option value="" disabled selected>Choose Position</option>
                <option value="Forward">Forward</option>
                <option value="Defense">Defense</option>
                <option value="Goalie">Goalie</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="medicalConcerns-${childCount}" class="form-label">Medical Concerns:</label>
            <textarea class="form-control" id="medicalConcerns-${childCount}" placeholder="Enter medical concerns" disabled></textarea>
        </div>
        <button class="btn btn-danger remove-btn" onclick="removeElement('child-${childCount}')">Remove Child</button>
    `;
}

/********************************************************
 * TOGGLE EDIT MODE
 ********************************************************/
function toggleEditable(editable) {
    document.querySelectorAll(`
        #profileFields input,
        .guardian-container input,
        .guardian-container select,
        .guardian-container textarea,
        .child-container input,
        .child-container select,
        .child-container textarea
    `).forEach((field) => {
        field.disabled = !editable;
    });

    // Show/hide Add Child button and Remove buttons for children
    document.getElementById('add-child-btn').style.display = editable ? 'block' : 'none';
    document.querySelectorAll('.child-container .remove-btn').forEach((button) => {
        button.style.display = editable ? 'block' : 'none';
    });

    // Show/hide Save and Edit buttons
    document.getElementById('saveProfileBtn').style.display = editable ? 'block' : 'none';
    document.getElementById('editProfileBtn').style.display = editable ? 'none' : 'block';
}

// Event listeners for Edit and Save buttons
document.getElementById('editProfileBtn').addEventListener('click', () => toggleEditable(true));
document.getElementById('saveProfileBtn').addEventListener('click', () => toggleEditable(false));

/********************************************************
 * ADD AND REMOVE CHILD DYNAMICALLY
 ********************************************************/
const childrenContainer = document.getElementById('children-container');

// Add Child
document.getElementById('add-child-btn').addEventListener('click', () => {
    childCount++;
    const childDiv = document.createElement('div');
    childDiv.classList.add('child-container');
    childDiv.id = `child-${childCount}`;
    childDiv.innerHTML = createChildHTML(childCount);
    childrenContainer.appendChild(childDiv);
});

// Remove Child
function removeElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.remove();
}

/********************************************************
* SAVE PROFILE
********************************************************/
saveProfileBtn.addEventListener('click', () => {
  const guardiansData = Array.from(document.querySelectorAll('.guardian-container')).map((guardian) => ({
    firstName: guardian.querySelector(`[id^="guardianFirstName"]`).value,
    lastName: guardian.querySelector(`[id^="guardianLastName"]`).value,
    phone: guardian.querySelector(`[id^="guardianPhone"]`).value,
    email: guardian.querySelector(`[id^="guardianEmail"]`).value,
  }));

  const childrenData = Array.from(document.querySelectorAll('.child-container')).map((child) => ({
    firstName: child.querySelector(`[id^="childFirstName"]`).value,
    lastName: child.querySelector(`[id^="childLastName"]`).value,
    birthYear: child.querySelector(`[id^="birthYear"]`).value,
    divisionLevel: child.querySelector(`[id^="divisionLevel"]`).value,
    hockeyOrg: child.querySelector(`[id^="hockeyOrg"]`).value,
    position: child.querySelector(`[id^="position"]`).value,
    medicalConcerns: child.querySelector(`[id^="medicalConcerns"]`).value,
  }));

  console.log({ guardiansData, childrenData });
  toggleEditable(false);
});


/********************************************************
* PROFILE PICTURE EDIT
********************************************************/
// Handle profile image upload
const editPhotoBtn = document.getElementById('editPhotoBtn');
const photoInput = document.getElementById('photoInput');
const profileImage = document.getElementById('profileImage');

// Upload profile photo
editPhotoBtn.addEventListener('click', () => {
    photoInput.click();  // Trigger file input click
});

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgDataUrl = e.target.result; 
            profileImage.src = imgDataUrl;
            localStorage.setItem('profileImage', imgDataUrl);
        };
        reader.readAsDataURL(file);
    }
});

//reload
document.addEventListener('DOMContentLoaded', () => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        profileImage.src = storedImage;
    } else {
        //default image
        profileImage.src = '../assets/images/GOHockey_Logo_Vector_IconOnly.svg'; 
    }
});


/********************************************************
 * LOAD DATA AND UPDATE PROFILE FROM LOCALSTORAGE
 ********************************************************/
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve data from localStorage
    const guardianData = JSON.parse(localStorage.getItem('guardian')) || {};
    const childrenData = JSON.parse(localStorage.getItem('children')) || [];

    // Populate guardian section using createGuardianHTML
    const guardianDiv = document.createElement('div');
    guardianDiv.classList.add('guardian-container');
    guardianDiv.id = 'guardian-1';
    guardianDiv.innerHTML = createGuardianHTML();

    // Populate guardian fields
    guardianDiv.querySelector(`#guardianFirstName`).value = guardianData.firstName || '';
    guardianDiv.querySelector(`#guardianLastName`).value = guardianData.lastName || '';
    guardianDiv.querySelector(`#guardianPhone`).value = guardianData.phone || '';
    guardianDiv.querySelector(`#guardianEmail`).value = guardianData.email || '';
    guardianDiv.querySelector(`#guardianPostalCode`).value = guardianData.postalCode || '';

    document.getElementById('guardians-container').appendChild(guardianDiv);

    // Populate children section using createChildHTML
    childrenData.forEach((child, index) => {
        childCount++;
        const childDiv = document.createElement('div');
        childDiv.classList.add('child-container');
        childDiv.id = `child-${childCount}`;
        childDiv.innerHTML = createChildHTML(childCount);

        // Populate child fields
        childDiv.querySelector(`#childFirstName-${childCount}`).value = child.firstName;
        childDiv.querySelector(`#childLastName-${childCount}`).value = child.lastName;
        childDiv.querySelector(`#birthYear-${childCount}`).value = child.birthYear;
        childDiv.querySelector(`#divisionLevel-${childCount}`).value = child.divisionLevel;
        childDiv.querySelector(`#hockeyOrg-${childCount}`).value = child.hockeyOrg;
        childDiv.querySelector(`#position-${childCount}`).value = child.position;
        childDiv.querySelector(`#medicalConcerns-${childCount}`).value = child.medicalConcerns;

        document.getElementById('children-container').appendChild(childDiv);
    });

    // Set profile to non-editable initially
    toggleEditable(false);
});


/********************************************************
 * SAVE PROFILE CHANGES
 ********************************************************/
document.getElementById('saveProfileBtn').addEventListener('click', () => {
    const childrenData = [];
    document.querySelectorAll('.child-container').forEach((child, index) => {
        childrenData.push({
            firstName: child.querySelector(`#childFirstName-${index + 1}`).value,
            lastName: child.querySelector(`#childLastName-${index + 1}`).value,
            birthYear: child.querySelector(`#birthYear-${index + 1}`).value,
            divisionLevel: child.querySelector(`#divisionLevel-${index + 1}`).value,
            hockeyOrg: child.querySelector(`#hockeyOrg-${index + 1}`).value,
            position: child.querySelector(`#position-${index + 1}`).value,
            medicalConcerns: child.querySelector(`#medicalConcerns-${index + 1}`).value,
        });
    });

    // Save updated data to localStorage
    localStorage.setItem('children', JSON.stringify(childrenData));
    toggleEditable(false);
});


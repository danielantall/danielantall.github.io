/********************************************************
* DEFINE GUARDIAN AND CHILD HTML
********************************************************/
let guardianCount = 0;
let childCount = 0;

function createGuardianHTML(guardianCount) {
    return `
        <h5>Guardian ${guardianCount}</h5>
        <div class="mb-3">
            <label for="guardianFirstName-${guardianCount}" class="form-label">First Name:</label>
            <input type="text" class="form-control" id="guardianFirstName-${guardianCount}" placeholder="Enter first name" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianLastName-${guardianCount}" class="form-label">Last Name:</label>
            <input type="text" class="form-control" id="guardianLastName-${guardianCount}" placeholder="Enter last name" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianPhone-${guardianCount}" class="form-label">Phone Number:</label>
            <input type="text" class="form-control" id="guardianPhone-${guardianCount}" placeholder="Enter phone number" disabled>
        </div>
        <div class="mb-3">
            <label for="guardianEmail-${guardianCount}" class="form-label">Email:</label>
            <input type="email" class="form-control" id="guardianEmail-${guardianCount}" placeholder="Enter email" disabled>
        </div>
        <button class="btn btn-danger remove-btn" onclick="removeElement('guardian-${guardianCount}')" style="display: none;">Remove Guardian</button>
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
        <button class="btn btn-danger remove-btn" onclick="removeElement('child-${childCount}')" style="display: none;">Remove Child</button>
    `;
}

/********************************************************
* TOGGLE EDIT MODE
********************************************************/
function toggleEditable(editable) {
    // Ensure username, email, guardian, and child fields are editable/locked
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

    // Show/hide the Add Guardian / Add Child buttons
    document.getElementById('add-guardian-btn').style.display = editable ? 'block' : 'none';
    document.getElementById('add-child-btn').style.display = editable ? 'block' : 'none';
    document.getElementById('saveProfileBtn').style.display = editable ? 'block' : 'none';
    document.getElementById('editProfileBtn').style.display = editable ? 'none' : 'block';
    document.getElementById('editPhotoBtn').style.display = editable ? 'block' : 'none';

    // Show/hide Remove Guardian/Child buttons
    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.style.display = editable ? 'block' : 'none';
    });
}

// Event listeners for "Edit Profile" and "Save Changes"
document.getElementById('editProfileBtn').addEventListener('click', () => {
    toggleEditable(true);
});

document.getElementById('saveProfileBtn').addEventListener('click', () => {
    toggleEditable(false);
});

/********************************************************
* ADD GUARDIAN AND CHILD DYNAMICALLY
********************************************************/
const guardiansContainer = document.getElementById('guardians-container');
const childrenContainer = document.getElementById('children-container');

// ADD GUARDIAN DYNAMICALLY
document.getElementById('add-guardian-btn').addEventListener('click', () => {
    // Calculate the current guardian count dynamically based on the number of guardian containers
    const guardianCount = document.querySelectorAll('.guardian-container').length + 1;

    const guardianDiv = document.createElement('div');
    guardianDiv.classList.add('guardian-container');
    guardianDiv.id = `guardian-${guardianCount}`;
    guardianDiv.innerHTML = createGuardianHTML(guardianCount);
    guardiansContainer.appendChild(guardianDiv);

    // Make newly added guardian editable if in "edit mode"
    toggleEditable(true);
});

// ADD CHILD DYNAMICALLY
document.getElementById('add-child-btn').addEventListener('click', () => {
    // Calculate the current child count dynamically based on the number of child containers
    const childCount = document.querySelectorAll('.child-container').length + 1;

    const childDiv = document.createElement('div');
    childDiv.classList.add('child-container');
    childDiv.id = `child-${childCount}`;
    childDiv.innerHTML = createChildHTML(childCount);
    childrenContainer.appendChild(childDiv);

    // Make newly added child editable if in "edit mode"
    toggleEditable(true);
});

// REMOVE ELEMENT (GUARDIAN OR CHILD) AND UPDATE COUNTS
function removeElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();

        // After removing a guardian or child, recalculate and update counts based on the remaining elements
        updateGuardianCount();
        updateChildCount();
    }
}

// UPDATE GUARDIAN COUNT AFTER REMOVAL
function updateGuardianCount() {
    const guardians = document.querySelectorAll('.guardian-container');
    guardians.forEach((guardian, index) => {
        const guardianNumber = index + 1; // Guardian numbers should start from 1 after a removal
        const guardianHeader = guardian.querySelector('h5');
        if (guardianHeader) {
            guardianHeader.textContent = `Guardian ${guardianNumber}`; // Update guardian label
        }
        // Update guardian inputs to reflect correct IDs
        const inputs = guardian.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const idParts = input.id.split('-');
            idParts[1] = guardianNumber;
            input.id = idParts.join('-');
        });
    });
}

// UPDATE CHILD COUNT AFTER REMOVAL
function updateChildCount() {
    const children = document.querySelectorAll('.child-container');
    children.forEach((child, index) => {
        const childNumber = index + 1; // Child numbers should start from 1 after a removal
        const childHeader = child.querySelector('h5');
        if (childHeader) {
            childHeader.textContent = `Child ${childNumber}`; // Update child label
        }
        // Update child inputs to reflect correct IDs
        const inputs = child.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const idParts = input.id.split('-');
            idParts[1] = childNumber;
            input.id = idParts.join('-');
        });
    });
}


/********************************************************
* REMOVE ELEMENT BY ID
********************************************************/
function removeElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
    }
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
* GENERATE DEFAULT PROFILE PICTURE
********************************************************/
function generateDefaultProfilePicture(name) {
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');

    // Choose a random background color
    const colors = ['#5e00c7', '#ccc'];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the first letter
    ctx.fillStyle = '#fff'; // White text
    ctx.font = 'bold 70px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const initial = name.charAt(0).toUpperCase();
    ctx.fillText(initial, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
}

/********************************************************
* PROFILE PICTURE EDIT
********************************************************/
const editPhotoBtn = document.getElementById('editPhotoBtn');
const photoInput = document.getElementById('photoInput');
const profileImage = document.getElementById('profileImage');

// On error, generate a default image with the guardian's name
profileImage.onerror = () => {
    const guardianFirstName = document.querySelector('[id^="guardianFirstName"]').value || 'G';
    profileImage.src = generateDefaultProfilePicture(guardianFirstName);
};

// Event listener for uploading custom profile picture
editPhotoBtn.addEventListener('click', () => {
    photoInput.click();
});

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Set default profile picture if no image is uploaded
document.addEventListener('DOMContentLoaded', () => {
    const guardianFirstName = document.querySelector('[id^="guardianFirstName"]').value || 'G';
    profileImage.src = generateDefaultProfilePicture(guardianFirstName);
});

/********************************************************
* LOAD DATA AND UPDATE PROFILE FROM GUARDIAN/CHILD
********************************************************/
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve data from localStorage
    const guardiansData = JSON.parse(localStorage.getItem('guardians')) || [];
    const childrenData = JSON.parse(localStorage.getItem('children')) || [];

    // Populate username and email fields
    document.getElementById('username').value = localStorage.getItem('username') || "";
    document.getElementById('email').value = localStorage.getItem('email') || "";

    // Populate guardians section using createGuardianHTML
    guardiansData.forEach((guardian, index) => {
        guardianCount++; // Increment global count
        const guardianDiv = document.createElement('div');
        guardianDiv.classList.add('guardian-container');
        guardianDiv.id = `guardian-${guardianCount}`;
        guardianDiv.innerHTML = createGuardianHTML(guardianCount);

        // Populate guardian fields
        guardianDiv.querySelector(`#guardianFirstName-${guardianCount}`).value = guardian.firstName;
        guardianDiv.querySelector(`#guardianLastName-${guardianCount}`).value = guardian.lastName;
        guardianDiv.querySelector(`#guardianPhone-${guardianCount}`).value = guardian.phone;
        guardianDiv.querySelector(`#guardianEmail-${guardianCount}`).value = guardian.email;

        document.getElementById('guardians-container').appendChild(guardianDiv);
    });

    // Populate children section using createChildHTML
    childrenData.forEach((child, index) => {
        childCount++; // Increment global count
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


// Save Profile Changes
document.getElementById('saveProfileBtn').addEventListener('click', () => {
    const guardiansData = [];
    document.querySelectorAll('.guardian-container').forEach((guardian, index) => {
        guardiansData.push({
            firstName: document.getElementById(`guardianFirstName-${index + 1}`).value,
            lastName: document.getElementById(`guardianLastName-${index + 1}`).value,
            phone: document.getElementById(`guardianPhone-${index + 1}`).value,
            email: document.getElementById(`guardianEmail-${index + 1}`).value,
            profileColor: JSON.parse(localStorage.getItem('guardians'))[index].profileColor, // Keep the color consistent
        });
    });

    const childrenData = [];
    document.querySelectorAll('.child-container').forEach((child, index) => {
        childrenData.push({
            firstName: document.getElementById(`childFirstName-${index + 1}`).value,
            lastName: document.getElementById(`childLastName-${index + 1}`).value,
        });
    });

    // Save username and email to localStorage
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    // Save guardians and children to localStorage
    localStorage.setItem('guardians', JSON.stringify(guardiansData));
    localStorage.setItem('children', JSON.stringify(childrenData));
});



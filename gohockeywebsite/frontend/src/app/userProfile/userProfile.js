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
        <button class="btn btn-danger remove-btn" onclick="removeElement('guardian-${guardianCount}')">Remove Guardian</button>
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
    //Ensure username, email, guardian, and child fields are editable/locked
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

    //Show or hide the Add Guardian / Add Child buttons
    document.getElementById('add-guardian-btn').style.display = editable ? 'block' : 'none';
    document.getElementById('add-child-btn').style.display = editable ? 'block' : 'none';
    document.getElementById('saveProfileBtn').style.display = editable ? 'block' : 'none';
    document.getElementById('editProfileBtn').style.display = editable ? 'none' : 'block';

    // how/hide Remove Guardian/Child buttons
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

document.getElementById('add-guardian-btn').addEventListener('click', () => {
    guardianCount++;
    const guardianDiv = document.createElement('div');
    guardianDiv.classList.add('guardian-container');
    guardianDiv.id = `guardian-${guardianCount}`;
    guardianDiv.innerHTML = createGuardianHTML(guardianCount);
    guardiansContainer.appendChild(guardianDiv);

    // Make newly added guardian editable if in "edit mode"
    toggleEditable(true);
});

document.getElementById('add-child-btn').addEventListener('click', () => {
    childCount++;
    const childDiv = document.createElement('div');
    childDiv.classList.add('child-container');
    childDiv.id = `child-${childCount}`;
    childDiv.innerHTML = createChildHTML(childCount);
    childrenContainer.appendChild(childDiv);

    //Make newly added child editable if in "edit mode"
    toggleEditable(true);
});

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
* PROFILE PICTURE EDIT
********************************************************/
const editPhotoBtn = document.getElementById('editPhotoBtn');
const photoInput = document.getElementById('photoInput');
const profileImage = document.getElementById('profileImage');

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
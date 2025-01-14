const childrenContainer = document.getElementById("children-container");
const guardiansContainer = document.getElementById("guardians-container");
const addChildBtn = document.getElementById("add-child-btn");
const addGuardianBtn = document.getElementById("add-guardian-btn");
const saveBtn = document.getElementById("save-btn");
let childCount = 0;
let guardianCount = 0;

/********************************************************
 * ADD VALIDATION FOR SAVE BUTTON
 ********************************************************/
function validateSaveButton() {
  const guardians = document.querySelectorAll(".guardian-container");
  const children = document.querySelectorAll(".child-container");

  let allFieldsFilled = true;

  //Ensure all guardian fields are filled
  guardians.forEach((guardian) => {
    guardian.querySelectorAll("input").forEach((input) => {
      if (!input.value.trim()) {
        allFieldsFilled = false;
      }
    });
  });

  //Ensure all child fields are filled
  children.forEach((child) => {
    child.querySelectorAll("input, select, textarea").forEach((field) => {
      if (!field.value.trim()) {
        allFieldsFilled = false;
      }
    });
  });

  //Enable save button only if all fields are filled and there's at least one guardian
  saveBtn.disabled = !allFieldsFilled || guardians.length === 0;
}

/********************************************************
 * ADD VALIDATION FOR CHILD BUTTON
 ********************************************************/
function validateAddChildButton() {
  const guardians = document.querySelectorAll(".guardian-container");
  //Disable "Add Child" button if no guardians exist
  addChildBtn.disabled = guardians.length === 0;
}

/********************************************************
 * ADD INPUT EVENT LISTENERS TO FIELDS
 ********************************************************/
function addInputListeners(container) {
  container.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", validateSaveButton);
  });
}

/********************************************************
 * ADD CHILD DYNAMICALLY
 ********************************************************/
addChildBtn.addEventListener("click", () => {
  childCount++;
  const childDiv = document.createElement("div");
  childDiv.classList.add("child-container");
  childDiv.id = `child-${childCount}`;

  childDiv.innerHTML = `
    <div class="mb-3">
      <label for="childFirstName-${childCount}" class="form-label">First Name:</label>
      <input type="text" class="form-control" id="childFirstName-${childCount}" placeholder="Enter first name">
    </div>
    <div class="mb-3">
      <label for="childLastName-${childCount}" class="form-label">Last Name:</label>
      <input type="text" class="form-control" id="childLastName-${childCount}" placeholder="Enter last name">
    </div>
    <div class="mb-3">
      <label for="birthYear-${childCount}" class="form-label">Birth Year:</label>
      <select class="form-control" id="birthYear-${childCount}">
        <option value="" disabled selected>Choose Birth Year</option>
        ${Array.from({ length: 31 }, (_, i) => `<option value="${2000 + i}">${2000 + i}</option>`).join("")}
      </select>
    </div>
    <div class="mb-3">
      <label for="divisionLevel-${childCount}" class="form-label">Division Level:</label>
      <input type="text" class="form-control" id="divisionLevel-${childCount}" placeholder="Enter division level">
    </div>
    <div class="mb-3">
      <label for="hockeyOrg-${childCount}" class="form-label">Hockey Organization:</label>
      <input type="text" class="form-control" id="hockeyOrg-${childCount}" placeholder="Enter hockey organization">
    </div>
    <div class="mb-3">
      <label for="position-${childCount}" class="form-label">Position:</label>
      <select class="form-control" id="position-${childCount}">
        <option value="" disabled selected>Choose Position</option>
        <option value="Forward">Forward</option>
        <option value="Defense">Defense</option>
        <option value="Goalie">Goalie</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="medicalConcerns-${childCount}" class="form-label">Medical Concerns:</label>
      <textarea class="form-control" id="medicalConcerns-${childCount}" placeholder="Enter medical concerns"></textarea>
    </div>
    <button class="btn btn-danger remove-btn" onclick="removeElement('child-${childCount}')">Remove Child</button>
  `;

  childrenContainer.appendChild(childDiv);
  addInputListeners(childDiv);
  validateSaveButton();
});

/********************************************************
 * ADD GUARDIAN DYNAMICALLY
 ********************************************************/
addGuardianBtn.addEventListener("click", () => {
  guardianCount++;
  const guardianDiv = document.createElement("div");
  guardianDiv.classList.add("guardian-container");
  guardianDiv.id = `guardian-${guardianCount}`;

  guardianDiv.innerHTML = `
    <div class="mb-3">
      <label for="guardianFirstName-${guardianCount}" class="form-label">First Name:</label>
      <input type="text" class="form-control" id="guardianFirstName-${guardianCount}" placeholder="Enter first name">
    </div>
    <div class="mb-3">
      <label for="guardianLastName-${guardianCount}" class="form-label">Last Name:</label>
      <input type="text" class="form-control" id="guardianLastName-${guardianCount}" placeholder="Enter last name">
    </div>
    <div class="mb-3">
      <label for="guardianPhone-${guardianCount}" class="form-label">Phone Number:</label>
      <input type="text" class="form-control" id="guardianPhone-${guardianCount}" placeholder="Enter phone number">
    </div>
    <div class="mb-3">
      <label for="guardianEmail-${guardianCount}" class="form-label">Email:</label>
      <input type="email" class="form-control" id="guardianEmail-${guardianCount}" placeholder="Enter email">
    </div>
    <button class="btn btn-danger remove-btn" onclick="removeElement('guardian-${guardianCount}')">Remove Guardian</button>
  `;

  guardiansContainer.appendChild(guardianDiv);
  addInputListeners(guardianDiv);
  validateAddChildButton();
  validateSaveButton();
});

/********************************************************
 * REMOVE ELEMENT BY ID
 ********************************************************/
function removeElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.remove();
    validateAddChildButton();
    validateSaveButton();
  }
}

/********************************************************
 * REDIRECT TO USER PROFILE
 ********************************************************/
saveBtn.addEventListener("click", () => {
  const guardiansData = [];
  document.querySelectorAll(".guardian-container").forEach((guardian) => {
    const guardianId = guardian.id.split("-")[1];

    guardiansData.push({
      firstName: document.getElementById(`guardianFirstName-${guardianId}`).value,
      lastName: document.getElementById(`guardianLastName-${guardianId}`).value,
      phone: document.getElementById(`guardianPhone-${guardianId}`).value,
      email: document.getElementById(`guardianEmail-${guardianId}`).value,
    });
  });

  const childrenData = [];
  document.querySelectorAll(".child-container").forEach((child) => {
    const childId = child.id.split("-")[1];
    childrenData.push({
      firstName: document.getElementById(`childFirstName-${childId}`).value,
      lastName: document.getElementById(`childLastName-${childId}`).value,
      birthYear: document.getElementById(`birthYear-${childId}`).value,
      divisionLevel: document.getElementById(`divisionLevel-${childId}`).value,
      hockeyOrg: document.getElementById(`hockeyOrg-${childId}`).value,
      position: document.getElementById(`position-${childId}`).value,
      medicalConcerns: document.getElementById(`medicalConcerns-${childId}`).value,
    });
  });

  // Save data to localStorage
  localStorage.setItem("guardians", JSON.stringify(guardiansData));
  localStorage.setItem("children", JSON.stringify(childrenData));

  //Redirect to userProfile
  window.location.href = "../userProfile/userProfile.html";
});

validateAddChildButton();
validateSaveButton();


        
        
        
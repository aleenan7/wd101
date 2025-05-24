const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("entryTableBody");

function getEntries() {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function saveEntries(entries) {
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

function displayEntries() {
  const entries = getEntries();
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.termsAccepted}</td>
    `;
    tableBody.appendChild(row);
  });
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isEmailValid(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  if (!isEmailValid(email)) {
    alert("Please enter a valid email.");
    return;
  }

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = {
    name,
    email,
    password,
    dob,
    termsAccepted: terms ? "true" : "false",
  };

  const entries = getEntries();
  entries.push(newEntry);
  saveEntries(entries);
  displayEntries();
  form.reset();
});

window.addEventListener("DOMContentLoaded", displayEntries);

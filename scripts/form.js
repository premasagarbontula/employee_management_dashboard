// form.js
export const modal = document.getElementById("employee-modal");
export const form = document.getElementById("employee-form");

export function openAddForm(employeeAPI) {
  document.getElementById("form-title").textContent = "Add Employee";
  document.getElementById("employee-id").value = "";
  form.reset();
  import("./dom.js").then(({ populateDropdowns }) =>
    populateDropdowns(employeeAPI)
  );
  modal.classList.remove("hidden");
}

export function openEditForm(employeeAPI, id) {
  const employee = employeeAPI.getEmployees().find((e) => e.id === id);
  if (!employee) return;

  document.getElementById("form-title").textContent = "Edit Employee";
  document.getElementById("employee-id").value = employee.id;
  document.getElementById("first-name").value = employee.firstName;
  document.getElementById("last-name").value = employee.lastName;
  document.getElementById("email").value = employee.email;
  document.getElementById("department").value = employee.department;
  document.getElementById("role").value = employee.role;

  import("./dom.js").then(({ populateDropdowns }) =>
    populateDropdowns(employeeAPI)
  );
  modal.classList.remove("hidden");
}

export function getFormData() {
  return {
    id: document.getElementById("employee-id").value,
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
  };
}

export function clearErrorMessages() {
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));
}

export function validateForm(data) {
  clearErrorMessages();
  let isValid = true;

  if (!data.firstName) {
    document.getElementById("first-name-error").textContent =
      "First name required";
    isValid = false;
  }
  if (!data.lastName) {
    document.getElementById("last-name-error").textContent =
      "Last name required";
    isValid = false;
  }
  if (!data.email) {
    document.getElementById("email-error").textContent = "Email required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    document.getElementById("email-error").textContent = "Invalid email format";
    isValid = false;
  }
  if (!data.department) {
    document.getElementById("department-error").textContent =
      "Department required";
    isValid = false;
  }
  if (!data.role) {
    document.getElementById("role-error").textContent = "Role required";
    isValid = false;
  }

  return isValid;
}

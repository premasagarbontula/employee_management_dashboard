import { employeeAPI } from "./employeeAPI.js";
import { renderTable, populateDropdowns } from "./dom.js";
import {
  getFormData,
  validateForm,
  openAddForm,
  openEditForm,
  form,
  modal,
} from "./form.js";
import { applyFilters, paginate, employeesPerPage } from "./filters.js";

let currentPage = 1;

// DOM Elements
const searchInput = document.getElementById("search");
const deptFilter = document.getElementById("department-filter");
const roleFilter = document.getElementById("role-filter");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const resetFiltersBtn = document.getElementById("reset-filters");
const addEmployeeBtn = document.getElementById("add-employee-btn");
const cancelBtn = document.getElementById("cancel-form");

function renderEmployees() {
  const filtered = applyFilters(
    employeeAPI,
    searchInput.value,
    deptFilter.value,
    roleFilter.value
  );
  const { paginated, totalPages } = paginate(
    filtered,
    currentPage,
    employeesPerPage
  );

  renderTable(paginated, (id) => openEditForm(employeeAPI, id), deleteEmployee);

  pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function deleteEmployee(id) {
  if (confirm("Are you sure?")) {
    employeeAPI.deleteEmployee(id);
    renderEmployees();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const data = getFormData();
  if (!validateForm(data)) return;

  if (data.id) {
    const success = employeeAPI.updateEmployee({
      ...data,
      id: parseInt(data.id),
    });
    if (!success)
      document.getElementById("email-error").textContent =
        "Email already exists";
  } else {
    const added = employeeAPI.addEmployee(data);
    if (!added)
      document.getElementById("email-error").textContent =
        "Email already exists";
  }

  modal.classList.add("hidden");
  renderEmployees();
}

// Event Listeners
addEmployeeBtn.addEventListener("click", () => openAddForm(employeeAPI));
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
form.addEventListener("submit", handleFormSubmit);
searchInput.addEventListener("input", renderEmployees);
deptFilter.addEventListener("change", renderEmployees);
roleFilter.addEventListener("change", renderEmployees);
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  renderEmployees();
});
nextPageBtn.addEventListener("click", () => {
  currentPage++;
  renderEmployees();
});
resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  deptFilter.value = "";
  roleFilter.value = "";
  currentPage = 1;
  renderEmployees();
});

// Initial load
populateDropdowns(employeeAPI);
renderEmployees();

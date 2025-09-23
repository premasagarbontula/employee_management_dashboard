export const tableBody = document.getElementById("employee-table-body");

//Render employees table and attach action listeners

export function renderTable(employees, openEditForm, deleteEmployee) {
  tableBody.innerHTML = employees
    .map(
      (emp) => `
      <tr>
        <td>${emp.firstName}</td>
        <td>${emp.lastName}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>
          <button class="btn-edit" data-id="${emp.id}">Edit</button>
          <button class="btn-delete" data-id="${emp.id}">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");

  // Attach event listeners to action buttons
  document
    .querySelectorAll(".btn-edit")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        openEditForm(parseInt(btn.dataset.id))
      )
    );
  document
    .querySelectorAll(".btn-delete")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        deleteEmployee(parseInt(btn.dataset.id))
      )
    );
}

//Update a single dropdown element

export function updateDropdown(id, options, defaultText = "Select") {
  const select = document.getElementById(id);
  const currentValue = select.value;

  select.innerHTML = `<option value="">${defaultText}</option>`;
  options.forEach((option) => select.add(new Option(option, option)));

  // Restore previous selection if still valid
  if (currentValue && options.includes(currentValue))
    select.value = currentValue;
}

/**
 * Populate all dropdowns (form + filters) with data from employeeAPI
 */
export function populateDropdowns(employeeAPI) {
  // Get all unique departments and roles from employees + master lists
  const allDepts = employeeAPI.getDepartments();
  const allRoles = employeeAPI.getRoles();

  // Form dropdowns
  updateDropdown("department", allDepts);
  updateDropdown("role", allRoles);

  // Filter dropdowns
  updateDropdown("department-filter", allDepts, "All Departments");
  updateDropdown("role-filter", allRoles, "All Roles");
}

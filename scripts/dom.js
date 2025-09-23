// dom.js
export const tableBody = document.getElementById("employee-table-body");

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

  // Add action listeners
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

export function updateDropdown(id, options, defaultText = "Select") {
  const select = document.getElementById(id);
  const currentValue = select.value;
  select.innerHTML = `<option value="">${defaultText}</option>`;
  options.forEach((option) => select.add(new Option(option, option)));
  if (currentValue && options.includes(currentValue))
    select.value = currentValue;
}

export function populateDropdowns(employeeAPI) {
  updateDropdown("department", employeeAPI.getDepartments());
  updateDropdown("role", employeeAPI.getRoles());
  updateDropdown(
    "department-filter",
    employeeAPI.getDepartments(),
    "All Departments"
  );
  updateDropdown("role-filter", employeeAPI.getRoles(), "All Roles");
}

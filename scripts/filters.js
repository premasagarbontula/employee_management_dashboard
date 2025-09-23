// filters.js
export let currentPage = 1;
export const employeesPerPage = 5;

export function applyFilters(employeeAPI, searchTerm, dept, role) {
  let employees = employeeAPI.getEmployees();

  return employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchTerm) ||
      emp.lastName.toLowerCase().includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm);

    const matchesDept = dept ? emp.department === dept : true;
    const matchesRole = role ? emp.role === role : true;

    return matchesSearch && matchesDept && matchesRole;
  });
}

export function paginate(employees, page) {
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const paginated = employees.slice(
    (page - 1) * employeesPerPage,
    page * employeesPerPage
  );
  return { paginated, totalPages };
}

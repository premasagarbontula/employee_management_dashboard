export const EMPLOYEE_STORAGE_KEY = "employees";

export function loadEmployees() {
  return JSON.parse(localStorage.getItem(EMPLOYEE_STORAGE_KEY)) || [];
}

export function saveEmployees(employees) {
  localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
}

export const EMPLOYEE_STORAGE_KEY = "employees";

export function loadEmployees(key = EMPLOYEE_STORAGE_KEY) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveEmployees(employees, key = EMPLOYEE_STORAGE_KEY) {
  localStorage.setItem(key, JSON.stringify(employees));
}

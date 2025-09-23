import {
  MASTER_DEPARTMENTS,
  MASTER_ROLES,
  SAMPLE_EMPLOYEES,
} from "./constants.js";
import { loadEmployees, saveEmployees } from "./storage.js";

// In-memory employees
let employees = loadEmployees(); // Uses default EMPLOYEE_STORAGE_KEY

// If empty, populate with sample data
if (employees.length === 0) {
  employees = [...SAMPLE_EMPLOYEES];
  saveEmployees(employees);
}

// Helpers
function generateId() {
  return employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
}

function normalize(str) {
  return str.trim().toLowerCase();
}

export const employeeAPI = {
  getEmployees: () => employees,

  addEmployee: (employee) => {
    if (employees.some((e) => normalize(e.email) === normalize(employee.email)))
      return null;
    const newEmployee = { ...employee, id: generateId() };
    employees.push(newEmployee);
    saveEmployees(employees);
    return newEmployee;
  },

  updateEmployee: (employee) => {
    if (
      employees.some(
        (e) =>
          normalize(e.email) === normalize(employee.email) &&
          e.id !== employee.id
      )
    )
      return false;

    const index = employees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      employees[index] = employee;
      saveEmployees(employees);
      return true;
    }
    return false;
  },

  deleteEmployee: (id) => {
    employees = employees.filter((e) => e.id !== id);
    saveEmployees(employees);
  },

  getDepartments: () => [
    ...new Set([
      ...MASTER_DEPARTMENTS,
      ...employees.map((e) => e.department).filter(Boolean),
    ]),
  ],

  getRoles: () => [
    ...new Set([
      ...MASTER_ROLES,
      ...employees.map((e) => e.role).filter(Boolean),
    ]),
  ],
};

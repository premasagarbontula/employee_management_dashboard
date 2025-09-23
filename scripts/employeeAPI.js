import {
  MASTER_DEPARTMENTS,
  MASTER_ROLES,
  SAMPLE_EMPLOYEES,
} from "./constants.js";
import {
  EMPLOYEE_STORAGE_KEY,
  loadEmployees,
  saveEmployees,
} from "./storage.js";

// In-memory employees
let employees = loadEmployees();

// Helpers
function generateId() {
  return employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
}

function normalize(str) {
  return str.trim().toLowerCase();
}

export const employeeAPI = {
  getEmployees: () => employees,

  addEmployee: (employee) => {
    const isDuplicate = employees.some(
      (e) => normalize(e.email) === normalize(employee.email)
    );
    if (isDuplicate) return null;

    const newEmployee = { ...employee, id: generateId() };
    employees.push(newEmployee);
    saveEmployees(employees);
    return newEmployee;
  },

  updateEmployee: (updatedEmployee) => {
    const isDuplicate = employees.some(
      (e) =>
        normalize(e.email) === normalize(updatedEmployee.email) &&
        e.id !== updatedEmployee.id
    );
    if (isDuplicate) return false;

    const index = employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
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

  initData: () => {
    if (employees.length === 0) {
      employees = [...SAMPLE_EMPLOYEES];
      saveEmployees(employees);
    }
  },
};

// Initialize immediately
employeeAPI.initData();

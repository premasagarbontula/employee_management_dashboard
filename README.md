# Employee Directory Web App

A simple **Employee Directory** web application built using **Vanilla JavaScript**, **HTML**, and **CSS**. The app supports CRUD operations, search, filters, sorting, and pagination. Employee data is stored in **localStorage**, so no backend is required.

---

# Screenshots

![Desktop view](./assets/desktop%20view.png)

![Add Employee view](./assets/Add%20Employee%20View.png)

## Features

- **Add, Edit, Delete Employees**
- **Search** by first name, last name, or email
- **Filter** by Department and Role
- **Pagination** for large employee lists
- **Form validation** with error messages
- **Responsive design** for desktop and mobile
- **LocalStorage** support for persistent data

---

## Project Structure

employee-directory/
├── index.html
├── styles/
│ ├── base.css
│ ├── components.css
│ └── layout.css
├── scripts/
│ ├── constants.js # Master lists and sample employees
│ ├── storage.js # LocalStorage helpers
│ ├── employeeAPI.js # CRUD operations and data management
│ ├── dom.js # DOM rendering and dropdown helpers
│ ├── filters.js # Search, filter, and pagination logic
│ ├── form.js # Form handling and validation
│ └── main.js # App initialization and event listeners
└── README.md

---

## Usage

1. Clone the repository:

```bash
git clone https://github.com/premasagarbontula/employee_management_dashboard.git
cd employee_management_dashboard
```

2. Open index.html in your browser.

3. Use the Add Employee button to add new employees.

4. Edit or delete existing employees using the Edit/Delete buttons.

5. Search employees using the search box.

6. Filter by Department or Role using the dropdowns.

7. Navigate pages using the Previous/Next buttons.

8. Employee data is stored in localStorage, so it persists across page reloads.

## Technologies

** HTML5
** CSS3
\*\* Vanilla JavaScript (ES6 modules)

## Notes

The app uses a modular structure: different functionality is split across multiple JS files for better maintainability.

If localStorage is empty, the app will initialize with sample employees.

Custom departments and roles automatically appear in the filter dropdowns.

## License

MIT License
Contributors: Prema Sagar Bontula

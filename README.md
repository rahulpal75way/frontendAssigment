# frontendAssigment 💰

[![Stars](https://img.shields.io/github/stars/rahulpal75way/frontendAssigment?style=flat-square)](https://github.com/rahulpal75way/frontendAssigment)
[![Forks](https://img.shields.io/github/forks/rahulpal75way/frontendAssigment?style=flat-square)](https://github.com/rahulpal75way/frontendAssigment)
[![License](https://img.shields.io/github/license/rahulpal75way/frontendAssigment?style=flat-square)](https://github.com/rahulpal75way/frontendAssigment/blob/main/LICENSE)


This project is a React application built with Vite, designed as a money transfer application.  Users can deposit, withdraw, and transfer money, while administrators can approve payments and receive commissions. Local transfers incur a 2% commission, while internal transfers have a 10% commission.


## Description

This React application provides a user-friendly interface for managing money transfers. Users can perform various financial transactions, while administrators have access to payment approval and commission management features. The application utilizes a robust backend (not included in this repository) for secure and reliable transaction processing.  This repository contains only the frontend code.


## Technologies Used 🛠️

* **React:**  A JavaScript library for building user interfaces.
* **Vite:** A fast and modern build tool for front-end development.
* **Tailwind CSS:** A utility-first CSS framework.
* **MUI (Material UI):** A React component library providing pre-built Material Design components.
* **Redux Toolkit:** Predictable state container for JavaScript apps.
* **React Router:** For client-side routing.
* **React Hook Form:** For efficient form handling.
* **React Hot Toast:** For displaying notifications.


## Installation ⬇️

1. Clone the repository:  `git clone https://github.com/rahulpal75way/frontendAssigment.git`
2. Navigate to the project directory: `cd frontendAssigment`
3. Install dependencies: `npm install`


## Usage 💻

1. Start the development server: `npm run dev`
2. Open your browser and navigate to `http://localhost:5173/`.


## File Structure 📁

```
frontendAssigment/
├── public/             // Static assets
├── src/                // Source code
│   ├── components/     // Reusable UI components
│   ├── pages/         // Application pages
│   ├── ...             // Other source code files
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```


## Scripts ⚙️

These scripts are defined in the `package.json` file:

* `npm run dev`: Starts the development server with hot module replacement (HMR).
* *(other scripts may be present depending on project setup)*


## Dependencies

```json
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^7.1.2",
    "@mui/material": "^7.1.2",
    "@reduxjs/toolkit": "^2.8.2",
    "@tailwindcss/vite": "^4.1.10",
    "antd": "^5.26.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.59.0",
    "react-hot-toast": "^2.5.2",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.6.2",
    "tailwindcss": "^4.1.10",
    "uuid": "^11.1.0"
  },
```

## Dummy Users for Testing 👤

```json
[
  {
    "id": 4,
    "name": "Diana Prince",
    "email": "diana.prince@test.com",
    "role": "user",
    "password": "diana@secure"
  },
  {
    "id": 5,
    "name": "Eve Adams",
    "email": "eve.adams@test.com",
    "role": "user",
    "password": "eve!pass123"
  },
  {
    "id": 6,
    "name": "Admin User",
    "email": "admin.user@test.com",
    "role": "admin",
    "password": "admin@1234"
  }
]
```

## License

This project is currently not licensed.  Consider adding a license for clarity and legal protection.


## Contribution and Contact 🤝

Contributions are welcome! Please feel free to open an issue or submit a pull request.  For any questions or inquiries, please contact rahulpal75way directly through GitHub.

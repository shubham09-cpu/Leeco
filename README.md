# 🚀 Leeco — Online Coding & Problem-Solving Platform

**Leeco** is a full-stack coding practice and online judge platform built on the **MERN stack** (MongoDB, Express.js, React, Node.js). Inspired by modern competitive programming platforms, Leeco enables developers to browse algorithmic challenges, write and execute code across multiple programming languages, and validate solutions against visible and hidden test cases in real time.

---

## ✨ Key Features

- **Multi-Language Code Execution:** Write, compile, and run solutions in **C++**, **Java**, **JavaScript**, and **Python** via a Judge0-compatible execution engine.
- **Automated Test Case Evaluation:** Validates user submissions against both visible sample cases and hidden edge-case suites with detailed execution metrics (**runtime**, **memory usage**, and **compilation/runtime error diagnostics**).
- **Problem Management (Admin):** Create and manage coding problems with difficulty tags (`Easy`, `Medium`, `Hard`), topic filters (`Array`, `LinkedList`, `Graph`, `DP`), starter code templates, and verified reference solutions.
- **Submission History & Tracking:** Stores complete submission logs per user and problem, tracking `accepted`, `wrong`, `pending`, and `error` statuses alongside passed test case counts.
- **Secure Authentication & Authorization:** Role-based access control separating regular users from problem creators/admins using JWT authentication and middleware protection.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Monaco / Code Editor |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB, Mongoose ODM |
| **Code Execution** | Judge0 / OnlineCompiler API (Batch Submission & Token Polling) |
| **Authentication** | JSON Web Tokens (JWT), HTTP-Only Cookies, bcrypt |

---

## ⚙️ Local Setup & Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/leeco.git
   cd leeco

# ClaimFinder: A Lost and Found Platform

[![Live Site](https://img.shields.io/badge/Live%20Site-ClaimFinder-blue?style=for-the-badge&logo=googlechrome)](https://whereisit-fde86.web.app/)

## 📌 Project Overview
ClaimFinder is a full-stack web application designed to streamline the process of reporting and retrieving lost items. It provides a user-friendly platform where individuals can list lost possessions, explore a catalog of found items, and reclaim their belongings securely.

## ✨ Key Features

- **🔐 User Authentication:** Secure login and registration via Email/Password and Google Authentication.
- **📱 Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **📝 Lost & Found Items Management:**
  - Add, update, and delete lost or found items.
  - Mark items as recovered, with history tracking in a dedicated database collection.
- **🔍 Dynamic Search & Filters:** Search items by title or location in real time.
- **🎨 Interactive UI/UX:** Well-structured layout with proper color contrast, spacing, and alignment.
- **📝 Dynamic Titles:** Page titles update dynamically based on the current route.
- **🔔 Toast Notifications:** Real-time user feedback for CRUD operations.
- **🔒 Protected Routes:** Restricts access to private pages for authenticated users only.
- **⚡ Smooth Animations:** Framer Motion integration for enhanced user experience.
- **📂 Extra Features:** Pagination, layout toggles, and JWT authentication for secured API access.

## 🚀 Deployment
- **Frontend Hosting:** Firebase
- **Backend Hosting:** Production-ready environment (e.g., Render/Railway)
- **Error Handling:** Graceful handling of CORS, 404, and 504 errors, ensuring seamless reloads.

## 🏗️ Page Structure & Functionalities

### 🔹 Navbar
- **Logo & Website Name:** Represents the platform identity.
- **Home Button:** Redirects to the homepage.
- **Lost & Found Items:** Directs users to the listing page.
- **Conditional Authentication Display:**
  - Shows login button if the user is logged out.
  - Displays user profile dropdown if authenticated.
- **Profile Dropdown:**
  - Add Lost & Found Item (Private Route)
  - View All Recovered Items (Private Route)
  - Manage My Items (Private Route)

### 📑 Additional Features
- **📄 Pagination:** Displays 6-9 items per page on the Lost & Found Items page.
- **📊 Recovered Items Layout Toggle:** Switch between table and card views.
- **🔑 JWT Authentication:** Ensures secured access to private routes.

## 🛠️ Tech Stack

### Frontend:
- **React.js** – Component-based UI development.
- **Tailwind CSS** – Modern utility-first CSS framework.
- **Flowbite** – Additional UI enhancements.
- **Framer Motion** – Smooth animations and transitions.

### Backend:
- **Node.js & Express.js** – RESTful API development.
- **MongoDB** – NoSQL database for storing lost and found items.

### Authentication & Hosting:
- **Firebase Authentication** – Email/Password & Google Login.
- **Firebase Hosting** – Reliable frontend deployment.

## 🔐 Environment Variable Security
- Firebase API keys and MongoDB credentials are securely managed using `.env` files.

## ⚙️ Setup Instructions

### 📥 Clone the Repositories
```bash
# Clone the frontend repository
git clone https://github.com/sumu9897/ClaimFinder-Client.git

# Clone the backend repository
git clone https://github.com/sumu9897/Claimfinder-server.git
```

### 🔧 Install Dependencies
```bash
# Navigate to client directory & install dependencies
cd ClaimFinder-Client
npm install

# Navigate to server directory & install dependencies
cd ../Claimfinder-server
npm install
```

### 🏃 Run the Application
```bash
# Start the frontend development server
npm start

# Start the backend server
npm run dev
```

## 🌐 Live Demo
[**ClaimFinder Live Site**](https://whereisit-fde86.web.app/)

---

🔹 **Contributions & Feedback:** Feel free to contribute, report issues, or suggest improvements via GitHub! 🚀
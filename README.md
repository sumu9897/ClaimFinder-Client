# WhereIsIt: A Lost and Found Platform

[Live Site Link](https://whereisit-fde86.web.app/)

## Project Overview
WhereIsIt is a full-stack web application designed to help users reconnect with their lost or found items. The platform allows users to report lost belongings, browse through found items, and recover their possessions through a secure and interactive interface.

## Key Features
- **User Authentication**: Secure login and registration using email/password and Google login.
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop devices.
- **Lost & Found Items Management**: 
  - Add new lost or found items with detailed information.
  - Update or delete previously added items.
  - Mark items as recovered and maintain a record in a dedicated database collection.
- **Dynamic Search and Filters**: Search for items by title or location on the Lost & Found Items page.
- **Interactive UI**: Engaging UI/UX with color contrast, proper alignment, and spacing.
- **Dynamic Title**: Page titles change dynamically based on the current route.
- **Toast Notifications**: Real-time feedback for CRUD operations.
- **Protected Routes**: Ensures that only authenticated users can access private pages.
- **Framer Motion Animations**: Smooth animations to enhance user experience.
- **Extra Features**: Additional sections and features to improve usability and user engagement.

## Deployment
The application is deployed on Firebase, and the server is hosted on a production-ready environment. The site is free from CORS, 404, or 504 errors and handles route reloads gracefully.

## Page Structure and Functionalities
### Navbar
- **Logo/Website Name**: Reflects the theme of the website.
- **Home Button**: Links to the homepage.
- **Lost & Found Items**: Links to the items listing page.
- **Conditional Login/Logout**: Displays login button or user profile with a dropdown.
- **Profile Dropdown**:
  - Add Lost & Found Item (Private Route)
  - All Recovered Items (Private Route)
  - Manage My Items (Private Route)

### Pages
1. **Home Page**
   - Banner/Slider with meaningful slides.
   - Latest Lost & Found Items section showcasing the 6 most recent posts.
   - "See All" button for exploring all items.
   - Additional informative sections.

2. **Add Lost & Found Item** (Private Route)
   - A form to submit lost or found items with fields like title, description, category, and more.
   - Secure image uploads and data storage.

3. **Post Details Page**
   - Displays all information about a specific item.
   - Conditional buttons for "Found This!" or "This is Mine!" with recovery modals.

4. **Lost & Found Items Page**
   - Lists all items with options to view details.

5. **Manage My Items** (Private Route)
   - Displays user-added items in a table format with update and delete options.

6. **Update Items Page** (Private Route)
   - Allows users to edit and update their items with pre-filled data.

7. **All Recovered Items Page** (Private Route)
   - Displays all recovered items in a customizable layout.

8. **404 Page**
   - A visually appealing "Not Found" page for invalid routes.

### Extra Features
- Pagination for the Lost & Found Items page (6-9 items per page).
- Layout toggle for the Recovered Items page (table and card views).
- JWT Authentication for private routes.

## Tech Stack
- **Frontend**: React, Tailwind CSS (with additional UI libraries like Flowbite), Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication (Email/Password, Google Login)
- **Hosting**: Firebase

## Environment Variable Security
- Firebase configuration keys and MongoDB credentials are securely stored using `.env` files.

## Setup Instructions
Clone the repositories:
   - [Client Repository](https://github.com/programming-hero-web-course2/b10a11-client-side-sumu9897)
   - [Server Repository](https://github.com/programming-hero-web-course2/b10a11-server-side-sumu9897)


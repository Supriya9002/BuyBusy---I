

# BuyBusy - E-Commerce Web Application

BuyBusy is a web application designed for customers of an e-commerce business. It allows individuals to browse available items, add or remove them from their shopping cart, and complete the purchasing process.

## Hosted Link

[Add your hosted link here]

## Goal

The objective of this project is to develop a fully functional e-commerce application where users can:

- Browse available products
- Add or remove products from their shopping cart
- Complete the checkout process

## Features

1. **Firebase Integration**:  
   The app is integrated with Firebase for managing product CRUD (Create, Read, Update, Delete) operations.
2. **User Authentication**:  
   Users can register and log in using Firebase Authentication.
3. **Routing**:  
   The app uses `react-router-dom` for routing across different pages.
4. **State Management**:  
   The app uses `useContext()` and React Hooks (`useState`, `useEffect`) to manage user authentication and product states.
5. **Code Quality**:  
   The project is well-structured with clean and documented code.

## Acceptance Criteria

- Firebase authentication for user registration and login
- CRUD operations for cart items using Firebase Firestore
- Proper routing for different pages such as Home, Cart, and Orders
- Usage of `useContext()` for managing user authentication and product data
- State management using React Hooks for handling user interactions and data updates
- High-quality, documented code with no cheating or copying from other sources

## Project Tasks

### Firebase Setup

- Initialize Firebase Firestore for the BuyBusy app and integrate it into the project.

### Pages

1. **Register Page**:  
   Allows new users to sign up for the application.

2. **Login Page**:  
   Allows existing users to log in.

3. **Home Page**:  
   Displays a list of products with a search feature that allows users to filter products by name.

4. **Cart Page**:  
   Displays products that the user has added to their cart, with options to increase or decrease the quantity of each item.

5. **Orders Page**:  
   Displays a list of products that the user has purchased, along with the order date.

### Components

- **Product Card Component**:  
  Displays product details such as image, title, and price, along with buttons to add/remove products from the cart. Quantity buttons are displayed only on the Cart page.

### Additional Features (Optional)

- **Sidebar Filters**:  
  Allows filtering of products based on price and category on the Home page.
  
- **Loading and Empty State**:  
  Displays a loading spinner (using `react-spinners`) when data is being fetched and a message when no products are available.
  
- **Toast Notifications**:  
  Displays notifications (using `react-toastify`) for asynchronous actions like adding/removing products from the cart and error handling.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS, React Router
- **Backend**: Firebase (Firestore for database, Firebase Authentication)
- **Libraries**: 
  - `react-spinners` for loading spinners
  - `react-toastify` for toast notifications
  - `react-router-dom` for routing
- **State Management**: `useContext()`, `useState()`, `useEffect()` hooks

## How to Run This Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd buybusy
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your Firebase configuration:
   ```bash
   REACT_APP_API_KEY=your_firebase_api_key
   REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_PROJECT_ID=your_firebase_project_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

5. To build the app for production:
   ```bash
   npm run build
   ```

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production, bundling React in production mode and optimizing the build.
- `npm run eject`: Removes the single build dependency from the project and provides full control over the configurations.

## Routing Structure

The Firebase API routing structure is as follows:

| Pathname        | Component Name   |
|-----------------|------------------|
| `/`             | `Navbar`         |
| `/myOrder`      | `MyOrder`        |
| `/cart`         | `CartList`       |
| `/LogIn`        | `LogIn`          |
| `/Register`     | `Register`       |

Private routes such as `/myOrder` and `/cart` require authentication and are accessible only to logged-in users.

## Evaluation Criteria

- **Firebase Authentication**: User registration and login should authenticate users properly.
- **Firestore CRUD Operations**: Products in the cart should be managed (Create, Read, Update, Delete) correctly using Firestore.
- **State Management**: Use of `useContext()`, `useState()`, and `useEffect()` hooks for managing user and product states.
- **Routing**: The app should have different routes for Home, Cart, Orders, Login, and Register pages using `react-router-dom`.
- **Code Quality**: Code should follow best practices with proper naming conventions and documentation.

---

Feel free to modify the content based on your project setup! above all is correct , but please write a redme.md formate like [# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`]

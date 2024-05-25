# Inventory Management App

[![Inventory Management App Video](https://img.youtube.com/vi/V2JS_dRl_uY/0.jpg)](https://www.youtube.com/watch?v=V2JS_dRl_uY&t=16s&ab_channel=LucasDaSilva)

## Introduction

Welcome to the Inventory Management App, a project developed as part of The Odin Project curriculum. This application was created to practice and enhance my skills in building full-stack applications, focusing on CRUD operations, experimenting with the NextUI library, and uploading images to Cloudinary.

## Project Overview

This project involves creating an Inventory Management App for an imaginary store. The app is designed to manage categories and items, allowing users to view, create, update, and delete items and categories. The type of business is left to the developer's imagination, whether it's selling groceries, car parts, baby toys, musical instruments, ponies, or anything else.

## Features

- **Categories and Items:** Users can browse items by selecting categories on the home page.

- **CRUD Operations:** Full implementation of Create, Read, Update, and Delete functionalities for both items and categories.

- **NextUI Integration:** The app uses the NextUI library for a sleek and responsive user interface.

- **Image Uploads:** Images for items can be uploaded and managed via Cloudinary.

## Technologies Used

- **Frontend:** React, NextUI, Redux, React-router, JavaScript, axios, tanstack-query, Tailwind
- **Backend:** Node.js, Express, mongoose, multer
- **Database:** MongoDB

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LucasDaSilva96/Inventory-app.git
   cd INVENTORY-APP
   ```

2. **Install dependencies:**

   ```bash
   cd client
   npm install
   cd ../server
   npm install

   ```

3. **Set up environment variables / Front-End:**
   Create a .env file in the client folder and add your base api url,
   Ex: **VITE_BASE_URL= http://localhost:8000/api/**

4. **Set up environment variables / Back-End:**
   Create a .env file in the server folder and add the following environment variables:

   ```plaintext
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   CLOUDINARY_URL= your cloudinary project url
   DB=your_mongodb_uri
   PORT=your port for the server
   ```

5. **Start the server**:

   ```bash
   cd server
   npm run dev
   ```

6. **Start the client**:

   ```bash
   cd client
   npm run dev
   ```

## Conclusion

This Inventory Management App was a great opportunity to practice CRUD operations, experiment with NextUI, and work with Cloudinary for image uploads. It serves as a robust foundation for building more complex inventory systems and enhancing full-stack development skills.

### This project was built for practice and learning purposes as part of The Odin Project curriculum. Thank you for checking it out! If you have any questions or feedback, feel free to reach out.

# CRUD_App 

## 1. Setup Guide - Steps to Start the Application

- Clone the project repository from the remote repository where it is stored.

- Install all the required dependencies using the `npm install` command.

- Run the `npm run dev` command to start the development server.

- Open your web browser and go to http://localhost:5173 to see the application running.

## 2. Folder Structure Overview

The architecture of the project is divided into several folders: 

- src: This folder contains all the source code files for the application.

- src/components: This folder contains Header and Footer components. Each component contains its JSX, styling, and other related files.

- src/components/shared : This folder contains components that are commonly used - Button and Input.

- src/context: This folder has two components - EmployeesContext and TasksContext. This is where the state is managed and shared to other components. 

- src/db: This folder contains all the Firebase-related code. It includes a firebase.js file, which initializes the Firebase app and sets up the connection to the Firestore database.

- src/pages: This folder contains all the pages that the user can navigate to - Employees, Tasks and TopEmployees.

- src/.env: This file contains environment variables that are used throughout the application to access the associated API and perform various tasks, such as reading or writing data to a database or storage system.

## 3. Additional Functionalities

### 1) Paggination 

The pagination functionality allows the user to view the tasks and employees in the table one page at a time. Tables show 5 tasks and employees per page.

### 2) Filter Options

The filter options functionality allows the user to filter the tasks in the table by their status. The user can select one of four options: All, Todo, Completed or In progress. The table then shows only the tasks that match the selected filter option.

### Why I chose these additional functionalities 

I chose these extensions to the application because they enhance the user experience by making it easier to navigate and manage the tasks. The pagination functionality helps users quickly navigate through large amounts of data, while the filter options functionality allows them to find specific tasks more easily. Additionally, I chose Vite.js as the module bundler for its faster development server and build process.

## Finally I hosted application on Firebase hosting service 👇

# [Live Website Preview](https://crud-app-58c6e.firebaseapp.com/)

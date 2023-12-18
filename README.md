# 24073_MAHORO_RAPHAELA_WEBTECH_FRONTEND_EXAM

### ASSIGNMENT SUBMISSION PLATFORM LMS ###


## Project Requirement

- **purpose of the project:**

  The Assignment Submission Platform is a web-based application aimed at simplifying the process of creating and submitting assignments in an educational setting. Developed using React for the frontend and Spring Boot for the backend, the platform caters to the needs of administrators, lecturers, and students.

- **Expected Outcomes:**

  - Assignment Creation: Lecturers can create assignments, specifying details such as due dates and instructions.
  - Assignment Submission: Students can view and submit assignments through a user-friendly interface.
  -  User Management: Admin can manage users (lecturers and students) and define the scope of the project (school or class).
  - Secure Access: Login with protected routes ensures secure access for authorized users.

- **Specific Constraints or Limitations:**
  - Time Constraints: The project was supposed to be completed within 3 weeks
  - Security constraints: 
      - File Upload Security:  Need to Implement file scanning mechanisms to detect and prevent potential threats.
  -  Scalability limitation: Handling an increased number of students may pose challenges for lecturers.


## Project Plan

- **scope of the project:**
    - The project encompasses the development of a web-based assignment submission platform using React and Spring Boot.

- **source code:**
  - The source code for the project is hosted on GitHub:
      - Backend:  https://github.com/Raphaela664/24073_MAHORO_RAPHAELA_WEBTECH_BACKEND_EXAM.git
      - Frontend: https://github.com/Raphaela664/24073_MAHORO_RAPHAELA_WEBTECH_FRONTEND_EXAM.git
## Database schema

- **Table definitions**

1.  Assignment
    - assignment_id(PK)
    - title
    - assignment_description
    - deadline
    - lecturer_id (FK)

2. Lecturer
    - lecturer_id (PK)
    - name
    - email   (Unique)
    - password
    - role

3. Student
    - student_id (PK)
    - name
    - email   (Unique)
    - password
    - role

4. Admin
    - admin_id (PK)
    - name
    - email   (Unique)
    - password
    - role

5. Invitations
    - invitation_id (PK)
    - assignment_id (FK)
    - student_id    (FK)

6. Submissions
    - submission_id (PK)
    - assignment_id (FK)
    - student_id  (FK)
    - file_url

## User Documentation

- **Assignment Creation:**  

  - Lecturers can log in and create assignments, specifying details, due dates and inviting 
    students to the assignment.
  - Once a student is invited, the assignment will show on their dashboard
  

- **Assignment Submission:**

  - Students log in, view assignments, and submit work through the platform.

- **User Management (Admin):**

  - Admin is responsible for users creation and management, and as well as monitors system activities.
  - Each user once created receive an email with their Login credentials

- **Login Credentials:**

  - Admin:  
        - Username - admin123@gmail.com, 
        - Password - admin123




## Technical Documentation

- **Architecture**
  - The application follows a client-server architecture, with React handling the frontend and Spring Boot serving as the backend.

- **Implementation Details:**

  - Frontend:

    - ![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
    - ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss)

  - Backend:

    - ![Java](https://img.shields.io/badge/Java-17-blue?logo=java&style=flat-square)

    - ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-green?logo=spring&style=flat-square)

  - Database:

    - ![MySQL](https://img.shields.io/badge/MySQL-8-blue?logo=mysql&style=flat-square)

  - Dependencies:

    - Spring Boot Starter Web, Spring Boot Starter Data JPA, React Router, Axios


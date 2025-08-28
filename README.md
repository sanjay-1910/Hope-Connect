**Hope Connect**


Hope Connect is an AI-powered facial recognition platform built to assist in identifying and reuniting missing persons with their families. The application allows users to report missing or found individuals by uploading images, which are then analyzed using facial similarity detection via AWS Rekognition. It is supported by secure cloud-based image storage, a notification system, and a user-friendly interface, aiming to create a socially impactful solution for humanitarian needs.

🔧 **Tech Stack**


Frontend: HTML, CSS, JavaScript

Backend: Node.js (Express)

AI Service: AWS Rekognition

Cloud Storage: Amazon S3

Email Service: Nodemailer (SMTP)

Database: MySQL (AWS RDS)

Deployment: Render / Vercel (optional)

Version Control: Git & GitHub



🚀 **Key Features**


🧑‍💻 User Registration and Login

📤 Report a Missing Person with name, image, and details

📥 Report a Found Person (anonymous or registered)

🔎 AI-based Face Matching using AWS Rekognition

📂 Gallery of Uploaded Faces (with filter options)

🔔 Notification System for match results

📬 Email Alerts for successful matches or updates

🛡️ Data Privacy using secure AWS S3 storage



🔁** Workflow**


User Registration & Login

Users sign up and log in securely to report or search cases.

User info is stored securely in the database.

Report a Missing Person

User fills a form with name, age, description, and photo.

The image is uploaded to Amazon S3 and registered in the database.

Report a Found Person

Anyone (even without login) can upload a photo of a person they found.

The system compares the uploaded image with existing missing persons using AWS Rekognition.

If a match is found, it triggers an email notification.



**Gallery View**



All reported cases are shown in a gallery view (based on user role).

Filters can be applied to view missing or found individuals.

Face Matching

Rekognition checks new entries (found persons) against stored images (missing persons).

A similarity score determines a potential match.

Notifications & Alerts

If a match is found, the concerned user receives an email alert.

The platform also shows a real-time notification badge or pop-up.

📬 Email & Notification Flow
Nodemailer is used to send email alerts upon successful face matches.

Users are notified when:

A potential match is found

A report is updated

Email template includes match info, contact details, and next steps.

📷 Gallery
Organized visual section displaying:

Reported missing persons

Found individuals

Each card includes a photo, name, and status.

Helps users visually browse and assist in identifications.



👨‍💻 **My Role**


Contributed to AWS Rekognition integration for face analysis

Helped build the frontend for report forms and gallery UI

Supported S3 image upload functionality and database connection

Assisted in setting up email alerts using Nodemailer

Collaborated with teammates to ensure secure and functional workflow



📚 **What I Learned**


Practical experience with AI-based image recognition

Using AWS services for real-world problem solving

Managing cloud-based file storage (Amazon S3)

Backend logic for secure data handling and image processing

Creating a meaningful, socially responsible tech product



🚧** Future Enhancements**


Add user roles for admin and volunteers

Enable real-time chat or contact system between matched users

Deploy the app with full CI/CD pipeline

Support mobile view/responsive design

Add analytics dashboard to monitor success rates and usage


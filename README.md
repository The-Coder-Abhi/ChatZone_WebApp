# ChatZone 💬

<img src="https://github.com/user-attachments/assets/d18cbc60-718b-4278-962a-7f0275dc1867" width="100%" alt="Chat Main Interface"/>

A real-time, responsive chat application built with React. ChatZone provides a seamless messaging experience, allowing users to connect, communicate, and collaborate instantly. 

## 📸 Application Flow & Screenshots

<details>
<summary><b>1. Onboarding (Splash & Welcome)</b></summary>
<br>
<img src="https://github.com/user-attachments/assets/d18cbc60-718b-4278-962a-7f0275dc1867" width="100%" alt="Splash Screen"/>
<br>
<img src="https://github.com/user-attachments/assets/60b806c2-e725-469d-bdf1-274e5bdcd28e" width="100%" alt="Welcome Screen"/>
</details>

<details>
<summary><b>2. Authentication (Sign In, Sign Up, Verify)</b></summary>
<br>
<img src="https://github.com/user-attachments/assets/bf181c55-bf22-4283-bb15-57ec45039a0b" width="100%" alt="Sign In"/>
<br>
<img src="https://github.com/user-attachments/assets/9c63ad21-b55f-4a96-bae6-e7d01ca912ba" width="100%" alt="Sign Up"/>
<br>
<img src="https://github.com/user-attachments/assets/ef373e49-8568-4fd1-b232-a337ba41e0e5" width="100%" alt="Verify"/>
</details>

<details>
<summary><b>3. Chat Screen</b></summary>
<br>
<img src="https://github.com/user-attachments/assets/17078757-a085-4173-b36b-f08a2a5d9706" width="100%" alt="Chat Screen"/>
</details>

<details>
<summary><b>4. Profile Setup & Management</b></summary>
<br>
<img src="https://github.com/user-attachments/assets/39606ef2-935e-4096-a7d2-d3c88e97dd7f" width="100%" alt="Profile Image Setup"/>
<br>
<img src="https://github.com/user-attachments/assets/3075b66f-84e5-4be5-a0e0-dace43e09ac1" width="100%" alt="Profile Screen"/>
</details>

<details>
<summary><b>5. Search & Discovery</b></summary>
<br>
<img src="https://github.com/user-attachments/assets/3d112d91-2b21-4f82-aa91-c70160016bc2" width="100%" alt="Search Users"/>
</details>

## 🚀 Features

* **Real-time Messaging:** Send and receive messages instantly with zero latency.
* **User Authentication:** Secure login and registration (via Email/Password or Google Auth).
* **Responsive Design:** A fully mobile-friendly UI built with React, ensuring a great experience across all devices.
* **Profile Image Uploads:** Fast and secure profile picture hosting and optimization powered by Cloudinary.
* **Clean UI/UX:** Intuitive interface with clear message bubbles, online status indicators, and easy navigation.

## 🛠️ Tech Stack

* **Frontend:** React.js, JavaScript, HTML5, CSS3, Bootstrap
* **Backend & Database:** Firebase (Authentication, and Realtime Database)
* **Media Storage:** Cloudinary (Profile Image Hosting)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm installed on your machine.
* Node.js (v14 or higher)
* npm (v6 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/The-Coder-Abhi/ChatZone_WebApp.git](https://github.com/The-Coder-Abhi/ChatZone_WebApp.git)

2. Navigate to the project directory:

   ```bash

   cd ChatZone-React


3. Install dependencies:

   ```bash
   npm install


### Configuration (Firebase & Cloudinary)

1. Create a project on the Firebase Console and enable Authentication and Firestore.

2. Create a free account on Cloudinary to get your upload credentials.

3. Create a .env file in the root directory of your project and add your API keys:

   
   ```bash

   # Firebase Credentials

   REACT_APP_FIREBASE_API_KEY="your-api-key"

   REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"

   REACT_APP_FIREBASE_PROJECT_ID="your-project-id"

   REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"

   REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"

   REACT_APP_FIREBASE_APP_ID="your-app-id"

   

   # Cloudinary Credentials

   REACT_APP_CLOUDINARY_CLOUD_NAME="your-cloud-name"

   REACT_APP_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"



### Running the App

```bash

  npm start

```

The application will launch in your default web browser at http://localhost:3000. 


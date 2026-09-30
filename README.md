# Chat Backend

A Node.js backend service for sending **push notifications through Firebase Cloud Messaging (FCM)** for the Flutter Chat App.

This backend uses **Express.js** and **Firebase Admin SDK** to send notifications to users' devices.

## ✨ Features

* 🔔 Send push notifications using Firebase Cloud Messaging.
* 📱 Send notifications to specific devices using FCM tokens.
* 🌐 REST API built with Express.js.
* 🔥 Firebase Admin SDK integration.
* 🔗 Designed to work with the Flutter Chat App.

## 🛠️ Technologies

| Technology               | Purpose                          |
| ------------------------ | -------------------------------- |
| Node.js                  | Backend runtime                  |
| Express.js               | REST API framework               |
| Firebase Admin SDK       | Firebase server-side integration |
| Firebase Cloud Messaging | Push notifications               |
| CORS                     | Cross-origin request handling    |

## 🏗️ Architecture

```text
┌─────────────────────┐
│   Flutter Chat App  │
│                     │
│  Firebase Auth      │
│  Cloud Firestore    │
│  FCM Token          │
└──────────┬──────────┘
           │
           │ HTTP POST
           ▼
┌─────────────────────┐
│   Node.js Backend   │
│                     │
│   Express.js        │
│   Firebase Admin    │
└──────────┬──────────┘
           │
           │ FCM
           ▼
┌─────────────────────┐
│ Firebase Cloud      │
│ Messaging (FCM)     │
└──────────┬──────────┘
           │
           ▼
      User Device
```

## 📁 Project Structure

```text
chat_backend/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> The Firebase Service Account JSON file is required for Firebase Admin SDK authentication but should **not** be committed to the repository.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* A Firebase project
* Firebase Service Account credentials

### Installation

Clone the repository:

```bash
git clone https://github.com/NTQuyeen/chat_backend.git
cd chat_backend
```

Install dependencies:

```bash
npm install
```

### Firebase Configuration

Create a Firebase Service Account from:

```text
Firebase Console
→ Project Settings
→ Service Accounts
→ Generate New Private Key
```

Place the downloaded JSON file in the backend project directory and configure `server.js` to use it.

**Do not upload the Service Account JSON file to GitHub.**

### Run the Server

```bash
node server.js
```

The server runs at:

```text
http://localhost:3000
```

## 📡 API

### Send Notification

**POST**

```text
/send-notification
```

Request:

```json
{
  "token": "FCM_DEVICE_TOKEN",
  "title": "New Message",
  "body": "You have a new message"
}
```

Example:

```text
POST http://localhost:3000/send-notification
```

The backend uses the provided FCM token to send the notification to the user's device.

## 🔗 Related Project

This backend is used together with the Flutter Chat App:

**Flutter Chat App:**
https://github.com/NTQuyeen/flutter_chat_app

## 🔒 Security

Do not commit sensitive information such as:

* Firebase Service Account JSON
* Private keys
* API secrets
* Database credentials
* Environment variables containing secrets

Add sensitive files to `.gitignore`.

## 👨‍💻 Author

**NTQuyeen**

Backend service developed for the Flutter Chat App and educational purposes.

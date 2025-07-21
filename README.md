# 🛠️ FixMyCity

FixMyCity is a mobile-first civic issue reporting platform that empowers citizens to report problems—like potholes, broken streetlights, or trash dumps—directly from their smartphones. The app captures geolocation, description, and photo of the issue and sends it to a backend dashboard for city officials to manage and resolve.

## ⬇️ Demo ⬇️

<div align="center">
  <video width="180" height="200" src="https://github.com/user-attachments/assets/7f0fb19c-95b9-4be2-b157-194bf0e2d502" controls style="border: 1px solid #bbb; border-radius: 6px;"></video>
  <br/>
  <em>FixMyCity mobile demo — empowering fast civic reporting 🏙️</em>
</div>

## Screenshots

<img width="100" height="200" alt="IMG_4205" src="https://github.com/user-attachments/assets/caa73791-b08e-4677-b34b-cfd9974cfa0b" />

<img width="100" height="200" alt="IMG_4206" src="https://github.com/user-attachments/assets/9bf40abe-1120-4e38-b193-ae5e4ab3c639" />

<img width="100" height="200" alt="IMG_4210" src="https://github.com/user-attachments/assets/77a6104e-ebe8-4e7d-a8eb-12aba4710898" />

<img width="100" height="200" alt="IMG_4211" src="https://github.com/user-attachments/assets/ddd4bcc3-c54e-470b-975f-75aa7f51b1a0" />





## 📱 Features

- 📍 Report civic issues with location and image
- 📝 Submit descriptions for better clarity
- 📡 Real-time data sync via Firebase
- 🗺️ Future roadmap includes map view & filtering
- 🔐 Secure authentication with Google login (Firebase)

---

## 🚀 Tech Stack

### Mobile App
- **React Native (Expo)** – Cross-platform mobile development
- **Firebase Authentication** – Google login & user auth
- **React Navigation** – Seamless screen transitions
- **Expo Image Picker & Location** – Capture issue media and GPS

### Backend
- **Node.js + Express** – REST API to receive issue reports
- **Prisma ORM** – Type-safe database queries
- **PostgreSQL** – Relational database for issue storage
- **Railway** – Backend & database hosting platform

---

## 🔧 Project Structure

```bash
fixmycity-mobile/
│
├── App.tsx                # Entry point for mobile app
├── navigation/            # Navigation stack
├── screens/               # Screens: Home, Report, Success
├── components/            # Reusable UI components
├── api/                   # API endpoints for backend interaction
├── firebase/              # Firebase auth configuration
└── assets/                # Icons, images, fonts
```

🌐 Deployment
Mobile App

    Hosted using Expo

    Public preview available via Expo Go:
    📱 Click here to open the app
    (Scan QR with Expo Go app or Camera)

Backend

    API hosted on Railway

    Environment variables managed securely through .env and Railway Dashboard

✅ How to Use

1. Clone the repo:
```bash
git clone https://github.com/rituraj-gharat/fixmycity-mobile.git
cd fixmycity-mobile
```
2. Install dependencies:
```bash
npm install
```
3. Start the Expo app:
```bash
npx expo start --tunnel
```
4. Set up Firebase Auth and Railway DB using .env file.

🛤 Roadmap

    🔍 Filter issues by category/date

    🗺️ Map view for reported issues

    🔔 Push notifications for updates

    🛠️ Admin dashboard for city staff

## 📱 Scan to Try It Out

Scan the QR code below using the **Expo Go** app:

![QR Code](./assets/QR.png)

🙌 Acknowledgements

    Expo

    Firebase

    Railway

    Prisma

  📬 Contact

Rituraj Gharat
📧 rgharat1@asu.edu | riturajgharat.14@gmail.com
🌐 [LinkedIn](https://www.linkedin.com/in/riturajgharat/) | [GitHub](https://github.com/rituraj-gharat)

Feel free to ⭐ this repo if you found it helpful!

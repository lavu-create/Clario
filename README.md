# 🌤️ Clario – All-in-One Productivity & Wellness Dashboard

> ⚡️ Built for WCHL Hackathon 2025 – Enhancing the Quality of Life for Ventilated Patients  
> 👩‍💻 By Team Clario: Lavanya · Akhil · Nitesh · Vaishnavi

---

## 🧠 The Problem We're Solving

Ventilated patients often face challenges like disrupted daily routines, emotional isolation, and limited autonomy. Caregivers also struggle with monitoring day-to-day well-being remotely.

**Clario** bridges this gap by providing a beautiful, responsive, all-in-one dashboard that supports:

- **Task organization**  
- **Mood and health logging**  
- **Reminder alerts**  
- **Weather-aware planning**  
- **Data visualization for progress tracking**

---

## 🌟 Key Highlights

- 📅 **Smart Calendar** – Organize and view daily events  
- ✅ **Task Manager** – Add, complete, and filter tasks  
- ⏰ **Reminders** – Ringing alerts with visual cue (bell) and online sounds  
- 📝 **Sticky Notes** – Drag and drop idea pads  
- 😊 **Mood Tracker** – Log feelings with emoji & notes  
- 📊 **Data Visualization** – Analyze habits, moods, and task stats  
- 🌤️ **Live Weather** – Auto or manual location-based weather insights  
- 🔐 **Authentication** – Secure sign-up/login using JWT  
- 🎨 **Theme Toggle** – Light and Dark mode  
- 📱 **Responsive UI** – Works beautifully across devices  
- 💾 **Data Export / Reset** – Backup or clean with one click  

---

## 🩺 Why It Matters

For ventilated patients and their caregivers, Clario:

- Builds **daily structure and mental clarity**  
- Enables **safe, weather-informed planning**  
- Offers **emotional awareness** through visual mood history  
- Empowers **caregiver collaboration**  
- Works **offline-first** with local caching  

---

## 🧰 Tech Stack

| Layer          | Technologies                                |
|----------------|---------------------------------------------|
| Frontend       | HTML, CSS, JavaScript                       |
| Backend        | Node.js, Express.js                         |
| Auth           | JWT, bcrypt                                 |
| Data Storage   | MongoDB or JSON fallback + LocalStorage     |
| Charts         | Chart.js                                    |
| Notifications  | Web Audio API with online sound             |
| Weather API    | OpenWeatherMap                              |
| Deployment     | GitHub Pages (frontend) + Render (backend)  |

---

## 🚀 Getting Started

### 🖥️ Frontend

```bash
cd clario/frontend  
open index.html   # or open manually in browser
```

### 🔧 Backend

```bash
cd clario/backend  
npm install  
node app.js
```

Backend runs at: `http://localhost:3000`

---

## 🔐 Auth Flow

1. Users sign up with email and password  
2. Passwords are securely hashed using `bcrypt`  
3. On login, a JWT token is issued  
4. Protected routes require valid token  
5. Token stored in `localStorage` for session persistence  

---

## 📊 Data Visualization (by Vaishnavi)

Interactive charts to display:

- Task completion rates  
- Emoji-based mood trends  
- Event frequency and productivity spikes  

---

## 📁 Project Structure

```
clario/  
├── frontend/       → Complete UI (HTML, CSS, JS)  
├── backend/        → Express APIs and server logic  
├── auth/           → Signup/Login, JWT handling  
├── data-viz/       → Mood & task analytics (Chart.js)  
├── assets/         → Icons, sounds, images  
├── README.md
```

---

## 🧑‍💻 Team Clario

| Name       | Role               | Contribution                            |
|------------|--------------------|-----------------------------------------|
| Lavanya    | Frontend Lead      | UI, live clock, reminders, weather UI   |
| Akhil      | Backend & DB       | REST APIs, task/event data persistence  |
| Nitesh     | Auth & Integration | JWT login/signup, system architecture   |
| Vaishnavi  | Data Visualization | Mood and task analytics (Chart.js)      |

---

## 🌱 Git Workflow

```bash
git clone https://github.com/your-username/clario.git  
cd clario  
git checkout -b feature/your-feature-name  
# Make changes  
git add .  
git commit -m "Added new feature"  
git push origin feature/your-feature-name
```

---

## 🛠️ Future Enhancements

- 🎙️ Voice-based reminders  
- 🧠 AI-based mood prediction  
- 👥 Caregiver-patient sync calendar  
- 📲 Mobile app via React Native or Flutter  
- 🧭 PWA support with offline-first capability  

---

## 📸 Screenshots (To Add)

> Insert UI screenshots, bell reminder alert, and mood graphs here.

---

## 📜 License

MIT License – Free to use, adapt, and contribute. Please credit the creators.

---

> Clario isn’t just a productivity tool — it’s a daily companion for those who need routine, care, and calm.  
> Designed with empathy. Built for impact. 💙

# 🌤️ Clario – All-in-One Productivity & Wellness Dashboard

> ⚡️ Built for WCHL Hackathon 2025 – Enhancing Productivity & Well-being for Everyone 
> 👩‍💻 By Team Clario: Lavanya · Nitesh

---

## 🧠 The Problem We're Solving
In today’s fast-paced world, individuals often struggle to stay organized, maintain emotional balance, and keep track of personal growth. Juggling tasks, moods, and daily plans can feel overwhelming without a centralized system.

Clario solves this by offering a sleek, responsive, all-in-one dashboard that helps you:
- ✅ Stay on top of tasks and events
- 😊 Track moods and emotional well-being
- 🔔 Set smart reminders to stay focused
- 🌤️ Plan ahead with live weather updates
- 📊 Visualize your habits and productivity trends

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

## 💡 Why It Matters

- Clario helps you take control of your day and well-being by:
- Creating daily structure and mental clarity
- Supporting smart planning with weather insights
- Building emotional awareness through mood tracking
- Encouraging productive habits with visual data  

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
├── frontend/           → Complete UI (HTML, CSS, JS)  
│   └── assets/         → Icons, sounds, images (used in frontend)
├── backend/            → Express APIs and server logic  
├── auth/               → Signup/Login, JWT handling  
├── data-viz/           → Mood & task analytics (Charts)
├── README.md           → Project overview and documentation  
├── LICENSE             → MIT License or other (open source license)

```

---

## 🧑‍💻 Team Clario

| Name       | Role                                | Contribution                                                   |
|------------|-------------------------------------|----------------------------------------------------------------|
| Lavanya    | Frontend, Data Visualization (Lead) | UI, live clock, reminders, weather UI, Mood and task analytics |
| Nitesh     | Backend, Database & Authentication  | REST APIs, task/event data persistence, JWT login/signup       |

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

> Clario isn’t just a productivity tool — it’s your personal space to stay organized, motivated, and mindful.
> Thoughtfully crafted. Purposefully built. ✨

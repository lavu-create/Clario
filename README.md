# Clario – All-in-One Productivity Dashboard

Clario is your ultimate productivity and wellness dashboard — a beautifully designed, fully functional web application that helps users manage tasks, track events, log moods, take quick notes, and visualize their personal data.

> Built with passion and precision for Hackathon 2025!

---

## Highlights

- **Smart Task Manager** – Add, complete, and filter tasks by status (All / Pending / Completed)
- **Interactive Calendar** – Add, view, and delete events with a full or mini view
- **Sticky Notes** – Jot down ideas and drag/drop them anywhere on your board
- **Mood Tracker** – Select emoji-based moods and write reflections each day
- **Data Visualization** – Analyze task stats and emotional trends using dynamic charts
- **Theme Switcher** – Toggle between Light/Dark modes with one click
- **Profile Personalization** – Upload your photo and edit your display name
- **Authentication** – Secure login/signup with token-based sessions (JWT)
- **Data Reset & Export** – Export everything to JSON or reset with a single click
- **Responsive UI** – Fully optimized for desktop, tablet, and mobile

---

## Tech Stack

- HTML, CSS, JavaScript
- Node.js, Express.js
- JWT, bcrypt
- Chart.js
- LocalStorage + MongoDB (or JSON file fallback)
- Deployed via GitHub Pages and Render

---

## Project Structure

```
clario/
├── frontend/       → Complete UI (HTML, CSS, JS)
├── backend/        → API and server logic
├── auth/           → Login, signup, JWT handling
├── data-viz/       → Charts and analytics
├── assets/         → Icons and images
├── README.md
```

---

## How to Run

### Frontend

```bash
cd clario/frontend
open index.html   # Or open manually in a browser
```

### Backend

```bash
cd clario/backend
npm install
node app.js
```

API will run on `http://localhost:3000` (or your configured port)

---

## Auth Flow

1. New users can **sign up**
2. Passwords are **hashed with bcrypt**
3. Upon login, a **JWT token** is issued
4. Protected routes are accessible only with valid tokens
5. Tokens stored in **localStorage**

---

## Data Visualization

Visual dashboards show:

- Completed vs. Pending tasks
- Mood trends (emoji frequency)
- Event density over time

Charts are dynamically generated using Chart.js.

---

## Team Clario

- Lavanya – Frontend UI & Project Lead
- Akhil – Backend & REST APIs
- Vaishnavi – Data Visualization & Charts
- Nitesh – Authentication & Full Stack Support

---

## Git Workflow

1. Clone the project:

```bash
git clone https://github.com/your-username/clario.git
cd clario
```

2. Create a branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit and push:

```bash
git add .
git commit -m "Added new feature"
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub and merge after review

---

## Why Clario Stands Out

- Combines productivity + mental wellness in one clean dashboard
- Fully modular and scalable structure
- Built with real-world Git workflows
- Secure, user-first authentication
- Mobile-responsive and fast-loading
- Personalized visual insights to boost performance
- Designed with attention to UX and aesthetic detail

---

## License

MIT License – Free to use, modify, and expand. Please give credit when sharing.

---

> Clario isn’t just a productivity tool — it’s your daily dashboard for getting things done, staying balanced, and feeling great.

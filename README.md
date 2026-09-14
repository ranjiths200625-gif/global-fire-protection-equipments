# GLOBAL FIRE PROTECTION EQUIPMENTS — MERN Business Website

Production-ready, full-stack MERN business web platform for **GLOBAL FIRE PROTECTION EQUIPMENTS** (Kadalaur Road, Kovilpatti, Tamil Nadu).

---

## 🚀 How to Run in Visual Studio Code

### Step 1: Open the Project Folder
1. Launch **Visual Studio Code**.
2. Go to **File > Open Folder...** and select `e:\p1` (or your project directory).

---

### Step 2: Open Integrated Terminal in VS Code
Open a new integrated terminal by pressing:
- **`Ctrl + \``** (Backtick) or go to **Terminal > New Terminal**.

---

### Step 3: (Optional First Time) Seed Initial Data
Ensure MongoDB is running locally (or via MongoDB Atlas / Compass), then run:
```bash
cd server
npm run seed
```
> **Default Admin Credentials**:
> - **Email**: `admin@globalfire.com`
> - **Password**: `Admin@12345`

---

### Step 4: Run the Backend & Frontend

#### Method A: Split Terminal (Recommended in VS Code)
1. In **Terminal 1** (Backend):
   ```bash
   cd server
   npm run dev
   ```
   *Express server will start on `http://localhost:5000`*

2. Click the **`+`** (Split / New Terminal) icon to open **Terminal 2** (Frontend):
   ```bash
   cd client
   npm run dev
   ```
   *Vite React frontend will start on `http://localhost:5173`*

3. Open **`http://localhost:5173`** in your browser.

---

## 🔑 Key URLs

| Page | URL | Description |
|---|---|---|
| **Public Website** | `http://localhost:5173/` | Hero, Products, Services, Operation Guide, Gallery, Contact |
| **Admin Login** | `http://localhost:5173/admin/login` | Secure JWT Login Portal |
| **Admin Dashboard** | `http://localhost:5173/admin` | Enquiry metrics, inventory & settings management |
| **Backend Health Check** | `http://localhost:5000/api/health` | REST API Health endpoint |

---

## 🛡️ Strict Legal / Claim Safety Compliance
- **Zero unverified certificates or fake badges**: No BIS, ISI, ISO, or Government approvals are assumed or claimed.
- **Truthful wording**: "Fire Protection Equipment & Services" in Kovilpatti.
- **Configurable Contact**: Phone, WhatsApp, and Google Maps are managed via Admin Settings in MongoDB.

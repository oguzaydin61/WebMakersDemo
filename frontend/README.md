# Full-Stack Headless CMS Portfolio Project

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![WordPress](https://img.shields.io/badge/WordPress-%23117AC9.svg?style=for-the-badge&logo=WordPress&logoColor=white)
![Pantheon](https://img.shields.io/badge/Pantheon-F2E52F.svg?style=for-the-badge&logo=Pantheon&logoColor=black)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 📌 Project Overview
This project is a high-performance, Full-Stack Headless CMS portfolio application. It demonstrates modern web development practices by decoupling the backend content management system from the frontend presentation layer. The backend relies on a custom WordPress setup with bespoke PHP plugins, while the frontend is a blazing-fast React application deployed via Vercel.

## 🛠 Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling & Components:** CSS / Swiper.js for responsive sliders
- **Deployment:** Vercel

### Backend
- **CMS:** Headless WordPress
- **Hosting:** Pantheon.io
- **Customization:** Custom Post Types (CPT), Advanced Custom Fields (ACF), Custom PHP Plugin

---

## 🏗 Architecture & Backend Setup

### 1. Headless CMS Infrastructure (WordPress & Pantheon)
The backend database and Content Management System (CMS) are entirely powered by WordPress. The production backend is successfully deployed on **Pantheon.io** (`dev-oguzaydin61.pantheonsite.io`), a professional, developer-focused cloud hosting environment. This environment completely eliminates CORS and server-side restrictions commonly associated with headless setups.

### 2. Custom Post Types & ACF Integration
Content modeling on the WordPress side is highly customized:
- A Custom Post Type named **"vehicles"** is registered.
- Using **ACF (Advanced Custom Fields)**, dynamic fields are defined for each vehicle entry:
  - `brand` (Text)
  - `model` (Text)
  - `engine_type` (Select: diesel/gasoline)
  - `price` (Number)
  - `rating` (Number)
  - `vehicle_image` (Image ID/URL)

The React frontend dynamically consumes this data through the standard WP REST API (`https://dev-oguzaydin61.pantheonsite.io/wp-json/wp/v2/vehicles?per_page=100`). Images are resolved asynchronously using the WordPress media endpoints.

### 3. Custom PHP API & Form Management (Kontaktanfragen)
Heavy reliance on external form plugins (like Contact Form 7 or WPForms) has been completely eliminated. 
- Developed a completely custom, lightweight PHP plugin from scratch (`backend-plugin/henning-contact-api.php`).
- It registers a secure, custom POST endpoint to the WordPress REST API: `wp-json/custom/v1/contact`.
- When a user submits the lead generation / acquisition form (*Ankauf Form*) on the React frontend, the payload is securely POSTed here.
- The custom PHP logic handles **server-side data validation, sanitization, and security checks**, including verifying the mandatory GDPR/Datenschutz compliance checkbox.
- Upon successful validation, it stores the submission directly into the WordPress database under a custom post type called **"Kontaktanfragen"** (Contact Requests), which neatly lists them in the WP Admin dashboard.

### 4. Frontend Architecture & Deployment
The frontend uses a modern React component architecture featuring:
- Responsive slider components using **Swiper.js**.
- Efficient client-side dynamic filtering systems.
- The project is logically structured to maintain frontend logic alongside the backend plugin references. 
- **Production Deployment** is handled via **Vercel**, pointing directly to the frontend root directory for automated CI/CD builds.

---

## 📡 API Documentation

The React application interfaces with the following WordPress REST API endpoints:

### GET `/wp-json/wp/v2/vehicles`
Fetches the list of vehicles and their custom ACF fields.
- **Parameters:** `?per_page=100`
- **Response:** JSON array of vehicle objects including `brand`, `model`, `engine_type`, `price`, and `rating`.

### GET `/wp-json/wp/v2/media/{id}`
Resolves vehicle images asynchronously using the associated Image ID.

### POST `/wp-json/custom/v1/contact`
Handles form submissions from the *Ankauf Form*.
- **Method:** POST
- **Payload:**
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "message": "string",
    "gdpr_consent": true
  }
  ```
- **Description:** Validates and sanitizes the input, verifies GDPR consent, then creates a "Kontaktanfragen" post in WordPress.

---

## 📂 Project Structure

```text
├── README.md               # Project documentation
├── backend-plugin/         # (Contextual) Custom PHP plugin for forms
│   └── henning-contact-api.php
├── frontend/               # Root for Vercel deployment (React App)
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite build configuration
│   ├── public/             # Static assets
│   └── src/
│       ├── api/            # API utility functions (WP REST integration)
│       ├── assets/         # Images, global CSS
│       ├── components/     # React components (Sliders, Forms, Filters)
│       ├── App.jsx         # Main application component
│       └── main.jsx        # Entry point
```

---

## 🚀 Installation & Setup

### Frontend Setup (Local Development)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Backend Setup (WordPress)
If you wish to replicate the backend locally or on a new server:
1. Install WordPress and configure your database.
2. Register the Custom Post Types: `vehicles` and `Kontaktanfragen`.
3. Install and activate **Advanced Custom Fields (ACF)**, and import the vehicle field groups.
4. Upload and activate the custom plugin `henning-contact-api.php` into `wp-content/plugins/` to enable the `/wp-json/custom/v1/contact` REST route.

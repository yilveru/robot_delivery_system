# 🤖 Robot Delivery System

## 🧾 Overview

This is a robot-based delivery management system built with **Next.js**, **PostgreSQL**, and **Drizzle ORM**. The system enables managing clients, restaurants, delivery robots, and the entire order lifecycle—from creation to completion.

---

## 🧑‍💻 Application Usage

The application currently has **two main modules**:

### 1. 🗂️ Dashboard (Orders)

- Displays a **table of orders** with key information for each.
- Each row includes two main actions:
  - **Assign Robot**: Only available if there are robots with `available` status.
  - **Update Status**: You cannot change the status from `pending` to `assigned` unless a robot has been assigned.
- There is a **button outside the table** to **create new orders**:
  - Opens a **form inside a modal**.
  - Allows you to select a client and a restaurant.
  - You can **dynamically add items** to the order.

### 2. 🤖 Robot Management

- Displays a **table of robots** with their current data and status.
- Each robot row includes an **edit action**:
  - You can update the `robot_id` (name) and its status (`available`, `busy`, etc.).
- There is a **button outside the table** to **create new robots**:
  - A random `robot_id` is generated automatically.
  - The initial status for a new robot is set to `available`.

---

## 🧠 Design Choices & Rationale

### Frameworks & Libraries

- **Next.js 15** – Modern full-stack framework with App Router support.
- **Drizzle ORM** – Type-safe, SQL-friendly ORM with good developer ergonomics.
- **PostgreSQL** – Robust open-source relational database.
- **TailwindCSS** – For rapid and responsive UI styling.
- **Docker Compose** – To containerize and manage the PostgreSQL database locally.

### Architecture

- Modular folder structure under `app/`, following Next.js 15 best practices.
- REST API routes under `app/api/` for CRUD and status updates.
- UI separated into components (`/components`) with reusable form and layout elements.
- Backend data interactions abstracted through `db/schema.ts` and Drizzle queries.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yilveru/robot_delivery_system.git
cd robot_delivery_system
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=robot_delivery_db
DB_USER=robot_delivery_user
DB_PASS=deliverypassword
```

### 3. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

### 4. Run the application

```bash
npm install
npm run dev
```

The app will be running at: [http://localhost:3000](http://localhost:3000)

### 5. Run the database migrations and seed data

```bash
npx drizzle-kit push
npm run db:drizzle-seed
```
The seed script will create a random clients and restaurants for you.

---

## 🚀 Deployment

This app is deployed on **Render.com**, which hosts both the web app and a managed PostgreSQL database.

- **Frontend URL**: [https://robot-delivery-system.onrender.com](https://robot-delivery-system.onrender.com)
- **Database**: Managed PostgreSQL instance on Render

> You can deploy it yourself by connecting the repo to Render and setting up a Web Service + PostgreSQL instance.

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/yilveru/robot_delivery_system](https://github.com/yilveru/robot_delivery_system)
- **Live Application**: [https://robot-delivery-system.onrender.com](https://robot-delivery-system.onrender.com)

---

## 📄 License

MIT License © Yilver Andres Uran
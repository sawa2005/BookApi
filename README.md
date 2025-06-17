# 📚 Book App

A full-stack web application to register, log in, and manage books.  
Built with Angular 18 (frontend) and ASP.NET Core 8 Web API (backend), using JWT authentication and SQLite.

## 📁 Project Structure

```
BookApi/
├── client/         # Angular frontend
├── server/         # .NET 8 Web API backend
```

## 🚀 Getting Started

### 🔧 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli)
- [SQLite](https://www.sqlite.org/)

## 🔙 Backend Setup (ASP.NET Core)

1. Navigate to the server folder:

```bash
cd BookApi/server
```

2. Restore dependencies & apply database migrations:

```bash
dotnet restore
dotnet ef database update
```

3. Set your JWT secret (for development):

```bash
# Windows (CMD)
set JWT_SECRET=YourSecretKeyHere

# macOS/Linux
export JWT_SECRET=YourSecretKeyHere
```

4. Run the API:

```bash
dotnet run
```

> Default port: `https://localhost:5001`

## 💻 Frontend Setup (Angular)

1. Navigate to the client folder:

```bash
cd BookApi/client
```

2. Install dependencies:

```bash
npm install
```

3. Set the API base URL in `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

4. Run the Angular dev server:

```bash
ng serve
```

> Visit: `http://localhost:4200`

## 🌐 Deployment (Render)

Deploy **client** and **server** separately as web services on [Render](https://render.com).

### Server:

- Add an environment variable in the Render dashboard:  
  `JWT_SECRET=YourSecretKeyHere`

### Client:

- Update `environment.prod.ts`:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://<your-api-service>.onrender.com/api'
};
```

- Make sure CORS is enabled in the backend for both localhost and the deployed frontend origin.

## 🔐 Features

- JWT Authentication (Login/Register)
- SQLite for persistence
- Angular forms for auth and book input
- Protected routes and API endpoints

## 🛠 Technologies

- Angular 18
- ASP.NET Core 8
- Entity Framework Core
- JWT Authentication
- SQLite
- Bootstrap 5 + Font Awesome

## 📃 License

This project is open-source and free to use.

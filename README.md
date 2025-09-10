# 🍿 Movies consuming API - React App

This is a web application built with **React**, **TypeScript**, **TailwindCSS**, **Axios**, **Forebase**, **Tanstack** that allows users to view movies, deatils of the mvies and actosalso details of them. 
---

## 🚀 Demo

![App Demo](./public/app-prewiew.gif)

---

## 🛠️ Technologies Used

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat-square)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)
- ![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white&style=flat-square)
- ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router&logoColor=white&style=flat-square)
- ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white&style=flat-square)
- ![TanStack Query](https://img.shields.io/badge/-TanStack%20Query-FF4154?logo=reactquery&logoColor=white&style=flat-square)

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BauveR/sprint-7-movies-.git

cd sprint-7-movies
npm install
npm run dev

```

## 🧪 Run Tests
To execute all tests:
npm run test

Or in watch mode:
npx vitest --watch

If you need to manually install testing dependencies:

npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom


## 📁 Project Structure





## ✅ Features

Login or register to
Explore & view movie, cast, actor details 


### 🤝 Contributions

Contributions are welcome.

## ⏳ Project Status

Project developed as part of a React and web design learning exercise 
The folder organization and document arrangement will be enhanced.




src/
├─ app/
│  ├─ providers/
│  │  └─ DataServiceProvider.tsx
│  └─ main.tsx
├─ shared/
│  └─ axios.ts                # baseURL:'/api' (hablando con tu guard)
├─ features/
│  ├─ movies/
│  │  ├─ types.ts
│  │  ├─ hooks.ts             # usa el servicio (no axios)
│  │  └─ service.ts           # interfaz + shape del servicio
│  └─ persons/
│     ├─ types.ts
│     └─ hooks.ts
├─ infrastructure/
│  └─ tmdbService.ts          # implementación concreta del servicio
└─ App.tsx

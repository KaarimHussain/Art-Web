# 🎨 Artify - Art Selling Platform

Welcome to **Artify**, a full-stack Art Selling Website designed to connect **talented artists** with **passionate buyers**. This platform supports artwork discovery, secure purchases, artist commissions, and more — all wrapped in a modern, mobile-responsive UI with a powerful backend.

========================================

## 🌐 Tech Stack

- **Frontend**: [Angular](https://angular.io/) (TypeScript, SCSS, RxJS)
- **Backend**: [ASP.NET Core Web API](https://dotnet.microsoft.com/en-us/apps/aspnet) (C#, RESTful API)
- **Database**: [SQL Server](https://www.microsoft.com/en-us/sql-server)
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe & PayPal
- **Performance Optimization**: [Redis](https://redis.io/) (Caching, lazy loading, lazy loading)
- **Hosting (suggested)**: Azure / AWS / Vercel / Netlify

## 📦 Features

### 👤 User Module

- **Artist & Buyer Registration** (with role-based access)
- Secure Login / Logout with **JWT**
- **Profile management**: Bio, profile picture, social links

### 🖼️ Artwork Module

- Upload **artwork images** with titles, descriptions, prices
- Add **categories, tags**, and **filter/search** support
- **Zoom-in gallery** for high-res images
- Artwork detail page with purchase or commission options

### 🛒 E-commerce System

- **Shopping cart**: Add/remove artworks
- **Secure checkout** with payment integration (Stripe, PayPal)
- View order history and invoice

### 💼 Commission System

- Artists can accept **custom commission requests**
- Buyers can request, negotiate, and track commissions
- Status tracking (e.g., Pending, Accepted, In Progress, Completed)

### 🔧 Admin Panel

- Dashboard for site metrics and summaries
- Manage users (ban/approve)
- Moderate artwork listings
- View reported content
- Control featured artwork, categories, tags

### 💬 Optional Features

- **Live Chat** between buyers and artists
- **Rating/Review system** for artwork & commissions
- **Art Advisory Tools** (AI-curated suggestions, style match, etc.)


## 📱 Mobile Support

- Fully **responsive** design for all screen sizes
- Optimized touch interactions for mobile UX

## 🔍 SEO Optimization

- Meta tags for each artwork
- Canonical URLs
- Server-side rendering (if using Angular Universal)
- Sitemap.xml and robots.txt support

## 📁 Project Structure (Suggested)

### Backend – ASP.NET Core API

Artify.Api/
│
├── Controllers/
│ └── UsersController.cs
│ └── ArtworksController.cs
│ └── AdminController.cs
│
├── Models/
│ └── User.cs
│ └── Artwork.cs
│ └── Order.cs
│
├── Services/
│ └── AuthService.cs
│ └── PaymentService.cs
│
├── Data/
│ └── ApplicationDbContext.cs
│
├── DTOs/
│ └── UserDto.cs
│ └── ArtworkDto.cs
│
└── Program.cs / Startup.cs

### Frontend – Angular

artify-frontend/
│
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ └── navbar/, artwork-card/, cart/, chat/
│ │ ├── pages/
│ │ │ └── home/, profile/, artwork-detail/, checkout/, admin/
│ │ ├── services/
│ │ │ └── auth.service.ts, artwork.service.ts, payment.service.ts
│ │ └── models/
│ │ └── user.model.ts, artwork.model.ts
│ └── assets/
│ └── images/, icons/



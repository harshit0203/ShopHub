<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Zustand-5-orange?style=for-the-badge" alt="Zustand" />
</div>

<br />

<div align="center">
  <h1>🛒 ShopHub</h1>
  <p><strong>An e-commerce storefront built with Next.js 15, TypeScript, and TailwindCSS</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Project Structure</a>
  </p>
</div>

<br />

---

## ✨ Features

<table>
  <tr>
    <td>
      <h3>🏠 Product Listing</h3>
      <ul>
        <li>Grid layout with elegant product cards</li>
        <li>Real-time search with debouncing</li>
        <li>Category filtering</li>
        <li>Price sorting (low to high / high to low)</li>
        <li>Pagination & Infinite scroll toggle</li>
      </ul>
    </td>
    <td>
      <h3>🛍️ Shopping Cart</h3>
      <ul>
        <li>Add/remove products</li>
        <li>Quantity controls (+/-)</li>
        <li>Persistent cart (localStorage)</li>
        <li>Real-time cart badge</li>
        <li>Order summary with shipping calculation</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📦 Product Management</h3>
      <ul>
        <li>View product details</li>
        <li>Create new products</li>
        <li>Edit existing products</li>
        <li>Delete with confirmation modal</li>
        <li>Client-side CRUD (localStorage)</li>
      </ul>
    </td>
    <td>
      <h3>🎨 UI/UX</h3>
      <ul>
        <li>Dark/Light theme toggle</li>
        <li>Smooth animations (Framer Motion)</li>
        <li>Glassmorphism header</li>
        <li>Loading skeletons</li>
        <li>Responsive design</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🎬 Demo

### Product Listing
- Browse 20+ products from [Fake Store API](https://fakestoreapi.com/)
- Search, filter by category, and sort by price
- Toggle between pagination and infinite scroll

### Shopping Flow
1. **Browse** → Add products to cart from cards or detail page
2. **Cart** → Adjust quantities, view order summary
3. **Checkout** → Review order and confirm purchase
4. **Success** → Confetti celebration! 🎉

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS 4](https://tailwindcss.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query/) (React Query) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **API** | [Fake Store API](https://fakestoreapi.com/) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/harshit0203/ShopHub.git

# Navigate to project directory
cd ShopHub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
shophub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home - Product listing
│   │   ├── cart/               # Shopping cart page
│   │   ├── checkout/           # Checkout page
│   │   ├── order-success/      # Order confirmation
│   │   └── products/
│   │       ├── create/         # Create product form
│   │       └── [id]/           # Product detail & edit
│   │
│   ├── components/
│   │   └── ui/                 # Reusable UI components
│   │       ├── ProductCard.tsx
│   │       ├── CartIcon.tsx
│   │       ├── SearchBar.tsx
│   │       ├── CategoryFilter.tsx
│   │       ├── SortSelect.tsx
│   │       ├── ViewToggle.tsx
│   │       ├── Pagination.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── ConfirmModal.tsx
│   │       ├── Skeleton.tsx
│   │       └── ErrorState.tsx
│   │
│   ├── lib/
│   │   ├── api.ts              # API service functions
│   │   └── schemas.ts          # Zod validation schemas
│   │
│   ├── providers/
│   │   ├── QueryProvider.tsx   # React Query provider
│   │   ├── ThemeProvider.tsx   # Dark/Light theme
│   │   └── ProductsProvider.tsx # Local product CRUD
│   │
│   ├── store/
│   │   └── cart.ts             # Zustand cart store
│   │
│   └── types/
│       └── index.ts            # TypeScript interfaces
│
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 🔑 Key Features Explained

### 🌓 Theme Toggle
The app supports dark and light themes with smooth transitions. Theme preference is saved in localStorage.

### 🔄 View Mode Toggle
Switch between:
- **Pagination** - Traditional page-by-page navigation
- **Infinite Scroll** - Automatically loads more products as you scroll (using IntersectionObserver)

### 🛒 Cart Persistence
Cart state is managed with Zustand and automatically persisted to localStorage, so items remain even after page refresh.

### ✏️ Local Product Management
Create, edit, and delete your own products. These are stored in localStorage and appear alongside API products with a "NEW" badge.

---

## 📝 API Reference

This project uses the [Fake Store API](https://fakestoreapi.com/):

| Endpoint | Description |
|----------|-------------|
| `GET /products` | Fetch all products |
| `GET /products/:id` | Fetch single product |
| `GET /products/categories` | Fetch all categories |
| `POST /products` | Create product (simulated) |

---

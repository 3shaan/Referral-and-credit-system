# 🚀 Referral and Credit System

A full-stack web application where users can register, share referral links, and earn credits when their referred users sign up and make purchases. Both the referrer and the referred user receive **2 credits** on the first purchase.

🔗 **Live Demo:** [Frontend](https://referral-and-credit-system-web.onrender.com/) | [Backend](https://referral-and-credit-system.onrender.com/)
📘 **API Docs:** [Swagger Documentation](https://referral-and-credit-system.onrender.com/api-docs)

---

## 🧠 Overview

This project implements a **referral-based credit reward system** using a modern full-stack setup.
Built with **TurboRepo**, the monorepo structure contains both the frontend and backend apps, as well as a shared validation package using **Zod**.

---

## 🏗️ Tech Stack

**Frontend:** [Next.js](https://nextjs.org/)
**Backend:** [Express.js](https://expressjs.com/) + [MongoDB](https://www.mongodb.com/)
**Validation:** [Zod](https://zod.dev/) (in a shared package)
**Monorepo Management:** [Turborepo](https://turbo.build/repo)
**Package Manager:** [pnpm](https://pnpm.io/)

---

## 🧩 Project Structure

```
Referral-and-credit-system/
├── apps/
│   ├── api/     # Express.js backend
│   └── web/     # Next.js frontend
└── packages/
    └── validations/  # Shared Zod validation schemas
```

---

## ⚙️ Environment Variables

### Backend (`apps/api/.env`)
```env
NODE_ENV=development
PORT=8080
LOG_LEVEL=
MONGO_URI=
JWT_SECRET=
API_URL=https://referral-and-credit-system.onrender.com
```

### Frontend (`apps/web/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

> ⚠️ **Note:** Replace sensitive credentials (like `MONGO_URI` and `JWT_SECRET`) with your own secure values before deployment.

---

## 🧑‍💻 Development

### Install dependencies
```bash
pnpm install
```

### Run all apps in development mode
```bash
pnpm dev
```

### Run a single app
```bash
pnpm dev --filter=web      # Run only frontend
pnpm dev --filter=api      # Run only backend
```

### Build and start
```bash
pnpm build
pnpm start
```

---

## 📜 API Documentation

The backend exposes a detailed Swagger UI for testing and exploring API endpoints.

**📍 URL:** [https://referral-and-credit-system.onrender.com/api-docs](https://referral-and-credit-system.onrender.com/api-docs)

---

## 📜 Backend Diagram

```mermaid
classDiagram
    class ExpressApp {
        +createServer()
        +bootstrap()
        +setupMiddleware()
        +setupRoutes()
        +start()
    }
    
    class MongoDB {
        +connectDB()
        +mongoose: Connection
    }
    
    class RouteTree {
        +rootRouter(app)
        +registerRoutes()
    }
    
    class UserRoute {
        +GET /me
        +GET /users
        +POST /users
        +GET /users/:id
    }
    
    class AuthRoute {
        +POST /auth/login
        +POST /auth/register
        +POST /auth/refresh-token
        +GET /auth/logout
    }
    
    class OrderRoute {
        +POST /order
    }
    
    class ProductRoute {
        +GET /product
        +POST /product
        +GET /product/:id
        +PATCH /product/:id
        +DELETE /product/:id
    }
    
   
    
    class UserController {
        +getAllUsers()
        +createUser()
        +me()
        +getUserByIdWithReferrerData()
    }
    
    class AuthController {
        +login()
        +register()
        +accessTokenRevalidate()
        +logout()
    }
    
    class OrdersController {
        +createOrder()
    }
    
    class ProductController {
        +createProduct()
        +findAllProducts()
        +findProductById()
        +updateProduct()
        +deleteProduct()
    }
    
    class UserService {
        +findAll()
        +findById()
        +findByEmail()
        +findByUserName()
        +create()
        +register()
        +updateById()
        +updateRefreshToken()
        +removeRefreshToken()
        +findOneByIdWithReferrer()
    }
    
    class AuthService {
        +register()
        +validateUser()
        +login()
        +generateAccessToken()
        +generateRefreshToken()
        +revalidateAccessTokenByRefreshToken()
        +logout()
    }
    
    class OrderService {
        +findAll()
        +create()
    }
    
    class ProductService {
        +findAll()
        +findOne()
        +create()
        +update()
        +delete()
    }
    
    class ReferralService {
        +findAll()
        +createReferral()
    }
    
    class BaseController {
        +bindAllMethods()
        +wrapMethod()
    }
    
    class BaseService {
        +bindAllMethods()
    }
    
    class UserModel {
        +name: String
        +email: String
        +mobile: String
        +password: String
        +refreshToken: String
        +userName: String
        +referredBy: String
        +stats: Object
        +credit: Number
        +timestamps: true
    }
    
    class OrderModel {
        +userId: ObjectId
        +amount: Number
        +isFirstOrder: Boolean
        +status: String
    }
    
    class OrderItemModel {
        +orderId: ObjectId
        +productId: ObjectId
        +quantity: Number
        +price: Number
    }
    
    class ProductModel {
        +name: String
        +description: String
        +category: String
        +price: Number
        +image: String
        +timestamps: true
    }
    
    class ReferralModel {
        +referrerId: ObjectId
        +referredId: ObjectId
        +status: String
        +timestamps: true
    }
    
    ExpressApp --> MongoDB : initializes
    ExpressApp --> RouteTree : registers
    
    RouteTree --> UserRoute
    RouteTree --> AuthRoute
    RouteTree --> OrderRoute
    RouteTree --> ProductRoute
    
    UserRoute --> UserController : uses
    AuthRoute --> AuthController : uses
    OrderRoute --> OrdersController : uses
    ProductRoute --> ProductController : uses
    
    UserController --> UserService : calls
    AuthController --> AuthService : calls
    OrdersController --> OrderService : calls
    ProductController --> ProductService : calls
    
    UserService --> UserModel : uses
    AuthService --> UserService : uses
    OrderService --> OrderModel : uses
    OrderService --> OrderItemModel : uses
    OrderService --> ReferralModel : uses
    OrderService --> UserModel : uses
    ProductService --> ProductModel : uses
    
    UserService --> ReferralService : uses
    AuthService --> ReferralService : uses through UserService
    
    ReferralService --> ReferralModel : uses
    
    UserController --|> BaseController : extends
    ProductController --|> BaseController : extends
    OrdersController --|> BaseController : extends
    
    UserService --|> BaseService : extends
    ReferralService --|> BaseService : extends
    OrderService --|> BaseService : extends
    
    MongoDB --> UserModel : manages
    MongoDB --> OrderModel : manages
    MongoDB --> OrderItemModel : manages
    MongoDB --> ProductModel : manages
    MongoDB --> ReferralModel : manages
```

## 🧭 Roadmap

- [ ] Fully mobile-responsive frontend
- [ ] Admin panel for product management
- [ ] Admin panel for order management
- [ ] Credit history and transaction logs
- [ ] Enhanced referral analytics

---



## 🌟 Acknowledgements

- [Turborepo](https://turbo.build/repo) for monorepo management
- [Render](https://render.com/) for deployment
- [Zod](https://zod.dev/) for data validation

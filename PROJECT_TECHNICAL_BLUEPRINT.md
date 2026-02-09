
# 🏛️ Project Technical Blueprint

This document serves as the architectural handbook for the DineDiscover platform.

## 🏗️ 1. Architecture Overview

```mermaid
graph TD
    subgraph "External Actors"
        Client[Tourist / Client]
        Admin[Administrator]
    end

    subgraph "DineDiscover Platform (Next.js 16)"
        subgraph "Client Portal"
            Landing[Landing Page]
            RestDetail[Restaurant Detail]
            Profile[User Profile]
        end

        subgraph "Admin Portal (Secure)"
            Dashboard[Dashboard Stats]
            UserMgmt[User Management]
            RestMgmt[Restaurant Inventory]
        end

        subgraph "API Layer"
            AuthAPI[Better-Auth Service]
            AdminAPI[Admin Server Actions]
            PublicAPI[Public Data API]
        end
    end

    subgraph "Data Persistence"
        DB[(Neon PostgreSQL)]
        Storage[Image Storage]
    end

    %% Interactions
    Client --> Landing
    Client --> RestDetail
    Client --> Profile

    Admin --> Dashboard
    Admin --> UserMgmt
    Admin --> RestMgmt

    Landing & RestDetail --> PublicAPI
    Profile --> AuthAPI

    Dashboard & UserMgmt & RestMgmt --> AdminAPI

    PublicAPI & AdminAPI & AuthAPI --> DB
    RestMgmt --> Storage
```

The high-level container architecture highlighting the separation between Client, Admin, and Data services.

---

## 🗄️ 2. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ SESSION : "has many"
    USER ||--o{ ACCOUNT : "has many"
    USER ||--o{ RESTAURANT : "manages (optional)"

    USER {
        text id PK
        text name
        text email UK "Unique Identifier"
        text role "user | admin"
        boolean banned "Access Control"
        timestamp createdAt
    }

    SESSION {
        text id PK
        text userId FK
        text token UK "Secure Cookie Token"
        timestamp expiresAt
    }

    ACCOUNT {
        text id PK
        text userId FK
        text providerId "google"
        text accountId "Provider Key"
        text accessToken
    }

    RESTAURANT {
        text id PK
        text name
        text address
        real rating "0.0 - 5.0"
        boolean isPopular "Landing Page Promo"
        boolean isTouristFavorite "Badge: Elite Choice"
        boolean isVegetarianFriendly "Badge: Veg Friendly"
        jsonb cuisine "Array of Tags"
        jsonb images "Gallery URLs"
    }
```

> [!NOTE]
> **Strategic Fields**: The fields `isPopular`, `isTouristFavorite`, and `isVegetarianFriendly` directly control frontend badges and section placement.

---

## 🔐 3. Security Architecture (RBAC Flow)

```mermaid
sequenceDiagram
    participant Browser
    participant Layout as AdminLayout (Server)
    participant Auth as Better-Auth
    participant DB as Database
    participant Redirect

    Browser->>Layout: GET /admin/dashboard
    Layout->>Auth: auth.api.getSession(headers)
    Auth->>DB: Query Session & User Role
    DB-->>Auth: Return User Data { role: "user" }
    Auth-->>Layout: Session Object

    alt Role === "admin"
        Layout-->>Browser: Render Admin Dashboard
    else Role !== "admin"
        Layout->>Redirect: redirect("/")
        Redirect-->>Browser: 307 Temporary Redirect -> Home
    end
```

> [!IMPORTANT]
> **Security Guard**: This server-side check happens *before* any UI is rendered, ensuring no admin components leak to unauthorized users.

---

## 🔄 4. Core Workflows

### 4.1 Restaurant Creation Lifecycle

```mermaid
stateDiagram-v2
    [*] --> FormWithValidation: Open "Add Restaurant" Modal
    FormWithValidation --> UploadImages: User Uploads Photos
    UploadImages --> ClientValidation: Check File Types & Size
    ClientValidation --> FormSubmission: Submit Valid Payload
    
    state API_Processing {
        FormSubmission --> AuthCheck: Verify Admin Session
        AuthCheck --> DBInsert: Insert Record
        DBInsert --> Revalidate: RevalidatePath("/admin")
    }

    Revalidate --> SuccessToast: Return 200 OK
    SuccessToast --> [*]: Close Modal & Refresh Grid
```

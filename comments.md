# ✅ Completed

- **Backend Database**

# 🔄 Pending

- **login Page**
- **Sign up Page**
- **Response & Animation of Abdallah's page**
- **Mobile Menu Header**
- **Chat Bot**
- **Mail Design**
- **Backend Endpoints**

Users
├─ id (PK)
├─ name
├─ email
├─ password_hash
├─ role
├─ created_at
└─ updated_at
│
├─< Enrollments >
│ ├─ id (PK)
│ ├─ user_id (FK → Users.id)
│ └─ camp_id (FK → UX_Camps.id)
│
├─< Orders >
│ ├─ id (PK)
│ ├─ user_id (FK → Users.id)
│ ├─ status
│ ├─ total_amount
│ ├─ stripe_payment_id
│ └─ created_at
│ │
│ └─< Order_Items >
│ ├─ id (PK)
│ ├─ order_id (FK → Orders.id)
│ ├─ product_id (FK → Products.id)
│ └─ price
│
├─< Subscriptions >
│ ├─ id (PK)
│ ├─ user_id (FK → Users.id)
│ ├─ start_date
│ ├─ end_date
│ └─ status
│
├─< Custom_Design_Requests >
│ ├─ id (PK)
│ ├─ user_id (FK → Users.id)
│ ├─ description
│ ├─ status
│ └─ price
│
└─< Payments >
├─ id (PK)
├─ user_id (FK → Users.id)
├─ order_id (FK → Orders.id)
├─ amount
├─ payment_method
└─ status

Products
├─ id (PK)
├─ title
├─ description
├─ price
├─ category_id (FK → Product_Categories.id)
└─ created_at
│
├─< Product_Files >
│ ├─ id (PK)
│ ├─ product_id (FK → Products.id)
│ ├─ format (figma, ai, psd, etc.)
│ └─ file_url
│
└─< Product_Images >
├─ id (PK)
├─ product_id (FK → Products.id)
├─ image_url
└─ is_cover

Product_Categories
├─ id (PK)
└─ name

UX_Camps
├─ id (PK)
├─ title
├─ description
├─ price
└─ created_at
│
└─< UX_Sessions >
├─ id (PK)
├─ camp_id (FK → UX_Camps.id)
├─ session_url
└─ schedule_datetime
│
└─< UX_Files >
├─ id (PK)
├─ session_id (FK → UX_Sessions.id)
├─ file_url
└─ file_type

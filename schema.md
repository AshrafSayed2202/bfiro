## 🧑 **Users & Accounts**

- **users** → بيخزن بيانات المستخدمين (اسم، إيميل، باسورد مشفّر، role زي admin أو customer، timezone، Stripe ID).
- **user_addresses** → لو عايز تخزن بيانات عنوان (billing أو shipping).
- **user_payment_methods** → بيربط حساب المستخدم بوسيلة الدفع في Stripe (Card ID، brand، last4).

---

## 📦 **Products & Catalog**

- **products** → المنتج نفسه (UI kit، template، font …الخ) فيه عنوان، وصف، صورة غلاف.
- **product_categories** → كاتيجوري أساسي/فرعي (مثلاً: Design → UI Kits).
- **product_category_assignments** → ربط منتج بكاتيجوري.
- **product_tags** / **product_tag_assignments** → عشان تعمل tags زي “Minimal”, “Dark Theme”.
- **product_files** → ملفات المنتج (Figma, PSD, AI, Zip …الخ).
- **product_images** → صور المنتج (صور داخلية بجانب cover).
- **prices** → أسعار المنتج (one_time أو recurring subscription)، مربوط بـ Stripe Price ID.

---

## 🎓 **UX Camps (الكورسات / الورش المباشرة)**

- **ux_camps** → البرنامج أو الكورس نفسه (العنوان، وصف، صورة غلاف، لينك join افتراضي).
- **ux_camp_products** → بيربط الكورس بمنتج (عشان يتباع).
- **ux_camp_sessions** → كل سيشن (عنوان، وقت البداية والنهاية، platform زي Zoom أو Google Meet، لينك join).
- **ux_camp_materials** → ملفات/ماتيريال للكورس أو السيشن (كتب PDF، Slides، Resources).
- **ux_camp_enrollments** → الناس اللي سجلوا في الكورس (linked بالـ order).
- **ux_camp_attendance** → متابعة حضور السيشن (مين دخل/خرج).

---

## 💳 **Orders & Payments**

- **orders** → الأوردر نفسه (user_id، مبلغ، status زي paid أو refunded، Stripe payment intent).
- **order_items** → المنتجات أو الخدمات اللي داخل الأوردر (Product، UX Camp، Custom Design).
- **user_entitlements** → الحقوق اللي المستخدم بياخدها بعد الدفع (مثلاً access لتحميل منتج أو حضور كورس).
- **downloads** → log لكل تحميل ملف (مين نزّل وإمتى).

---

## 🔄 **Subscriptions (Yearly All-Access)**

- **subscriptions** → الاشتراك السنوي أو الشهري (status active/trialing/canceled، Stripe subscription ID).
- **subscription_entitlements** → لو عايز تربط الـ subscription مباشرة بالمنتجات المتاحة.

---

## 🎨 **Custom Design Requests**

- **custom_design_requests** → طلب مخصص من العميل لتصميم (brief, budget, status).
- **custom_design_order_links** → بيربط طلب التصميم بالأوردر (deposit، milestone، final payment).

---

## 💰 **Stripe Integration**

- **stripe_events** → لتخزين الـ webhooks من Stripe (مثل invoice.payment_succeeded).
- **idempotency_keys** → عشان تتفادى تكرار تنفيذ طلب Stripe.

---

## 📜 **Licensing**

- **licenses** → أنواع الرخص (مثلاً Personal License, Commercial License).
- **product_licenses** → ربط منتج برخصة معينة.
- **issued_license_keys** → لو عايز تصدر مفتاح ترخيص unique بعد الشراء.

---

## ⭐ **Extras**

- **reviews** → تقييمات المستخدمين للمنتجات.
- **wishlists** و **wishlist_items** → قوائم الرغبات (Favorites).

---

باختصار:

- جداول **users & orders** لإدارة العملاء والمدفوعات.
- جداول **products & files** للـ UI kits/templates/… إلخ.
- جداول **ux_camps** لإدارة الكورسات والجدول والماتيريال والحضور.
- جداول **subscriptions** للاشتراكات السنوية.
- جداول **custom_design_requests** لطلبات التصميم الخاصة.
- جداول **stripe_events** للربط مع Stripe.

---

-- MySQL 8.x schema for a digital design marketplace offering UI kits, coded templates,
-- icons, illustrations, fonts, plus UX camp live sessions, custom design services,
-- one-off purchases and a yearly all-access subscription. Stripe is used for payments.
-- Engine/charset
SET NAMES utf8mb4;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Core
-- --------------------------------------------------------
CREATE TABLE users (
  id               BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email            VARCHAR(255) NOT NULL UNIQUE,
  email_verified_at DATETIME NULL,
  password_hash    VARCHAR(255) NULL,
  name             VARCHAR(160) NOT NULL,
  role             ENUM('customer','admin','creator','support') NOT NULL DEFAULT 'customer',
  avatar_url       VARCHAR(512) NULL,
  locale           VARCHAR(16) NOT NULL DEFAULT 'en',
  timezone         VARCHAR(64) NOT NULL DEFAULT 'UTC',
  stripe_customer_id VARCHAR(128) NULL UNIQUE,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE user_addresses (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id      BIGINT UNSIGNED NOT NULL,
  type         ENUM('billing','shipping') NOT NULL,
  name         VARCHAR(160) NOT NULL,
  line1        VARCHAR(255) NOT NULL,
  line2        VARCHAR(255) NULL,
  city         VARCHAR(120) NOT NULL,
  state        VARCHAR(120) NULL,
  postal_code  VARCHAR(40)  NULL,
  country_code CHAR(2)      NOT NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_addresses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_addresses_user_type (user_id, type)
) ENGINE=InnoDB;

-- Optional: store saved Stripe PMs (never raw PANs)
CREATE TABLE user_payment_methods (
  id                    BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id               BIGINT UNSIGNED NOT NULL,
  stripe_payment_method_id VARCHAR(128) NOT NULL,
  brand                 VARCHAR(64) NULL,
  last4                 CHAR(4) NULL,
  exp_month             TINYINT NULL,
  exp_year              SMALLINT NULL,
  default_for_currency  CHAR(3) NULL,
  created_at            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_upm_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_upm_user_pm (user_id, stripe_payment_method_id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Catalog (digital products & services)
-- --------------------------------------------------------
CREATE TABLE products (
  id                BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug              VARCHAR(190) NOT NULL UNIQUE,
  title             VARCHAR(255) NOT NULL,
  subtitle          VARCHAR(255) NULL,
  type              ENUM('ui_kit','template','icons','illustrations','font','bundle','service_custom_design') NOT NULL,
  description_md    MEDIUMTEXT NULL,
  status            ENUM('draft','active','archived') NOT NULL DEFAULT 'draft',
  cover_image_url   VARCHAR(512) NULL,
  hero_video_url    VARCHAR(512) NULL,
  created_by        BIGINT UNSIGNED NULL,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE product_categories (
  id        BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug      VARCHAR(190) NOT NULL UNIQUE,
  name      VARCHAR(190) NOT NULL,
  parent_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pc_parent FOREIGN KEY (parent_id) REFERENCES product_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE product_category_assignments (
  product_id  BIGINT UNSIGNED NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (product_id, category_id),
  CONSTRAINT fk_pca_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_pca_category FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE product_tags (
  id   BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(190) NOT NULL UNIQUE,
  name VARCHAR(190) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE product_tag_assignments (
  product_id BIGINT UNSIGNED NOT NULL,
  tag_id     BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (product_id, tag_id),
  CONSTRAINT fk_pta_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_pta_tag FOREIGN KEY (tag_id) REFERENCES product_tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- File variants for products (Figma, AI, PSD, code zips, etc.)
CREATE TABLE product_files (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id     BIGINT UNSIGNED NOT NULL,
  kind           ENUM('source','preview','documentation','license','other') NOT NULL DEFAULT 'source',
  format         ENUM('figma','sketch','xd','ai','psd','pdf','svg','png','jpg','zip','ttf','otf','woff','woff2','code','other') NOT NULL,
  filename       VARCHAR(255) NOT NULL,
  storage_path   VARCHAR(512) NOT NULL,
  filesize_bytes BIGINT UNSIGNED NULL,
  checksum_sha256 CHAR(64) NULL,
  download_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  is_primary     TINYINT(1) NOT NULL DEFAULT 0,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pf_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_pf_product (product_id)
) ENGINE=InnoDB;

CREATE TABLE product_images (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id   BIGINT UNSIGNED NOT NULL,
  url          VARCHAR(512) NOT NULL,
  purpose      ENUM('cover','gallery') NOT NULL DEFAULT 'gallery',
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pi_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_pi_product (product_id, purpose)
) ENGINE=InnoDB;

-- Pricing mapped to Stripe Price objects
CREATE TABLE prices (
  id                BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id        BIGINT UNSIGNED NOT NULL,
  type              ENUM('one_time','recurring') NOT NULL,
  currency          CHAR(3) NOT NULL,
  unit_amount       BIGINT NOT NULL, -- store in minor units (cents)
  interval_unit     ENUM('day','week','month','year') NULL, -- required if recurring
  interval_count    INT NULL,
  stripe_product_id VARCHAR(128) NULL,
  stripe_price_id   VARCHAR(128) NULL UNIQUE,
  active            TINYINT(1) NOT NULL DEFAULT 1,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_prices_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_prices_product_active (product_id, active)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- UX Camps (programs + sessions + materials + enrollment)
-- --------------------------------------------------------
CREATE TABLE ux_camps (
  id                BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug              VARCHAR(190) NOT NULL UNIQUE,
  title             VARCHAR(255) NOT NULL,
  description_md    MEDIUMTEXT NULL,
  cover_image_url   VARCHAR(512) NULL,
  status            ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  default_platform  ENUM('zoom','google_meet','microsoft_teams','webex','custom') NOT NULL DEFAULT 'zoom',
  default_join_url  VARCHAR(512) NULL, -- can be overridden per session
  created_by        BIGINT UNSIGNED NULL,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_uxc_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- If you sell camp access as a product, relate with a product row (service/bundle)
CREATE TABLE ux_camp_products (
  ux_camp_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (ux_camp_id, product_id),
  CONSTRAINT fk_ucp_camp FOREIGN KEY (ux_camp_id) REFERENCES ux_camps(id) ON DELETE CASCADE,
  CONSTRAINT fk_ucp_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ux_camp_sessions (
  id               BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  ux_camp_id       BIGINT UNSIGNED NOT NULL,
  title            VARCHAR(255) NULL,
  starts_at        DATETIME NOT NULL,
  ends_at          DATETIME NOT NULL,
  timezone         VARCHAR(64) NOT NULL DEFAULT 'UTC',
  platform         ENUM('zoom','google_meet','microsoft_teams','webex','custom') NOT NULL,
  join_url         VARCHAR(512) NULL,
  recording_url    VARCHAR(512) NULL,
  capacity         INT NULL,
  status           ENUM('scheduled','live','completed','canceled') NOT NULL DEFAULT 'scheduled',
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ucs_camp FOREIGN KEY (ux_camp_id) REFERENCES ux_camps(id) ON DELETE CASCADE,
  INDEX idx_ucs_camp_time (ux_camp_id, starts_at)
) ENGINE=InnoDB;

CREATE TABLE ux_camp_materials (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  ux_camp_id     BIGINT UNSIGNED NOT NULL,
  session_id     BIGINT UNSIGNED NULL, -- null = for entire camp
  kind           ENUM('book','slides','assignment','resource','other') NOT NULL,
  title          VARCHAR(255) NOT NULL,
  file_format    ENUM('pdf','pptx','docx','zip','link','other') NOT NULL,
  url_or_path    VARCHAR(512) NOT NULL,
  is_required    TINYINT(1) NOT NULL DEFAULT 0,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ucm_camp FOREIGN KEY (ux_camp_id) REFERENCES ux_camps(id) ON DELETE CASCADE,
  CONSTRAINT fk_ucm_session FOREIGN KEY (session_id) REFERENCES ux_camp_sessions(id) ON DELETE SET NULL,
  INDEX idx_ucm_camp_session (ux_camp_id, session_id)
) ENGINE=InnoDB;

CREATE TABLE ux_camp_enrollments (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  ux_camp_id     BIGINT UNSIGNED NOT NULL,
  user_id        BIGINT UNSIGNED NOT NULL,
  order_item_id  BIGINT UNSIGNED NULL, -- linkage to the purchase
  status         ENUM('pending','active','completed','canceled','refunded') NOT NULL DEFAULT 'pending',
  enrolled_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at   DATETIME NULL,
  CONSTRAINT fk_uce_camp FOREIGN KEY (ux_camp_id) REFERENCES ux_camps(id) ON DELETE CASCADE,
  CONSTRAINT fk_uce_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_uce_user_camp (user_id, ux_camp_id)
) ENGINE=InnoDB;

CREATE TABLE ux_camp_attendance (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  session_id     BIGINT UNSIGNED NOT NULL,
  user_id        BIGINT UNSIGNED NOT NULL,
  joined_at      DATETIME NULL,
  left_at        DATETIME NULL,
  CONSTRAINT fk_uca_session FOREIGN KEY (session_id) REFERENCES ux_camp_sessions(id) ON DELETE CASCADE,
  CONSTRAINT fk_uca_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_attendance (session_id, user_id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Commerce (orders, items, entitlements, subscriptions)
-- --------------------------------------------------------
CREATE TABLE orders (
  id                     BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id                BIGINT UNSIGNED NOT NULL,
  currency               CHAR(3) NOT NULL,
  subtotal_amount        BIGINT NOT NULL,
  discount_amount        BIGINT NOT NULL DEFAULT 0,
  tax_amount             BIGINT NOT NULL DEFAULT 0,
  total_amount           BIGINT NOT NULL,
  status                 ENUM('requires_payment','processing','paid','fulfilled','canceled','refunded','partially_refunded') NOT NULL DEFAULT 'requires_payment',
  payment_provider       ENUM('stripe') NOT NULL DEFAULT 'stripe',
  stripe_payment_intent_id VARCHAR(128) NULL,
  stripe_checkout_session_id VARCHAR(128) NULL,
  completed_at           DATETIME NULL,
  created_at             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_orders_user_status (user_id, status)
) ENGINE=InnoDB;

-- What was purchased: a catalog product (digital), a UX camp seat, or a custom design deposit
CREATE TABLE order_items (
  id                 BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id           BIGINT UNSIGNED NOT NULL,
  purchasable_type   ENUM('product','ux_camp','custom_design') NOT NULL,
  purchasable_id     BIGINT UNSIGNED NOT NULL,
  price_id           BIGINT UNSIGNED NULL,  -- which price was used (one-time / recurring)
  title_snapshot     VARCHAR(255) NOT NULL, -- title at purchase time
  currency           CHAR(3) NOT NULL,
  unit_amount        BIGINT NOT NULL,
  quantity           INT NOT NULL DEFAULT 1,
  total_amount       BIGINT NOT NULL,
  metadata_json      JSON NULL,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_oi_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_oi_price FOREIGN KEY (price_id) REFERENCES prices(id) ON DELETE SET NULL,
  INDEX idx_oi_order (order_id),
  INDEX idx_oi_purchasable (purchasable_type, purchasable_id)
) ENGINE=InnoDB;

-- Entitlements = who can access what (downloads or camp)
CREATE TABLE user_entitlements (
  id            BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id       BIGINT UNSIGNED NOT NULL,
  product_id    BIGINT UNSIGNED NULL,   -- null for camp-wide or global
  ux_camp_id    BIGINT UNSIGNED NULL,
  source        ENUM('purchase','subscription','manual','promotion') NOT NULL,
  order_item_id BIGINT UNSIGNED NULL,
  starts_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at    DATETIME NULL, -- null means lifetime access
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ue_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_ue_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_ue_camp FOREIGN KEY (ux_camp_id) REFERENCES ux_camps(id) ON DELETE CASCADE,
  CONSTRAINT fk_ue_order_item FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE SET NULL,
  INDEX idx_ue_user_target (user_id, product_id, ux_camp_id)
) ENGINE=InnoDB;

-- Downloads audit
CREATE TABLE downloads (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id        BIGINT UNSIGNED NOT NULL,
  product_file_id BIGINT UNSIGNED NOT NULL,
  ip_address     VARBINARY(16) NULL, -- ipv4/6
  user_agent     VARCHAR(255) NULL,
  downloaded_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_dl_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_dl_file FOREIGN KEY (product_file_id) REFERENCES product_files(id) ON DELETE CASCADE,
  INDEX idx_dl_user_time (user_id, downloaded_at)
) ENGINE=InnoDB;

-- Subscriptions (Yearly All-Access)
CREATE TABLE subscriptions (
  id                        BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id                   BIGINT UNSIGNED NOT NULL,
  status                    ENUM('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid') NOT NULL,
  product_scope             ENUM('all_items','category','custom') NOT NULL DEFAULT 'all_items',
  category_id               BIGINT UNSIGNED NULL, -- optional narrowed scope
  started_at                DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  current_period_start      DATETIME NOT NULL,
  current_period_end        DATETIME NOT NULL,
  cancel_at                 DATETIME NULL,
  canceled_at               DATETIME NULL,
  ended_at                  DATETIME NULL,
  stripe_subscription_id    VARCHAR(128) NOT NULL UNIQUE,
  stripe_price_id           VARCHAR(128) NULL,
  created_at                DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at                DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_sub_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_sub_category FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL,
  INDEX idx_sub_user_status (user_id, status)
) ENGINE=InnoDB;

-- Optional: map subscription to dynamic entitlements (materialized on webhook)
CREATE TABLE subscription_entitlements (
  id                 BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  subscription_id    BIGINT UNSIGNED NOT NULL,
  product_id         BIGINT UNSIGNED NULL,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_se_sub FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE,
  CONSTRAINT fk_se_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_se (subscription_id, product_id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Custom Design Requests (paid service)
-- --------------------------------------------------------
CREATE TABLE custom_design_requests (
  id            BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id       BIGINT UNSIGNED NOT NULL,
  title         VARCHAR(255) NOT NULL,
  brief_md      MEDIUMTEXT NOT NULL,
  budget_min    BIGINT NULL,
  budget_max    BIGINT NULL,
  currency      CHAR(3) NOT NULL DEFAULT 'USD',
  status        ENUM('draft','quoted','deposit_paid','in_progress','delivered','canceled') NOT NULL DEFAULT 'draft',
  attached_doc_url VARCHAR(512) NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_cdr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Link design request bills to orders
CREATE TABLE custom_design_order_links (
  custom_design_id BIGINT UNSIGNED NOT NULL,
  order_item_id    BIGINT UNSIGNED NOT NULL,
  purpose          ENUM('deposit','milestone','final') NOT NULL,
  PRIMARY KEY (custom_design_id, order_item_id),
  CONSTRAINT fk_cdol_cdr FOREIGN KEY (custom_design_id) REFERENCES custom_design_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_cdol_oi FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Stripe Integration (webhook events & idempotency)
-- --------------------------------------------------------
CREATE TABLE stripe_events (
  id               BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  event_id         VARCHAR(128) NOT NULL UNIQUE, -- Stripe event id
  type             VARCHAR(128) NOT NULL,
  api_version      VARCHAR(32) NULL,
  data_json        JSON NOT NULL,
  received_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE idempotency_keys (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  idem_key        VARCHAR(200) NOT NULL UNIQUE,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Licensing (optional but useful for digital goods)
-- --------------------------------------------------------
CREATE TABLE licenses (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug         VARCHAR(190) NOT NULL UNIQUE,
  name         VARCHAR(190) NOT NULL,
  body_md      MEDIUMTEXT NOT NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE product_licenses (
  product_id   BIGINT UNSIGNED NOT NULL,
  license_id   BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (product_id, license_id),
  CONSTRAINT fk_pl_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_pl_license FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- If you want to issue license keys per purchase
CREATE TABLE issued_license_keys (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id        BIGINT UNSIGNED NOT NULL,
  product_id     BIGINT UNSIGNED NOT NULL,
  order_item_id  BIGINT UNSIGNED NOT NULL,
  license_key    VARCHAR(128) NOT NULL,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ilk (user_id, product_id, order_item_id),
  CONSTRAINT fk_ilk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_ilk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_ilk_order_item FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Content (reviews, wishlists) – optional
-- --------------------------------------------------------
CREATE TABLE reviews (
  id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id  BIGINT UNSIGNED NOT NULL,
  user_id     BIGINT UNSIGNED NOT NULL,
  rating      TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       VARCHAR(190) NULL,
  body        TEXT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rev_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_rev_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_review_user_product (user_id, product_id)
) ENGINE=InnoDB;

CREATE TABLE wishlists (
  id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id     BIGINT UNSIGNED NOT NULL,
  name        VARCHAR(190) NOT NULL DEFAULT 'Favorites',
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_wl_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE wishlist_items (
  wishlist_id BIGINT UNSIGNED NOT NULL,
  product_id  BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (wishlist_id, product_id),
  CONSTRAINT fk_wli_wl FOREIGN KEY (wishlist_id) REFERENCES wishlists(id) ON DELETE CASCADE,
  CONSTRAINT fk_wli_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Example Data Notes (not inserted):
-- 1) Create a product row for each digital item. Attach one-time price in `prices`.
-- 2) Yearly full-access: create a hidden product like 'All-Access Pass', add a yearly recurring price.
--    When Stripe subscription becomes active via webhook, insert into `subscriptions`
--    and grant entitlements with either `user_entitlements` (expires_at = current_period_end)
--    or materialize per-product rows in `subscription_entitlements`.
-- 3) UX camps: create `ux_camps`, its `ux_camp_sessions`, optional materials (with kind = 'book').
--    Create a product mapped through `ux_camp_products` to sell tickets.
--    On order completion, insert `ux_camp_enrollments` and entitlement for the camp.
-- 4) Custom design: capture the brief in `custom_design_requests`, create order items for deposit or milestones,
--    link via `custom_design_order_links`.
-- 5) File access: gate downloads by verifying (a) direct product purchase entitlement or (b) active all-access subscription.
-- 6) Always store prices in minor units (e.g., cents) and amounts as BIGINT to avoid floating point errors.

# CommerceFlow — Frontend API Map (Phase 1 Audit)

Audit of the existing backend at `../commerce-flow` (source: `src/`). This document
was produced by reading the actual source. No backend files were modified.

Legend: **Verified** = read directly from source. **Uncertain** = inferred / not
directly provable from code.

---

## 1. Stack & conventions

**Verified** (`package.json`, `src/app.js`, `src/server.js`)

- Framework: **Express 5**, ESM (`"type": "module"`), entry `src/server.js`.
- DB: **Mongoose 9 / MongoDB**. Transactions are used, so Mongo must be a
  replica set (`src/utils/transaction.js`).
- Auth: **express-session + Passport local** (email/password), session stored in
  Mongo via `connect-mongo` (`src/app.js:83-102`, `src/config/passport.js`).
- Validation: `express-validator` `checkSchema`, all fields declared `in: ["body"]`
  / `["params"]` / `["query"]` so query strings can't override bodies.
- Security/ops: `helmet`, `morgan`, `express-rate-limit` on auth only.

### Response envelope — **Verified** (`src/utils/respond.js`)

Success:
```json
{ "ok": true, "data": <any>, "meta": { "page":1,"limit":20,"total":0,"totalPages":1 } }
```
(`meta` present only for paginated list endpoints.)

Failure:
```json
{ "ok": false, "error": { "message": "…", "code": "…", "details": [ … ] } }
```
Always branch on `body.ok`. `code` defaults to a per-status string
(`BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`,
`VALIDATION_ERROR`, `TOO_MANY_REQUESTS`, `PAYLOAD_TOO_LARGE`,
`UNSUPPORTED_MEDIA_TYPE`, `SERVICE_UNAVAILABLE`, `INTERNAL_ERROR`; see
`STATUS_CODES` in `respond.js:5-18`). `details` is present for validation errors
(`[{ field, message }]`, `src/middleware/error.js:21-27`, `src/middleware/validate.js`).

### Error handling — **Verified** (`src/middleware/error.js`)

- Mongoose `ValidationError` → 400 `VALIDATION_ERROR` + `details`.
- Mongoose `CastError` → 400 `BAD_REQUEST`.
- Duplicate key (11000) → 409 `CONFLICT`.
- Multer `LIMIT_FILE_SIZE` → 413; `LIMIT_UNEXPECTED_FILE`/`LIMIT_FILE_COUNT` → 400.
- 5xx hidden as `{ message: "Server error", code: "INTERNAL_ERROR" }`.
- Unknown route → 404 `NOT_FOUND` (`src/app.js:124-126`).

### List query conventions — **Verified** (`src/utils/listQuery.js`, `src/utils/pagination.js`)

- `q` — case-insensitive literal "contains" search over whitelisted fields (max 100 chars).
- `sort` — whitelisted per resource; `order` — `asc` | `desc`.
- Pagination is **opt-in**: send `?page=&limit=` (default limit 20, max 100) to get
  `meta`. Omit both to get a bare array with no `meta`.
- `status` filter (`?status=`) is whitelisted per resource, plus `all`.

---

## 2. Authentication & session flow — **Verified**

Files: `src/routes/auth.routes.js`, `src/config/passport.js`, `src/app.js:83-102`,
`src/middleware/auth.js`.

- **Mechanism**: cookie-based session (`connect.sid`-style, name default from
  express-session). Cookie flags: `httpOnly: true`, `sameSite: "lax"`,
  `secure: NODE_ENV === "production"`, `maxAge` = `SESSION_TTL` (default 24h,
  `src/app.js:93-99`). Session is "rolling" (renewed on activity).
- **Login**: `POST /api/auth/login` runs Passport local. On success sets
  `req.session.authenticatedAt` and returns the sanitized public user object
  (incl. `permissions`). On failure returns `401`.
- **Registration**: `POST /api/auth/register` creates a **customer** (role default
  in `src/models/User.js`). Returns the sanitized public user object (incl.
  `permissions`).
- **Current user / session restoration**: `GET /api/auth/me` returns the sanitized
  public user object (incl. `permissions`) when the session is valid, else `401`.
- **Logout**: `POST /api/auth/logout` destroys the session, returns
  `{ message: "Logged out" }`.
- **Session invalidation on password change**: `deserializeUser` rejects the session
  if `user.passwordChangedAt > session.authenticatedAt`
  (`src/config/passport.js:29-33`). Changing a password sets
  `authenticatedAt = now` for the current session (so it stays valid) but
  **logs out other sessions** (`src/routes/user.routes.js:178`).
- **Deactivating/suspending a user** invalidates their sessions (status !== "active"
  in deserialize, `passport.js:27`).
- **Rate limiting**: login/register limited to **20 requests / 15 min / IP**
  (`auth.routes.js:11-15`) → 429 `TOO_MANY_REQUESTS`.

### Frontend implications — **Verified fact + recommendation**

- The API is session/cookie based, **not token based**. The frontend must send
  credentials on every request (`fetch(..., { credentials: "include" })` /
  `axios withCredentials: true`).
- Session restoration pattern: on app load call `GET /api/auth/me`; `200` = signed
  in (use the returned `permissions`), `401` = signed out.
- Permission data comes from the returned `user.permissions` array — never derive
  it from `role` or hardcode a role→permission table (see the appended
  "Authentication and Permissions" section).
- **Uncertain/risk**: there is **no CSRF token** mechanism. `sameSite=lax` plus
  JSON-only bodies mitigates the common cases, but be aware for cross-site setups.

---

## 3. Permission model — **Verified**

Files: `src/config/permissions.js`, `src/middleware/permissions.js`,
`src/config/roles.js`, `src/routes/user.routes.js`.

Roles: `owner, admin, manager, staff, delivery, customer`
(`src/config/roles.js:1`). User statuses: `active, inactive, suspended`.

Permission set (verbatim from `permissions.js`): `users:read|create|update`,
`products:read|readAll|readCost|create|update|delete`,
`categories:read|readAll|create|update|delete`,
`suppliers:read|create|update|delete`,
`saleOrders:readAll|create|createForOthers|updateStatus|updateDelivery`,
`purchaseOrders:read|create|updateStatus`,
`inventory:read|adjust`, `reports:read`.

### Role → permissions matrix — **Verified** (`permissions.js:15-49`)

| Permission | owner | admin | manager | staff | delivery | customer |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| users:read | ✓ | ✓ | ✓ | | | |
| users:create | ✓ | ✓ | ✓ | | | |
| users:update | ✓ | ✓ | ✓ | | | |
| products:read | ✓ | ✓ | ✓ | ✓ | | ✓ |
| products:readAll | ✓ | ✓ | ✓ | ✓ | | |
| products:readCost | ✓ | ✓ | ✓ | ✓ | | |
| products:create/update/delete | ✓ | ✓ | ✓ | | | |
| categories:read | ✓ | ✓ | ✓ | ✓ | | ✓ |
| categories:readAll | ✓ | ✓ | ✓ | ✓ | | |
| categories:create/update/delete | ✓ | ✓ | ✓ | | | |
| suppliers:read | ✓ | ✓ | ✓ | ✓ | | |
| suppliers:create/update/delete | ✓ | ✓ | ✓ | | | |
| saleOrders:readAll | ✓ | ✓ | ✓ | ✓ | ✓ | |
| saleOrders:create | ✓ | ✓ | ✓ | ✓ | | ✓ |
| saleOrders:createForOthers | ✓ | ✓ | ✓ | ✓ | | |
| saleOrders:updateStatus | ✓ | ✓ | ✓ | ✓ | | |
| saleOrders:updateDelivery | ✓ | ✓ | ✓ | | ✓ | |
| purchaseOrders:read | ✓ | ✓ | ✓ | | | |
| purchaseOrders:create | ✓ | ✓ | ✓ | | | |
| purchaseOrders:updateStatus | ✓ | ✓ | ✓ | | | |
| inventory:read | ✓ | ✓ | ✓ | ✓ | | |
| inventory:adjust | ✓ | ✓ | ✓ | | | |
| reports:read | ✓ | ✓ | ✓ | | | |

`owner` and `admin` have identical permission sets. `delivery` has **only**
`saleOrders:readAll` + `saleOrders:updateDelivery`.

### How permissions are enforced — **Verified**

- `authorize(permission)` → 401 if not signed in, 403 `FORBIDDEN` if role lacks it
  (`middleware/permissions.js:4-11`).
- `authorizeOwnerOrPermission(Model, opts, ...perms)` → allows if the user owns the
  record (`customer` field by default) **or** holds one of the permissions
  (`permissions.js:30-57`).
- `ownScope(req, permission)` → list endpoints return `{}` (all) for permission
  holders, else `{ customer: req.user.id }` (own records only).
- **Cost redaction**: users without `products:readCost` receive products/orders/
  inventory with `costPrice` / `unitCost` removed
  (`src/utils/redact.js`, used in product, sale-order, inventory routes).
- **The backend returns the user's permission list.** `publicUser()` in
  `src/routes/auth.routes.js:12-21` attaches `permissions: permissionsFor(role)` to
  the user object returned by `GET /api/auth/me`, `POST /api/auth/login`, and
  `POST /api/auth/register`. The frontend must use these returned `permissions`
  for UI gating and must **not** re-derive them from `role` or hardcode a
  role→permission matrix; the backend remains the source of truth and enforces
  authorization on every protected endpoint. (See the appended
  "Authentication and Permissions" section for details.)

### Role-management rules — **Verified** (`src/routes/user.routes.js:26-159`)

- `CREATABLE_BY_ROLE`: owner may create any role except `owner`; admin any except
  `owner, admin`; manager only `staff, delivery, customer`.
- Only `owner`/`admin` may change an existing user's role; nobody may change their
  own role; you may only grant a role you are allowed to create.
- You cannot modify a user whose role rank is higher than yours
  (`ROLE_RANK`: owner 4, admin 3, manager 2, staff/delivery 1, customer 0).
- Self status change is forbidden; a manager may only set status `active|inactive`.
- Role changes are recorded in `RoleChangeHistory` (no API to read it).

---

## 4. API inventory (only endpoints that exist)

All paths are prefixed with `/api`. Base routes `/` (banner) and `/health` also exist
(`src/app.js:104-112`).

### 4.1 Authentication & profile — `src/routes/auth.routes.js`, `user.routes.js`

| Method & path | Auth | Permission | Body / params | Notes |
|---|---|---|---|---|
| `POST /api/auth/register` | public (rate-limited) | — | `email, password(min6), firstname, lastname` | 201 public user object incl. `permissions`; 409 if email used; new role = `customer` |
| `POST /api/auth/login` | public (rate-limited) | — | `email, password(min6)` | 200 public user object incl. `permissions`; 401 invalid |
| `GET /api/auth/me` | session | — | — | 200 public user object incl. `permissions`, else 401 |
| `POST /api/auth/logout` | session | — | — | 200 `{message:"Logged out"}` |
| `GET /api/users/profile/me` | session | — | — | raw user document (**no `permissions`**); prefer `/api/auth/me` |
| `PATCH /api/users/profile/me` | session | — | `firstname?, lastname?, address?` | address, if present, must be complete; returns updated user |
| `PATCH /api/users/profile/password` | session | — | `currentPassword(min6), newPassword(min6, ≠ current)` | 401 if current wrong; invalidates other sessions |
| `PATCH /api/users/profile/avatar` | session | — | multipart `avatar` (1 file) | 200 `{avatar:"/uploads/avatars/…"}` |
| `DELETE /api/users/profile/avatar` | session | — | — | 200 `{avatar:""}` |

### 4.2 Users (management) — `src/routes/user.routes.js`

| Method & path | Auth | Permission | Query / body |
|---|---|---|---|
| `GET /api/users` | session | `users:read` | `status, q, sort(firstname\|lastname\|email\|role\|status\|createdAt), order, page, limit` |
| `GET /api/users/:id` | session | `users:read` | — |
| `POST /api/users` | session | `users:create` | `firstname, lastname, email, password(min6), role(≠owner), address?` → 201 `{id,email,role}` |
| `PATCH /api/users/:id/role-status` | session | `users:update` | `role?, status?` (business rules in §3) |

### 4.3 Categories — `src/routes/category.routes.js`

| Method & path | Auth | Permission | Notes |
|---|---|---|---|
| `GET /api/categories` | **public** | `categories:readAll` to see all | query `status(active\|inactive\|all), q, sort(title\|slug\|createdAt), order, page, limit`; anonymous sees active only |
| `GET /api/categories/slug/:slug` | public | `categories:readAll` | inactive hidden unless permitted |
| `GET /api/categories/:id` | public | `categories:readAll` | inactive hidden unless permitted |
| `POST /api/categories` | session | `categories:create` | `title, slug(/^[a-z0-9]+(-[a-z0-9]+)*$/), description?, isActive?, specKeys?:string[]`; 409 dup slug |
| `PATCH /api/categories/:id` | session | `categories:update` | any of above, optional; 409 dup slug |
| `DELETE /api/categories/:id` | session | `categories:delete` | hard delete if no products (`{deleted:true,hard:true}`); else deactivate if only inactive products (`{deactivated:true}`); 409 if used by active products |
| `PATCH /api/categories/:id/image` | session | `categories:update` | multipart `image` (1 file) → `{image}` |
| `DELETE /api/categories/:id/image` | session | `categories:update` | → `{image:""}` |

### 4.4 Products — `src/routes/product.routes.js`

| Method & path | Auth | Permission | Notes |
|---|---|---|---|
| `GET /api/products` | **public** | `products:readAll` to see non-active / filter status | query `category` (slug), `status`, `q, sort(title\|sku\|price\|stock\|createdAt), order, page, limit`. Anonymous → active only. Non-`readAll` requesting `status` → **403**. Cost redacted without `products:readCost`. |
| `GET /api/products/sku/:sku` | public | `products:readAll` for non-active | sku upper-cased |
| `GET /api/products/:id` | public | `products:readAll` for non-active | non-active → 404 unless permitted |
| `POST /api/products` | session | `products:create` | `title, sku, costPrice, price(>costPrice), category(id, active), lowStockThreshold?(int≥0), description?, specifications?(object), status?(active\|inactive\|draft)`; 409 dup sku; category must be active. **`stock` is not settable here.** `specifications` keys must be in the category's `specKeys` (lowercased); output is normalized. |
| `PATCH /api/products/:id` | session | `products:update` | any create field optional; price/cost cross-validation retained |
| `DELETE /api/products/:id` | session | `products:delete` | hard delete if unreferenced (`{deleted:true,hard:true}`); else soft `inactive` (`{deactivated:true,hard:false}`) |
| `PATCH /api/products/:id/images` | session | `products:update` | multipart `images` (array, ≤10, max 10 total) → `{images:[urls]}` |
| `DELETE /api/products/:id/images/:filename` | session | `products:update` | filename must match `^\d+-\d+\.webp$` → `{images:[urls]}` |

### 4.5 Inventory & stock movements — `src/routes/inventory.routes.js`

| Method & path | Auth | Permission | Notes |
|---|---|---|---|
| `GET /api/inventory` | session | `inventory:read` | query `q, sort(createdAt\|quantity\|type\|direction), order, page, limit`; returns transactions with populated `product`, `performedBy`. Cost redacted without `products:readCost`. |
| `POST /api/inventory/adjust` | session | `inventory:adjust` | `product(id), quantity(1..1,000,000), direction(in\|out), type(adjustment\|damage\|restock), note?(≤500)`. Atomic; 409 if it would make stock negative or below `reserved`. → `{movement, stock}` `(201)` |

`InventoryTransaction.type` also includes `sale, purchase, return` but those are created
**internally** by order flows, never by the frontend (`src/models/InventoryTransaction.js:10`).

### 4.6 Sales orders & checkout — `src/routes/saleOrder.routes.js`

| Method & path | Auth | Permission | Notes |
|---|---|---|---|
| `GET /api/sale-orders` | session | `saleOrders:readAll` (else own only) | query `status, q, sort(createdAt\|total\|status\|paidAt), order, page, limit`. Non-`readAll` may not use `status` (403). Populates `customer, items.product`. Cost redacted. |
| `GET /api/sale-orders/:id` | session | `saleOrders:readAll` **or** owner | owner = order's `customer` |
| `POST /api/sale-orders` | session | `saleOrders:create` | `items:[{product,quantity}]` (1–50; **only** `product` and `quantity` allowed per item — price comes from product), `address` (required, complete), `customer?` (`saleOrders:createForOthers`, else must be self), `paymentMethod?(cod\|stripe\|card\|paypal)`. Reserves stock in a transaction; sets `expiresAt`. → 201 order (cost redacted if no `readCost`) |
| `PATCH /api/sale-orders/:id/status` | session | owner(cancel only) / `saleOrders:updateStatus` / `saleOrders:updateDelivery` | body `status(pending\|paid\|shipped\|delivered\|cancelled)` |

**Status state machine — Verified** (`saleOrder.routes.js:22-28`, `:214-215`):
```
pending → paid | cancelled
paid    → shipped | cancelled
shipped → delivered
delivered/cancelled → (terminal)
```
Stock effects (`:218-268`): `pending→paid` decrements `stock` + writes `sale` out-transaction;
`pending→cancelled` releases reservation; `paid→cancelled` restores stock + writes `return`
in-transaction. Owner may only cancel their **own pending** order. `delivery` role may
only set `shipped`/`delivered`. `paidAt/shippedAt/deliveredAt/cancelledAt` stamped.

**Checkout note**: there is **no separate checkout/payment endpoint**. "Checkout" =
create order (reserves stock), then transition to `paid` (captures stock). No real
payment gateway integration exists (`paymentMethod` is only recorded).

**Auto-cancel — Verified** (`src/jobs/orderExpiry.js`): pending orders are reserved and
auto-cancelled after `PENDING_ORDER_TTL_HOURS` (default 24h) by a background sweeper
(interval `ORDER_EXPIRY_INTERVAL_MIN`, default 15m), releasing reservations.

### 4.7 Purchase orders & suppliers — `src/routes/purchaseOrder.routes.js`, `supplier.routes.js`

| Method & path | Auth | Permission | Notes |
|---|---|---|---|
| `GET /api/purchase-orders` | session | `purchaseOrders:read` | query `status, q, sort(createdAt\|total\|status\|receivedAt), order, page, limit`; populates `supplier, items.product` |
| `POST /api/purchase-orders` | session | `purchaseOrders:create` | `supplier(id, active), items:[{product,quantity}]` (1–50), `expectedDeliveryDate?(ISO8601)`. `unitCost` snapshotted from product `costPrice`. → 201 |
| `PATCH /api/purchase-orders/:id/status` | session | `purchaseOrders:updateStatus` | `status(draft\|ordered\|received\|cancelled)` |
| `GET /api/suppliers` | session | `suppliers:read` | query `status(active\|inactive\|all), q, sort(name\|email\|createdAt), order, page, limit` |
| `GET /api/suppliers/:id` | session | `suppliers:read` | — |
| `POST /api/suppliers` | session | `suppliers:create` | `name, email, phone?(7–15 digits, sanitized), address?`; 409 dup email |
| `PATCH /api/suppliers/:id` | session | `suppliers:update` | optional fields incl. `status(active\|inactive)` |
| `DELETE /api/suppliers/:id` | session | `suppliers:delete` | hard delete, or soft `inactive` if referenced by a PO |

**PO status machine — Verified** (`purchaseOrder.routes.js:18-23`):
```
draft → ordered | cancelled
ordered → received | cancelled
received/cancelled → (terminal)
```
`ordered→received` increments product `stock` and writes a `purchase` in-transaction.
**`GET /api/purchase-orders/:id` does not exist** (only list + create + status).

### 4.8 Delivery

**Verified: there is no dedicated delivery module.** Delivery is handled through
`saleOrders:updateDelivery`. The `delivery` role can list all sale orders and set
`shipped`/`delivered` only. There is no delivery-assignment, route, driver, or
proof-of-delivery endpoint.

### 4.9 Reports & dashboard — `src/routes/report.routes.js`

Router-level guard: `requireAuth, authorize("reports:read")` (`report.routes.js:20`).

All endpoints accept `from?(ISO8601), to?(ISO8601), format(json\|xlsx\|pdf)`;
dates are **UTC-based**, range limited to the **last 400 days**, `to` defaults to
end-of-today. `?format=xlsx|pdf` returns a file download (Content-Disposition
attachment) instead of JSON (`src/utils/reportExport.js`).

| Method & path | Returns (JSON `data`) |
|---|---|
| `GET /api/reports/dashboard` | `revenue, profit, margin, totalOrders, pendingOrders, pendingValue, cancelledOrders, totalProducts, lowStockCount, outOfStock, totalCustomers, newCustomers, totalSpend, recentOrders` |
| `GET /api/reports/sales` | `from, to, revenue, profit, margin, averageOrderValue, orders, byStatus[], trend[], topProducts[], topCustomers[]` |
| `GET /api/reports/purchases` | `from, to, spend, orders, receivedCount, bySupplier[], trend[], byStatus[]` |
| `GET /api/reports/products` | `asOf, totalProducts, lowStock[], byStatus[], byCategory[], inventoryValuation{costValue,retailValue,reservedValue,availableValue}` |
| `GET /api/reports/users` | `total, byRole[], byStatus[], mostActiveStaff[]` |
| `GET /api/reports/customers` | `total, byStatus[]` |
| `GET /api/reports/inventory` | `from, to, scope, totalProducts, mismatched, totalStockValue, movement{totalIn,totalOut,net}, items[]` |

**Business rule**: all monetary report math uses **snapshotted** `unitPrice`/`unitCost`
on order lines, not current product price (`SaleOrder.js`, `report.routes.js`).
Reports can only be viewed by roles with `reports:read` (owner/admin/manager).

### 4.10 File uploads (contract) — **Verified** (`src/middleware/upload.js`)

- Endpoints: `PATCH /api/users/profile/avatar` (field `avatar`, 1 file),
  `PATCH /api/categories/:id/image` (field `image`, 1 file),
  `PATCH /api/products/:id/images` (field `images`, ≤10 files).
- Transport: `multipart/form-data`. Max **5 MB per file**, max **10 files/request**.
- Accepted input types (sniffed by magic bytes): `image/jpeg, image/png, image/gif,
  image/webp`; anything else → 415 `UNSUPPORTED_MEDIA_TYPE`.
- Every image is **re-encoded to WebP** and resized (avatars 400×400 cover;
  categories ~1200 inside; products ~1600 inside) — `upload.js:15-19,62-75`.
- Stored filenames: `<timestamp>-<random>.webp`; persisted value is a **public URL**
  only: `/uploads/{avatars|categories|products}/<filename>`.
- Static serving: `GET /uploads/*` via `express.static` (dotfiles denied; 7-day cache
  in production) — `src/app.js:73-81`. Use the returned path directly as an `<img src>`.
- Failed/replaced uploads are cleaned up from disk (`commitUploads`/rollback logic).

---

## 5. CORS, cookies & deployment — **Verified** (`src/app.js:28-59`, `.env.example`)

- CORS is only active if `CORS_ORIGIN` (comma-separated origins) is set; then the
  backend echoes the origin with `Access-Control-Allow-Credentials: true` and exposes
  `X-Request-Id`. Allowed methods: `GET,POST,PATCH,DELETE,OPTIONS`; allowed headers:
  `Content-Type, Authorization`.
- If `CORS_ORIGIN` is empty → **same-origin only**.
- In production, `TRUST_PROXY` must be set so `secure` cookies and the rate limiter
  see the real client.
- Every response carries an `X-Request-Id` header (useful for support/debugging).

---

## 6. Integration risks, gaps & unclear contracts

**Verified gaps (no endpoint exists):**

1. **No delivery module** beyond the sale-order status patch.
2. **No purchase-order detail endpoint** (`GET /api/purchase-orders/:id` absent) —
   only list/create/status.
3. **No order edit/delete.** Sale orders are immutable except status transitions.
4. **No history endpoints** — `SaleOrderHistory`, `PurchaseOrderHistory`,
   `RoleChangeHistory` are written but never exposed.
5. **No cart, wishlist, reviews, coupons, or payment-gateway endpoints.**
6. **No password-reset / forgot-password / email-verification endpoints.**
7. **No product stock field on create/update** — initial/extra stock comes from
   `POST /api/inventory/adjust` or a received purchase order.
8. **No bulk import/export** except the report `?format=xlsx|pdf` downloads.
9. **No warehouse/multi-location concept.**
10. **`GET /api/users/profile/me` does not return `permissions`.** Unlike the
    `/api/auth/*` responses, it returns the raw user document
    (`src/routes/user.routes.js:162-164`). Prefer `/api/auth/me` for auth state so
    the permissions array is always present.

**Contracts that need care:**

- **Pagination is opt-in** — decide a consistent frontend policy (always send
  `page`/`limit` to reliably receive `meta` for tables).
- **Cost fields are conditionally present** (`costPrice`, `unitCost` removed for
  roles without `products:readCost`). Frontend types must treat these as optional.
- **`saleOrder.items[]` is an embedded snapshot**, with `product` populated on read
  (an object) but an id on write.
- **`specifications` is a `Map`** serialized as a JSON object; keys must match the
  category's `specKeys`.
- **`address` must be complete** whenever provided (all of street, city, state,
  zipCode, country non-empty) — both for user profiles and order creation.
- **Status/price transitions return 409** for illegal moves; surface these messages.

**Uncertain / to confirm with backend owner:**

- Exact session cookie name and domain attributes (not explicitly set; express-session
  default name/`path=/`). Confirm before hardcoding.
- Whether a refresh-token/long-lived session policy beyond rolling `SESSION_TTL` is
  desired for long admin sessions.
- Whether reports' `recentOrders`/`items` should be cached client-side or refetched.

**Frontend can be built now** for: auth/session, catalog browsing, categories,
product CRUD, supplier CRUD, purchase orders, sale orders + checkout status flow,
inventory view/adjust, user management, profile/avatar, and reports/dashboard with
xlsx/pdf export. **Cannot yet be built** (needs backend work): delivery management,
order history timelines, password reset, cart persistence, real payments.

---

## 7. Proposed frontend implementation sequence

1. **Foundation**: API client (base URL, `credentials: "include"`, envelope
   unwrapping, `X-Request-Id` capture, 401 handling), typed models mirroring §4,
   role→permission map (§3), auth store + session bootstrap via `GET /api/auth/me`.
2. **Auth UX**: login, register, logout, protected routes, profile (view/edit,
   password change, avatar upload with preview).
3. **Catalog**: categories list/detail + admin CRUD/image; products list (search,
   filter by category slug, sort, paginate, cost-aware display), product detail,
   admin create/edit, image manager (≤10).
4. **Orders (sales)**: order list (role-scoped), order detail, create-order/checkout
   wizard (items, address, payment method), status transition controls gated by
   role + state machine, owner-cancel.
5. **Suppliers & purchase orders**: supplier CRUD; PO list/create/status with
   receive→stock effect.
6. **Inventory**: movement list with filters, manual adjust form (with stock/reserved
   guard messaging).
7. **Users & roles**: user list/create, role-status changes with rank/creatable rules,
   role-change affordances.
8. **Reports & dashboard**: KPI dashboard, per-report views, date-range picker,
   JSON tables + xlsx/pdf download buttons; note the 400-day/UTC constraints.
9. **Polish**: error/empty/loading states mapped to error `code`s, optimistic
   guards for 409/403, accessibility, and delivery-role limited UI.

---

## 8. Verification notes

- Endpoint list cross-checked against `router.<method>(` declarations in
  `src/routes/*.js`.
- Permission matrix read verbatim from `src/config/permissions.js`.
- Response/error shapes read from `src/utils/respond.js` and `src/middleware/error.js`.
- Upload contract read from `src/middleware/upload.js` and `src/app.js`.
- No secrets or `.env` values were read or copied (only `.env.example` keys).

*End of Phase 1 audit. Phase 2 (frontend implementation) not started.*
# Authentication and Permissions

## 1. Authentication Architecture

The backend uses cookie-based authentication with Express sessions and Passport Local Strategy.

The frontend must use:

* `credentials: "include"` for API requests that require session cookies.
* The backend session as the source of truth for authentication state.
* `GET /api/auth/me` to restore the authenticated user when the application loads or refreshes.
* The existing backend endpoints for login, registration, and logout.

Do not implement token-based authentication unless the backend API contract changes.

## 2. Authentication Endpoints

### GET `/api/auth/me`

Restores the current authenticated user's session.

**Success:** `200 OK`

Returns the sanitized public user object, including the permissions array.

**Unauthenticated:** `401 Unauthorized`

The frontend must treat this response as an unauthenticated session.

### POST `/api/auth/login`

Authenticates a user.

On success, the response includes the sanitized public user object and its permissions array.

The frontend should initialize its authentication state directly from this response. An immediate additional request to `/api/auth/me` is unnecessary.

### POST `/api/auth/register`

Registers a user.

On success, the response includes the sanitized public user object and its permissions array.

The frontend should initialize its authentication state from the response if registration successfully establishes an authenticated session.

Confirm the exact registration and session behavior against the backend implementation.

### POST `/api/auth/logout`

Logs out the current user.

The frontend should clear its local authentication state after a successful logout and return the user to an appropriate public page.

Use the existing response envelope and handle errors consistently.

## 3. Public User Response

The backend's `publicUser()` helper returns a sanitized user object with the following fields:

```json
{
  "id": "user-id",
  "email": "user@example.com",
  "firstname": "First",
  "lastname": "Last",
  "role": "staff",
  "status": "active",
  "avatar": null,
  "permissions": [
    "products:read",
    "products:create"
  ]
}
```

This is an illustrative example, not a guaranteed real API response.

The documented fields are:

* `id`
* `email`
* `firstname`
* `lastname`
* `role`
* `status`
* `avatar`
* `permissions`

The backend must not expose internal fields such as `passwordChangedAt` or internal timestamps through this public user object.

The frontend should use the returned field names as documented. Do not assume that `_id`, `firstName`, or `lastName` are returned instead.

## 4. Permissions

The backend defines the role-to-permission matrix in:

`src/config/permissions.js`

The exported `permissionsFor(role)` helper resolves the permissions associated with a role.

The backend's `publicUser()` helper includes the resulting permissions array in the user object returned by:

* `GET /api/auth/me`
* `POST /api/auth/login`
* `POST /api/auth/register`

### Frontend rules

1. Use `user.permissions` returned by the backend as the source of permission data.
2. Do not duplicate the role-to-permission matrix in the frontend.
3. Do not derive permissions from `user.role` in the frontend.
4. Do not hardcode permission lists for individual roles.
5. Use the permissions array to control the visibility of navigation links, actions, buttons, and permission-restricted UI.
6. The backend remains responsible for enforcing authorization on every protected endpoint.
7. Hiding a button or route in the frontend is not a substitute for backend authorization.
8. If the user is unauthenticated, do not treat missing permissions as authorization to access protected features.
9. When permissions are missing or malformed, fail closed for permission-restricted UI rather than granting access.

### Example permission check

```js
export function hasPermission(user, permission) {
  return Array.isArray(user?.permissions) &&
    user.permissions.includes(permission);
}
```

Example usage:

```jsx
{hasPermission(user, "products:create") && (
  <button>Add Product</button>
)}
```

This example illustrates the intended behavior. The actual implementation should be introduced in the authentication and authorization phase, not the frontend foundation phase.

## 5. Known Roles

The backend currently defines these roles:

* `owner`
* `admin`
* `manager`
* `staff`
* `delivery`
* `customer`

The frontend may use `user.role` for role-specific presentation or workflows where appropriate, but permissions must come from `user.permissions`.

Do not assume every user with a particular role can access an action without checking the actual permission returned by the backend.

## 6. Authentication State Lifecycle

### Application initialization

1. Start with an authentication state that distinguishes between loading, authenticated, and unauthenticated.
2. Request `GET /api/auth/me` to check whether a valid session exists.
3. If the response is `200`, store the returned public user object, including permissions.
4. If the response is `401`, treat the user as unauthenticated.
5. Handle network errors and unexpected server errors separately from `401`; do not automatically assume that every server error means the user is logged out.

### Login

1. Submit credentials to `POST /api/auth/login`.
2. On success, store the returned public user object and permissions.
3. Avoid an unnecessary immediate `/api/auth/me` request.
4. On failure, display the appropriate API error without storing an authenticated user.

### Registration

1. Submit registration data to `POST /api/auth/register`.
2. Follow the actual response contract and session behavior.
3. If registration establishes an authenticated session, initialize authentication state from the returned public user object.
4. If registration does not establish a session, do not assume the user is authenticated.

### Logout

1. Call `POST /api/auth/logout`.
2. Clear local authentication state after successful logout.
3. Ensure protected UI is no longer accessible through the frontend.
4. Continue relying on the backend to enforce session and authorization rules.

## 7. Response Envelope

All API requests must follow the backend's documented response envelope.

Success:

```json
{
  "ok": true,
  "data": {}
}
```

Error:

```json
{
  "ok": false,
  "error": {
    "message": "Error message",
    "code": "UNAUTHORIZED"
  }
}
```

These examples are illustrative. Preserve any optional fields returned by the actual API.

The API client should handle the envelope consistently and make validation details available to the UI when present.

## 8. Implementation Boundary

During the frontend foundation phase:

* Do not implement authentication flows.
* Do not implement permission checks.
* Do not create a hardcoded role-to-permission mapping.
* Only establish the application structure and design foundation.

During the authentication phase:

* Implement the API client.
* Implement authentication state and session restoration.
* Use the public user object returned by the backend.
* Implement permission checks using the returned permissions array.
* Implement protected routes and permission-aware UI.
* Keep backend authorization as the security authority.

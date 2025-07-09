
#  Laravel API Authentication: JWT vs Sanctum (Token-Based vs Session-Based)

##  1. Overview of JWT and Sanctum

### 🟣 **JWT (JSON Web Token)**

JWT is a stateless authentication mechanism used to securely transmit information between parties as a JSON object. The server issues a **signed token** on login, and the client sends it with every request.

* **Type**: Token-based, stateless
* **Use case**: Mobile apps, third-party APIs, microservices

### 🟢 **Laravel Sanctum**

Sanctum is Laravel’s official lightweight authentication system for APIs. It supports **two modes**:

1. **Token-based authentication** — for mobile apps or external API consumers
2. **Session-based authentication** — for SPAs using Laravel and Vue/React

---

##  2. Comparison Table: JWT vs Sanctum (Token + Session)

| Feature          | JWT                            | Sanctum (Token-Based)           | Sanctum (Session-Based)                              |
| ---------------- | ------------------------------ | ------------------------------- | ---------------------------------------------------- |
| Stateless        | ✅ Yes                          | ✅ Yes                           | ❌ No (uses session cookies)                          |
| Storage          | Client-side (localStorage)     | Client-side (localStorage)      | Cookie-based session                                 |
| Token Format     | Encrypted JWT (header.payload) | Plaintext personal access token | Session cookie with CSRF                             |
| Token Revocation | ❌ Difficult (manual logic)     | ✅ Easy (DB token deletion)      | ✅ Session logout or expiry                           |
| CSRF Protection  | ❌ Not built-in                 | ❌ Not needed                    | ✅ Required (via `/sanctum/csrf-cookie`)              |
| Login Response   | JWT token                      | Plaintext API token             | Session cookie + CSRF                                |
| Route Middleware | `auth:api`                     | `auth:sanctum`                  | `auth:sanctum` + `EnsureFrontendRequestsAreStateful` |
| Best For         | Mobile, external APIs          | Mobile, Postman, external APIs  | SPA using Laravel + Vue/React                        |

---

## 3. Sanctum Token Types Explained

### A. Token-Based (Stateless)

* **What it is**: Laravel issues a personal access token stored in the `personal_access_tokens` table.
* **Usage**: Call `createToken()` method:

  ```php
  $token = $user->createToken('api-token')->plainTextToken;
  ```
* **Client stores**: Token in localStorage or sends with `Authorization: Bearer <token>`
* **Revocation**: Delete token from DB.

###  B. Session-Based (SPA Mode)

* **What it is**: Uses Laravel’s built-in session + CSRF protection.
* **Workflow**:

  1. Frontend calls `/sanctum/csrf-cookie`
  2. Frontend logs in via `/login`
  3. Laravel issues session cookie
  4. Client uses session to call protected routes
* **No token needed** from the client manually.

---

##  4. Use Case Summary

| Use Case                                | Recommended Method           |
| --------------------------------------- | ---------------------------- |
| SPA with same domain as backend         | Sanctum (Session-based)      |
| Mobile app (iOS/Android)                | Sanctum (Token-based) or JWT |
| Third-party app consuming your API      | JWT or Sanctum (Token-based) |
| Easy token revocation required          | Sanctum (Token-based)        |
| Very secure token verification required | JWT                          |

---

##  5. Getting User Info in Each Case

### 🔸 JWT:

```php
Route::middleware('auth:api')->get('/user', fn(Request $request) => $request->user());
```

Client sends:

```
Authorization: Bearer <jwt_token>
```

###  Sanctum (Token-based or Session-based):

```php
Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());
```

Client sends:

* Token in `Authorization: Bearer <token>` **(Token-based)**
* Nothing extra if using session **(Session-based)**

---

## 6. Conclusion

| You want...                        | Use this          |
| ---------------------------------- | ----------------- |
| Simpler setup with Laravel         | Sanctum           |
| Token revocation and tracking      | Sanctum (Token)   |
| Session + CSRF protection for SPA  | Sanctum (Session) |
| Stateless API for external clients | JWT or Sanctum    |
| Strong industry-standard security  | JWT               |


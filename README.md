# Next Auth v5 - Advanced Guide

![293493179-d0175397-8c3f-4e82-91c4-78c14f29bb81](https://github.com/hirenW2606/Next-Authentication-v5/assets/37996917/c3a726c1-e630-497a-90f2-5a3be90e5b4e)

This is a repository for Next Auth v5 - Advanced Guide (2024)

Key Features:
- 🔐 Next-auth v5 (Auth.js): Leveraging the power of the latest authentication library.
- 🚀 Next.js 14 with server actions: Enhancing the application with server-side capabilities.
- 🔑 Credentials Provider: Securely handle credentials for authentication.
- 🌐 OAuth Provider (Social login with Google & GitHub): Enable seamless social logins.
- 🔒 Forgot password functionality: Implement a robust password recovery system.
- ✉️ Email verification: Ensure user email authenticity.
- 📱 Two-factor verification: Strengthen security with two-factor authentication.
- 👥 User roles (Admin & User): Manage different user roles.
- 🔓 Login component (Opens in redirect or modal): Flexible login options.
- 📝 Register component: User registration with ease.
- 🤔 Forgot password component: Streamlined password recovery process.
- ✅ Verification component: Verify user actions.
- ⚠️ Error component: Gracefully handle errors.
- 🔘 Login button: Intuitive login UI.
- 🚪 Logout button: Simple logout mechanism.
- 🚧 Role Gate: Control access based on user roles.
- 🔍 Exploring next.js middleware: Harness the power of middleware functions.
- 📈 Extending & Exploring next-auth session: Customize and extend user sessions.
- 🔄 Exploring next-auth callbacks: Implement callbacks for authentication events.
- 👤 useCurrentUser hook: Convenient hook for accessing the current user.
- 🛂 useRole hook: Simplify role-based functionality.
- 🧑 currentUser utility: Utility function for user-related tasks.
- 👮 currentRole utility: Utility function for role-related tasks.
- 🖥️ Example with server component: Demonstrate usage with server-side components.
- 💻 Example with client component: Showcase implementation with client-side components.
- 👑 Render content for admins using RoleGate component: Dynamically render content based on user roles.
- 🛡️ Protect API Routes for admins only: Ensure secure access to admin-only API routes.
- 🔐 Protect Server Actions for admins only: Secure server actions for administrators.
- 📧 Change email with new verification in Settings page: Enable users to update their email address.
- 🔑 Change password with old password confirmation in Settings page: Implement a secure password change process.
- 🔔 Enable/disable two-factor auth in Settings page: Give users control over two-factor authentication.
- 🔄 Change user role in Settings page (for development purposes only): Adjust user roles for testing and development.

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |

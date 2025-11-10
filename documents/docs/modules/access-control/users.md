# Users

Manage user accounts for the admin panel and frontend with role-aware safeguards.

## Overview
- Create and edit users with role assignment, excluding `super_admin`
- Toggle email verification, verify manually, and reset passwords from the table
- Bulk delete respects super-admin protection and sends feedback notifications
- Export user lists to PDF/XLSX/CSV when auditing accounts

## Typical actions
1. Create a user and set a password (hashed automatically)
2. Assign an appropriate role from the allowed list
3. Use quick actions to verify email or change password

## Related
- See [Roles & Permissions](/modules/access-control/roles-permissions)
- See [Password Policy Settings](/modules/access-control/password-policy-settings)

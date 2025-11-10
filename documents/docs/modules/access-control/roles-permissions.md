# Roles & Permissions

Control access using role-based permissions, with guards for system roles.

## Form highlights
- Edit role name and guard; defaults to the `web` guard
- System roles (`super_admin`, `admin`, `user`) stay locked against edits or deletion

## Table notes
- Columns show role name, guard, and last update timestamp
- Actions limited to safe edits/deletes based on role protection

## Tips
- Prefer least privilege
- Audit changes regularly in [Activity Logs](/modules/system/activity-logs)

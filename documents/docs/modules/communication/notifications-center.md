# Notifications Center

Let each user control which channels they receive system notifications through.

## Features
- Auto-seeds notification preferences (e.g., `contact_us`) per user
- Toggle Email, SMS, and Web Notification channels individually
- Saves changes immediately and confirms via toast notification

## Notes
- Preferences are stored per permission name for the signed-in user
- Web notifications correspond to in-app/bell alerts
- Ensure related permissions exist before exposing new toggles

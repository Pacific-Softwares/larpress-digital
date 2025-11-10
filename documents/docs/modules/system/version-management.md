# Version Management

View the current application release, review changelog notes, and apply updates safely.

## Dashboard
- Shows the installed version (currently `3.x`) alongside release channel info
- Links to the changelog so you can review new features and fixes before upgrading

## Maintenance actions
- Run database migrations or maintenance scripts after pulling new code
- Trigger update commands (queue/cache clears) in a guided order
- Download update artifacts (if available) before switching environments

## Tips
- Always back up the database and storage before running updates
- Review module-specific upgrade notes if the release touches critical features
- Confirm queue workers and cron jobs are restarted post upgrade

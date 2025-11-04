# API Authentication

LarPress uses Laravel Sanctum for API authentication with token-based access.

## Generating API Tokens

### Via Admin Panel

1. Go to **Access Control** → **API Tokens**
2. Click **Create Token**
3. Set token name and permissions
4. Copy the generated token (shown only once!)

### Via Code

```php
$token = $user->createToken('Mobile App', [
    'read:content',
    'write:content'
])->plainTextToken;
```

## Making Authenticated Requests

Include the token in the `Authorization` header:

```bash
curl -X GET https://your-domain.com/api/content \
  -H "Authorization: Bearer your-token-here"
```

## Token Abilities

### Available Abilities

```php
[
    // Content
    'read:content',
    'write:content',
    'delete:content',
    
    // Users
    'read:users',
    'write:users',
    'delete:users',
    
    // Media
    'read:media',
    'write:media',
    'delete:media',
    
    // Settings
    'read:settings',
    'write:settings',
]
```

### Checking Abilities

```php
if ($user->tokenCan('write:content')) {
    // User has permission
}
```

## API Endpoints

### Authentication

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "token": "1|xyz...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Get Current User

```http
GET /api/auth/user
Authorization: Bearer {token}
```

### Content

#### List Content

```http
GET /api/content
Authorization: Bearer {token}
```

Parameters:
- `page` - Page number
- `per_page` - Items per page (max 100)
- `status` - Filter by status
- `type` - Filter by content type

#### Get Single Content

```http
GET /api/content/{id}
Authorization: Bearer {token}
```

#### Create Content

```http
POST /api/content
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My New Post",
  "content": "Post content here",
  "status": "published",
  "type": "post"
}
```

#### Update Content

```http
PUT /api/content/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Content

```http
DELETE /api/content/{id}
Authorization: Bearer {token}
```

### Media

#### Upload Media

```http
POST /api/media
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: (binary)
```

#### List Media

```http
GET /api/media
Authorization: Bearer {token}
```

## Rate Limiting

API requests are rate-limited:

- **Authenticated**: 60 requests per minute
- **Unauthenticated**: 10 requests per minute

Headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
```

## Error Handling

### Error Response Format

```json
{
  "message": "Error description",
  "errors": {
    "field": ["Validation error"]
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Server Error |

## Code Examples

### JavaScript (Fetch)

```javascript
const API_URL = 'https://your-domain.com/api';
const TOKEN = 'your-token-here';

// Get content
async function getContent() {
  const response = await fetch(`${API_URL}/content`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Accept': 'application/json'
    }
  });
  
  return await response.json();
}

// Create content
async function createPost(data) {
  const response = await fetch(`${API_URL}/content`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return await response.json();
}
```

### PHP (Guzzle)

```php
use GuzzleHttp\Client;

$client = new Client([
    'base_uri' => 'https://your-domain.com/api/',
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Accept' => 'application/json',
    ]
]);

// Get content
$response = $client->get('content');
$data = json_decode($response->getBody(), true);

// Create content
$response = $client->post('content', [
    'json' => [
        'title' => 'New Post',
        'content' => 'Content here',
    ]
]);
```

### Python (Requests)

```python
import requests

API_URL = 'https://your-domain.com/api'
TOKEN = 'your-token-here'

headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Accept': 'application/json'
}

# Get content
response = requests.get(f'{API_URL}/content', headers=headers)
data = response.json()

# Create content
response = requests.post(
    f'{API_URL}/content',
    headers=headers,
    json={
        'title': 'New Post',
        'content': 'Content here'
    }
)
```

## Best Practices

### 1. Secure Token Storage

Never expose tokens in:
- Frontend code
- Version control
- Public repositories
- Client-side storage (use httpOnly cookies)

### 2. Use HTTPS

Always use HTTPS in production to encrypt token transmission.

### 3. Token Rotation

Regularly rotate API tokens for security.

### 4. Minimal Permissions

Grant only necessary abilities to each token.

### 5. Handle Rate Limits

Implement exponential backoff when hitting rate limits.

### 6. Error Handling

Always handle API errors gracefully in your application.

## Next Steps

- [API Endpoints Reference](/api/users)
- [Rate Limiting](/api/rate-limiting)
- [Error Handling](/api/error-handling)


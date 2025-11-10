# Creating Modules

Learn how to create your first larpress module from scratch.

## Generate Module

Use the artisan command to generate a module structure:

```bash
php artisan module:make Blog
```

This creates:

```
modules/Blog/
├── Config/
├── Database/
├── Http/
├── Models/
├── Providers/
├── Resources/
├── Routes/
├── module.json
└── composer.json
```

## Module Configuration

Edit `module.json`:

```json
{
  "name": "Blog",
  "alias": "blog",
  "description": "A full-featured blog module",
  "version": "1.0.0",
  "author": "Your Name",
  "email": "your@email.com",
  "active": true,
  "providers": [
    "Modules\\Blog\\Providers\\BlogServiceProvider"
  ],
  "requires": {
    "larpress": "^1.0"
  }
}
```

## Service Provider

`Providers/BlogServiceProvider.php`:

```php
<?php

namespace Modules\Blog\Providers;

use Illuminate\Support\ServiceProvider;

class BlogServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php', 'blog'
        );
    }

    public function boot()
    {
        // Register routes
        $this->loadRoutesFrom(__DIR__.'/../Routes/web.php');
        $this->loadRoutesFrom(__DIR__.'/../Routes/api.php');
        
        // Register views
        $this->loadViewsFrom(__DIR__.'/../Resources/views', 'blog');
        
        // Register migrations
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');
        
        // Register translations
        $this->loadTranslationsFrom(__DIR__.'/../Resources/lang', 'blog');
        
        // Publish assets
        $this->publishes([
            __DIR__.'/../Assets' => public_path('modules/blog'),
        ], 'blog-assets');
        
        // Publish config
        $this->publishes([
            __DIR__.'/../Config/config.php' => config_path('blog.php'),
        ], 'blog-config');
    }
}
```

## Models

`Models/Post.php`:

```php
<?php

namespace Modules\Blog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'status',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->where('published_at', '<=', now());
    }
}
```

## Migrations

`Database/Migrations/2024_01_01_000000_create_posts_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
```

## Controllers

`Http/Controllers/PostController.php`:

```php
<?php

namespace Modules\Blog\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Blog\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::published()
                    ->with('author', 'categories')
                    ->latest('published_at')
                    ->paginate(10);

        return view('blog::posts.index', compact('posts'));
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)
                   ->published()
                   ->firstOrFail();

        return view('blog::posts.show', compact('post'));
    }
}
```

## Routes

`Routes/web.php`:

```php
<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\PostController;

Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('index');
    Route::get('/{slug}', [PostController::class, 'show'])->name('show');
});
```

`Routes/admin.php`:

```php
<?php

use Modules\Blog\Filament\Resources\PostResource;

// FilamentPHP will auto-discover resources
// No manual route registration needed
```

## Filament Resources

`Filament/Resources/PostResource.php`:

```php
<?php

namespace Modules\Blog\Filament\Resources;

use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Modules\Blog\Models\Post;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Blog';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                
                Forms\Components\RichEditor::make('content')
                    ->required()
                    ->columnSpan('full'),
                
                Forms\Components\Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
                
                Forms\Components\DateTimePicker::make('published_at'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'draft',
                        'success' => 'published',
                        'danger' => 'archived',
                    ]),
                
                Tables\Columns\TextColumn::make('author.name'),
                
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
            ]);
    }
}
```

## Views

`Resources/views/posts/index.blade.php`:

```blade
@extends('blog::layouts.app')

@section('content')
    <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8">Blog</h1>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($posts as $post)
                <article class="bg-white rounded-lg shadow-md overflow-hidden">
                    @if($post->featured_image)
                        <img src="{{ asset($post->featured_image) }}" 
                             alt="{{ $post->title }}" 
                             class="w-full h-48 object-cover">
                    @endif

                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-2">
                            <a href="{{ route('blog.show', $post->slug) }}">
                                {{ $post->title }}
                            </a>
                        </h2>

                        <p class="text-gray-600 mb-4">
                            {{ $post->excerpt }}
                        </p>

                        <div class="flex justify-between items-center text-sm text-gray-500">
                            <span>{{ $post->author->name }}</span>
                            <span>{{ $post->published_at->format('M d, Y') }}</span>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>

        <div class="mt-8">
            {{ $posts->links() }}
        </div>
    </div>
@endsection
```

## Config

`Config/config.php`:

```php
<?php

return [
    'posts_per_page' => 10,
    'excerpt_length' => 200,
    'enable_comments' => true,
    'cache_duration' => 3600,
];
```

## Activate Module

```bash
# Run migrations
php artisan module:migrate Blog

# Publish assets
php artisan module:publish Blog

# Enable module
php artisan module:enable Blog
```

## Testing

`Tests/Feature/PostTest.php`:

```php
<?php

namespace Modules\Blog\Tests\Feature;

use Tests\TestCase;
use Modules\Blog\Models\Post;

class PostTest extends TestCase
{
    public function test_can_view_blog_index()
    {
        $response = $this->get(route('blog.index'));
        $response->assertStatus(200);
    }

    public function test_can_view_published_post()
    {
        $post = Post::factory()->published()->create();
        
        $response = $this->get(route('blog.show', $post->slug));
        $response->assertStatus(200);
        $response->assertSee($post->title);
    }
}
```

Run tests:

```bash
php artisan test --testsuite=Module:Blog
```

## Next Steps

- [Module Structure](/modules/structure)
- [Routes & Controllers](/modules/routes-controllers)
- [Database & Migrations](/modules/database)
- [Publishing Modules](/modules/publishing)


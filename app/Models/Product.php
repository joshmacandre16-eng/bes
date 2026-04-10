<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\Review;
use App\Models\Cart;

class Product extends Model

{
    use SoftDeletes;

    protected $fillable = [
        'seller_id', 'name', 'slug', 'description', 'price', 'original_price',
        'stock', 'sold_count', 'main_image', 'gallery_images', 'variants',
        'status', 'is_featured', 'meta_title', 'meta_description',
        'rating_avg', 'review_count'
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'variants' => 'array',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'rating_avg' => 'decimal:2',
    ];

    public function seller()
    {
        return $this->belongsTo(SellerProfile::class, 'seller_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function cartItems()
    {
        return $this->hasMany(Cart::class);
    }

    public function updateRating(): void
    {
        $this->rating_avg = $this->reviews()->avg('rating') ?? 0;
        $this->review_count = $this->reviews()->count();
        $this->save();
        
        // Update seller rating
        $this->seller->updateRating();
    }

    public function decreaseStock(int $quantity): void
    {
        $this->decrement('stock', $quantity);
        $this->increment('sold_count', $quantity);
        
        if ($this->stock <= 0) {
            $this->status = 'out_of_stock';
            $this->save();
        }
    }

    public function increaseStock(int $quantity): void
    {
        $this->increment('stock', $quantity);
        
        if ($this->stock > 0 && $this->status === 'out_of_stock') {
            $this->status = 'active';
            $this->save();
        }
    }

    public function getDiscountedPriceAttribute(): float
    {
        if ($this->original_price && $this->original_price > $this->price) {
            return $this->original_price - $this->price;
        }
        return 0;
    }

    public function getDiscountPercentageAttribute(): float
    {
        if ($this->original_price && $this->original_price > 0) {
            return round((($this->original_price - $this->price) / $this->original_price) * 100);
        }
        return 0;
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }
}


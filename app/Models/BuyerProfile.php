<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuyerProfile extends Model
{
    protected $table = 'buyer_profiles';
    
    protected $fillable = [
        'user_id', 'loyalty_points', 'total_spent', 'order_count',
        'preferred_payment_method', 'wishlist', 'saved_cards', 
        'newsletter_subscribed'
    ];

    protected $casts = [
        'wishlist' => 'array',
        'saved_cards' => 'array',
        'total_spent' => 'decimal:2',
        'newsletter_subscribed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function addPoints(int $points): void
    {
        $this->increment('loyalty_points', $points);
    }

    public function redeemPoints(int $points): bool
    {
        if ($this->loyalty_points >= $points) {
            $this->decrement('loyalty_points', $points);
            return true;
        }
        return false;
    }

    public function addToWishlist(int $productId): void
    {
        $wishlist = $this->wishlist ?? [];
        if (!in_array($productId, $wishlist)) {
            $wishlist[] = $productId;
            $this->wishlist = $wishlist;
            $this->save();
        }
    }

    public function removeFromWishlist(int $productId): void
    {
        $wishlist = $this->wishlist ?? [];
        if (($key = array_search($productId, $wishlist)) !== false) {
            unset($wishlist[$key]);
            $this->wishlist = array_values($wishlist);
            $this->save();
        }
    }

    public function updateSpending(float $amount): void
    {
        $this->increment('total_spent', $amount);
        $this->increment('order_count');
        
        // Award loyalty points (1 point per $10 spent)
        $points = floor($amount / 10);
        if ($points > 0) {
            $this->addPoints($points);
        }
    }
}


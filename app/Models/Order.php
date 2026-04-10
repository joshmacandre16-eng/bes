<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

use App\Models\Address;
use App\Models\CourierProfile;
use App\Models\OrderItem;
use App\Models\Review;
use App\Models\Return;
use App\Models\SellerProfile;
use App\Models\User;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'buyer_id',
        'seller_id',
        'subtotal',
        'shipping_fee',
        'discount_amount',
        'tax_amount',
        'total_amount',
        'payment_method',
        'payment_status',
        'paid_at',
        'shipping_address_id',
        'courier_id',
        'tracking_number',
        'status',
        'confirmed_at',
        'processed_at',
        'shipped_at',
        'delivered_at',
        'completed_at',
        'cancelled_at',
        'buyer_note',
        'seller_note'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_fee' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'processed_at' => 'datetime',
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Order $order): void {
            $order->order_number = 'ORD-' . strtoupper(Str::random(10));
        });
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(SellerProfile::class, 'seller_id');
    }

    public function shippingAddress(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'shipping_address_id');
    }

    public function courier(): BelongsTo
    {
        return $this->belongsTo(CourierProfile::class, 'courier_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }

    public function returnRequest(): HasOne
    {
        return $this->hasOne(ReturnRequest::class);
    }

    // State machine methods
    public function markAsPaid(): void
    {
        $this->update([
            'payment_status' => 'paid',
            'paid_at' => now(),
            'status' => 'paid'
        ]);
    }

    public function markAsProcessing(): void
    {
        $this->update([
            'status' => 'processing',
            'processed_at' => now()
        ]);
    }

    public function markAsShipped(string $trackingNumber, int $courierId): void
    {
        $this->update([
            'status' => 'shipped',
            'tracking_number' => $trackingNumber,
            'courier_id' => $courierId,
            'shipped_at' => now()
        ]);
    }

    public function markAsDelivered(): void
    {
        $this->update([
            'status' => 'delivered',
            'delivered_at' => now()
        ]);
    }

    public function markAsCompleted(): void
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now()
        ]);
    }

    public function cancel(): void
    {
        $this->update([
            'status' => 'cancelled',
            'cancelled_at' => now()
        ]);
    }

    public function canBeCancelled(): bool
    {
        return in_array($this->status, ['pending_payment', 'paid']);
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending_payment' => 'yellow',
            'paid' => 'blue',
            'processing' => 'purple',
            'shipped' => 'orange',
            'delivered' => 'green',
            'completed' => 'emerald',
            'cancelled' => 'red',
            default => 'gray',
        };
    }
}


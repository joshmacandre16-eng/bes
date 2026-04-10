<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = [
        'seller_id', 'code', 'type', 'value', 'min_order_amount',
        'max_discount', 'usage_limit', 'used_count', 'valid_from',
        'valid_until', 'is_active'
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'min_order_amount' => 'decimal:2',
        'max_discount' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function seller()
    {
        return $this->belongsTo(SellerProfile::class, 'seller_id');
    }

    public function isValid()
    {
        return $this->is_active &&
               now()->between($this->valid_from, $this->valid_until) &&
               $this->used_count < $this->usage_limit;
    }
}


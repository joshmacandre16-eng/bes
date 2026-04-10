<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    protected $fillable = [
        'seller_id', 'order_id', 'amount', 'fee', 'net_amount',
        'status', 'paid_at', 'reference_id', 'notes'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'fee' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function seller()
    {
        return $this->belongsTo(SellerProfile::class, 'seller_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}


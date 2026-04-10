<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Payout;
use App\Models\Voucher;

class SellerProfile extends Model

{
    protected $table = 'seller_profiles';
    
    protected $fillable = [
        'user_id', 'store_name', 'store_slug', 'store_logo', 'store_banner',
        'store_description', 'business_license', 'tax_id', 'bank_account_name',
        'bank_account_number', 'bank_name', 'verification_status', 'is_open',
        'commission_rate', 'total_sales', 'total_revenue', 'rating_avg',
        'response_rate', 'response_time'
    ];

    protected $casts = [
        'is_open' => 'boolean',
        'commission_rate' => 'decimal:2',
        'total_revenue' => 'decimal:2',
        'rating_avg' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'seller_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class, 'seller_id');
    }

    public function vouchers()
    {
        return $this->hasMany(Voucher::class, 'seller_id');
    }

    public function updateRating(): void
    {
        $this->rating_avg = $this->products()->avg('rating_avg') ?? 0;
        $this->save();
    }

    public function calculateEarnings(float $orderTotal): array
    {
        $commission = $orderTotal * ($this->commission_rate / 100);
        return [
            'total' => $orderTotal,
            'commission' => $commission,
            'net' => $orderTotal - $commission
        ];
    }

    public function updateSalesMetrics(): void
    {
        $completedOrders = $this->orders()
            ->where('status', 'completed')
            ->get();
        
        $this->total_sales = $completedOrders->count();
        $this->total_revenue = $completedOrders->sum('total_amount');
        $this->save();
    }

    public function isVerified(): bool
    {
        return $this->verification_status === 'approved';
    }
}


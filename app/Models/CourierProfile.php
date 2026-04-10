<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourierProfile extends Model
{
    protected $table = 'courier_profiles';

    protected $fillable = [
        'user_id', 'full_name', 'national_id', 'driver_license', 'vehicle_type',
        'vehicle_plate', 'service_area', 'current_latitude', 'current_longitude',
        'is_online', 'verification_status', 'total_deliveries', 'rating_avg',
        'acceptance_rate', 'on_time_rate'
    ];

    protected $casts = [
        'service_area' => 'array',
        'current_latitude' => 'decimal:8',
        'current_longitude' => 'decimal:8',
        'is_online' => 'boolean',
        'rating_avg' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'courier_id');
    }

    public function updateLocation(float $lat, float $long): self
    {
        $this->update([
            'current_latitude' => $lat,
            'current_longitude' => $long,
        ]);
        return $this;
    }

    public function goOnline(): self
    {
        $this->update(['is_online' => true]);
        return $this;
    }

    public function goOffline(): self
    {
        $this->update(['is_online' => false]);
        return $this;
    }

    public function isVerified(): bool
    {
        return $this->verification_status === 'approved';
    }

    public function updateStats(): void
    {
        $this->total_deliveries = $this->orders()->where('status', 'delivered')->count();
        $this->rating_avg = $this->orders()->avg('rating') ?? 5.00;
        $this->save();
    }
}


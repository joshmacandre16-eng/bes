<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'user_id', 'type', 'recipient_name', 'phone',
        'address_line1', 'address_line2', 'city',
        'postal_code', 'state', 'country', 'is_default'
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'shipping_address_id');
    }

    public function setAsDefault()
    {
        Address::where('user_id', $this->user_id)->update(['is_default' => false]);
        $this->update(['is_default' => true]);
    }
}



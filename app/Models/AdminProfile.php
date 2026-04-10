<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ActivityLog;

class AdminProfile extends Model

{
    protected $table = 'admin_profiles';

    protected $fillable = [
        'user_id', 'position', 'department', 'permissions', 'last_action_at'
    ];

    protected $casts = [
        'permissions' => 'array',
        'last_action_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->permissions ?? []);
    }

    public function logAction(string $action, array $details = []): void
    {
        $this->update(['last_action_at' => now()]);
        // Log to activity_logs
        \App\Models\ActivityLog::create([
            'user_id' => $this->user_id,
            'role' => 'admin',
            'action' => $action,
            'details' => $details,
        ]);
    }
}


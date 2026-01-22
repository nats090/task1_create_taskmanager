<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id',   // 👈 important: ties task to a specific user
    ];

    /**
     * Relationship: each task belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

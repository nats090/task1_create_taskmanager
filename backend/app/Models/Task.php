<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'admin_id', // track which admin created the task
    ];

    /**
     * Many-to-many relationship: employees assigned to this task
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'task_user');
    }

    /**
     * Each task belongs to one admin (creator)
     */
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'role',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Many-to-many: tasks assigned to this employee
     */
    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_user');
    }

    /**
     * One-to-many: tasks created by this admin
     */
    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'admin_id');
    }
}

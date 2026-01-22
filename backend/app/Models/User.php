<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // if you plan to use token-based auth

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'role',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays / JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Relationship: a user can have many tasks.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
        // If you really want many-to-many, keep belongsToMany(Task::class)
        // but usually it's hasMany for "user owns tasks"
    }
}

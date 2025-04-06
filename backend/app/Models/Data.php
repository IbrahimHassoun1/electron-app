<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'steps',
        'distance_km',
        'active_minutes',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
protected $fillable = ['ip_address', 'country', 'region', 'city', 'longitude', 'latitude','type','success','user_id'];
}

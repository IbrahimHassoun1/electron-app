<?php

namespace App\Http\Controllers;

use \App\Models\Log;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;

class LogController extends Controller
{
    public static function addLog($ip,$type,$success,$id)
    {
        $location = Location::get($ip);
        $logData = [
            'ip_address' => $ip,
            'country' => $location ? $location->countryName : null,
            'region' => $location ? $location->regionName : null,
            'city' => $location ? $location->cityName : null,
            'longitude' => $location ? $location->longitude : null,
            'latitude' => $location ? $location->latitude : null,
            'type' => $type,
            'success' => $success,
            'user_id' => $id
        ];
        
        if(!Log::create($logData)){
            throw new \Exception('Failed to create log entry');
        };



    }
}

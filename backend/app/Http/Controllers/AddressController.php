<?php

namespace App\Http\Controllers;

use App\Providers\AddressServiceProvider;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public static function createAddress(array $info)
    {
        try {
            $address = AddressServiceProvider::createAddress($info);
            return ['success' => true, 'message' => 'Address created successfully', 'data' => $address];


        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'Failed to create address: ' . $e->getMessage()];
        }
    }
}

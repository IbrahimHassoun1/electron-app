<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Address;

class AddressServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public static function createAddress(array $info)
    {
        ['country' => $country, 'city' => $city, 'street' => $street] = $info;
        $saved = Address::create([
            'country' => $country,
            'city' => $city,
            'street' => $street,
        ]);
        if (!$saved) {
            throw new \RuntimeException('Failed to create address');
        }
        return $saved;
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

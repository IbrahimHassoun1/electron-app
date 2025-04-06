<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Services\CustomAuthProvider;

class UserServicesProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */


    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Auth::provider('custom', function ($app, array $config) {
            return new CustomAuthProvider($app['hash'], $config['model']);
        });
    }
}
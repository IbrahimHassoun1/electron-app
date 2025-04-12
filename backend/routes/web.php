<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware; // Ensure this is the correct namespace for CorsMiddleware


Route::middleware(['web'])->group(function () {
    Route::get('/login/google', function () {
        return Socialite::driver('google')->redirect();
    })->middleware(CorsMiddleware::class);

    Route::get('/login/google/callback', [AuthController::class, 'OAuth2']);
});


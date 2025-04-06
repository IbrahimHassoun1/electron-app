<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->group(function () {
    Route::get('/login/google', function () {
        return Socialite::driver('google')->redirect();
    });

    Route::get('/login/google/callback', [AuthController::class, 'OAuth2']);
});


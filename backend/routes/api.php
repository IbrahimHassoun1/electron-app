<?php
use App\Http\Controllers\CsvController;
use App\Http\Controllers\DataController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\AuthorizationController;
use App\Models\User;

Route::group(['prefix' => 'v0.1'], function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/csv/upload', action: [CsvController::class, 'upload']);
    Route::get('/data', [DataController::class, 'getData']);

});


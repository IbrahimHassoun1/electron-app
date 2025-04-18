<?php


use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware; 
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;

Route::middleware(['web'])->group(function () {
    Route::get('/login/google', function () {
        return Socialite::driver('google')->redirect();
    })->middleware(CorsMiddleware::class);

    Route::get('/login/google/callback', [AuthController::class, 'OAuth2']);
});
Route::get('/test',function(Request $request){
    event(new \App\Events\PublicChannelEvent($request));
    
    return 'done';
});
Route::get('/',function(){
    return Location::get('94.187.18.156');
});
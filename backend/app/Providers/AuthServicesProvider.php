<?php

namespace App\Providers;

use Exception;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\throwException;



class AuthServicesProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {

    }

    public static function signup($userData)
    {
        try {
            $userData['password'] = bcrypt($userData['password']);
            $user = User::create($userData);
            $user['token'] = JWTAuth::fromUser($user);
            return $user;
        } catch (\Illuminate\Database\QueryException $e) {
            throw new Exception("Database error during signup: " . $e->getMessage());
        } catch (Exception $e) {
            throw new Exception("Error during signup: " . $e->getMessage());
        }

    }

    public static function login($userData)
    {
        try {

            if (!$token = JWTAuth::attempt($userData)) {
                throwException("Invalid email or password");
                // return response()->json([
                //     "message" => "Invalid email or password",
                // ], 401);
            }

            $user = JWTAuth::user();
            $user['token'] = $token;
            return $user;
        } catch (Exception $e) {
            return response()->json([
                "message" => "error: " . $e->getMessage(),
            ]);
        }
    }

    public static function OAuth2($googleUser)
    {
        try {
            $user = User::updateOrCreate(
                [
                    'email' => $googleUser->getEmail(),
                ],
                [
                    'phone' => '0000000000',
                    'first_name' => 'first_name',
                    'last_name' => 'last_name',
                    'date_of_birth' => '1999-01-01',
                    'place_of_birth' => 'unknown',
                    'google_id' => $googleUser->getId(),
                    'password' => bcrypt('random_password'),
                    'password_confirmation' => bcrypt('random_password'),
                    'street' => 'Default Street',
                    'city' => 'Default City',
                    'country' => 'Default Country',

                ]
            );

            Auth::login($user);

            return $user;
        } catch (\Illuminate\Database\QueryException $e) {
            throw new Exception("Database error during OAuth2: " . $e->getMessage());
        } catch (Exception $e) {
            throw new Exception("Error during OAuth2: " . $e->getMessage());
        }
    }
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}

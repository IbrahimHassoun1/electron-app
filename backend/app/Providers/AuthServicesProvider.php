<?php

namespace App\Providers;

use Exception;
use App\Models\User;
use App\Models\Address;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\throwException;
use App\Http\Controllers\AddressController;



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

        //hash password
        $userData['password'] = bcrypt($userData['password']);
        if (!$userData['password']) {
            throw new Exception("Hashing failed");
        }
        //create user
        $user = User::create($userData);
        if (!$user) {
            throw new Exception("Couldn't create user ");
        }
        //create address
        $address = AddressController::createAddress($userData);
        if ($address['success'] == false) {
            throw new Exception('Failed to create address');
        }
        // Save address ID to user's record
        $user->address_id = $address['data']['id'];
        $user->save();
        //generate token
        $user['token'] = JWTAuth::fromUser($user);
        if (!$user['token']) {
            throw new Exception("Token generation failed");
        }
        //assign address to user
        $user['address'] = $address['data'];
        return $user;


    }

    public static function login($userData)
    {

        $credentials = [
            'email' => $userData['email'] ?? null,
            'password' => $userData['password'] ?? null,
        ];
        if (!$credentials['email'] || !$credentials['password']) {
            throw new Exception("Email and password are required");
        }
        if (!$token = JWTAuth::attempt($credentials)) {
            throw new Exception("Invalid email or password");
            // return response()->json([
            //     "message" => "Invalid email or password",
            // ], 401);
        }

        $user = JWTAuth::user();
        $user['token'] = $token;
        // Retrieve the user's address
        $address = Address::find($user->address_id);
        if (!$address) {
            throw new Exception("Failed to retrieve address");
        }
        // Assign the address to the user
        $user['address'] = $address;
        return $user;
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

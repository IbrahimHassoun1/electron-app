<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Validator;
use App\Providers\AuthServicesProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\http\Controllers\LogController;

class AuthController extends Controller
{
    protected $authServicesProvider;

    public function _construct(authServicesProvider $authServicesProvider)
    {
        $this->$authServicesProvider = $authServicesProvider;
    }

    public function register(RegisterRequest $request)
    {
        try {
           
            $response = AuthServicesProvider::signup($request->all());
            LogController::addLog(request()->ip(),'register',true,$response['id']);
            return response()->json(['success' => 'true', 'message' => 'Registered Successfully', 'data' => $response], 201);
        } catch (Exception $e) {
            LogController::addLog($request()->ip(),'register',false,null);
            return response()->json([
                'success' => 'false',
                'message' => $e->getMessage(),
                'data' => null
            ], 400);
        }

    }
    public function login(LoginRequest $request)
    {

        try {
            $result = AuthServicesProvider::login($request->all());
            LogController::addLog(request()->ip(),'login',true,$result['id']);
            return response()->json([
                'success' => 'true',
                'message' => 'Logged in successfully',
                'data' => $result
            ], 200);
        } catch (Exception $e) {
            LogController::addLog($request->ip(),'login',false,null);
            return response()->json([
                'success' => 'false',
                'message' => $e->getMessage(),
                'data' => null
            ], 400);
        }
    }
    public function OAuth2()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            AuthServicesProvider::OAuth2($googleUser);
            return redirect('/');
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['success' => 'false', 'message' => 'Database error during OAuth2: ' . $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['success' => 'false', 'message' => 'Error during OAuth2: ' . $e->getMessage()], 400);
        }
    }
}

<?php

namespace App\Http\Requests;

use App\Http\Requests\RootRequest;


class LoginRequest extends RootRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|string|exists:users',
            'password' => 'required|string'
        ];
    }
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string,string>;
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Email is required',
            'password.required' => 'Password is required'
        ];
    }

}

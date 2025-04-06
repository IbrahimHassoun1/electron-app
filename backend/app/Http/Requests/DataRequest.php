<?php

namespace App\Http\Requests;

use App\Http\Requests\RootRequest;


class DataRequest extends RootRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_date' => 'nullable|date',
            'end_date' => [
                'nullable',
                'date',
                function ($attribute, $value, $fail) {
                    if ($this->start_date && $value && $value < $this->start_date) {
                        $fail('The end date must be after or equal to the start date.');
                    }
                },
            ],
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

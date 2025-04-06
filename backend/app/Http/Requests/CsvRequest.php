<?php

namespace App\Http\Requests;

use App\Http\Requests\RootRequest;


class CsvRequest extends RootRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file' => 'required|mimes:csv,txt|max:2048',
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
            'file.required' => 'A CSV file is required.',
            'file.mimes' => 'Only CSV or TXT files are allowed.',
            'file.max' => 'The file size must not exceed 2MB.',
        ];
    }

}
